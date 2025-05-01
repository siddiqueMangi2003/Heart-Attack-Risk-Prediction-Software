from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import pandas as pd
import numpy as np
import joblib
import json
import uuid
from typing import Literal
from email.message import EmailMessage
import smtplib

app = FastAPI()

#  Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Load models and encoders
binary_model = joblib.load("model/xgboost_model.pkl")
binary_scaler = joblib.load("model/scaler.pkl")

# Load multiclass model
multiclass_model = joblib.load("model/best_model.pkl")
multiclass_scaler = joblib.load("model/multiclass_scaler.pkl")

# Mapping Dictionary:
sex_map       = {"Female": 0, "Male": 1}
cp_map        = {"asymptomatic": 0, "atypical angina": 1, 
                "non-anginal": 2, "typical angina": 3}
dataset_map   = {"Cleveland": 0, "Hungary": 1, 
                "Switzerland": 2, "VA Long Beach": 3}
bool_map      = {False: 0, True: 1}         
restecg_map   = {"lv-hypertrophy": 0, "normal": 1, "st-t-abnormality": 2}
slope_map     = {"downsloping": 0, "flat": 1, "upsloping": 2}
thal_map      = {"fixed-defect": 0, "normal": 1, "reversable-defect": 2}
trestbps_bins_map = {'Normal': 0, 'high': 1, 'low': 2, 'very_high': 3}

# Multiclass result mapping
class_mapping = {
    0: "No Heart Disease",
    1: "Mild Heart Disease",
    2: "Moderate Heart Disease", 
    3: "Severe Heart Disease",
    4: "Critical Heart Disease"
}

class Patient(BaseModel):
    age: float
    sex: Literal["Male", "Female"]
    chest_pain_type: Literal[
        "typical angina", "atypical angina", "non-anginal", "asymptomatic"
    ]
    resting_blood_pressure: float
    cholesterol: float
    fasting_blood_sugar: bool
    Restecg: Literal["normal", "lv-hypertrophy", "st-t-abnormality"]
    max_heart_rate_achieved: float
    exercise_induced_angina: bool
    st_depression: float
    st_slope_type: Literal["upsloping", "flat", "downsloping"]
    num_major_vessels: Literal[0, 1, 2, 3]
    thalassemia_type: Literal["normal", "fixed-defect", "reversable-defect"]

@app.post("/predict-binary")
def predict_heart_risk_binary(data: Patient):
    """
    Returns:
        pred  : 0 (No Disease) | 1 (Disease)
        prob  : probability for class 1 as float 0-1
    """
    payload = data.model_dump()
    
    encoded = {
        "age": payload["age"],
        "sex": sex_map[payload["sex"]],
        "chest_pain_type": cp_map[payload["chest_pain_type"]],
        "country": dataset_map["Hungary"],  
        "resting_blood_pressure": payload["resting_blood_pressure"],
        "cholesterol": payload["cholesterol"],
        "fasting_blood_sugar": bool_map[payload["fasting_blood_sugar"]],
        "Restecg": restecg_map[payload["Restecg"]],
        "max_heart_rate_achieved": payload["max_heart_rate_achieved"],
        "exercise_induced_angina": bool_map[payload["exercise_induced_angina"]],
        "st_depression": payload["st_depression"],
        "st_slope_type": slope_map[payload["st_slope_type"]],
        "num_major_vessels": int(payload["num_major_vessels"]),
        "thalassemia_type": thal_map[payload["thalassemia_type"]],
    }
    
    df = pd.DataFrame([encoded])
    df_scaled = binary_scaler.transform(df)
    
    pred = int(binary_model.predict(df_scaled)[0])
    prob = float(binary_model.predict_proba(df_scaled)[0][1])
    
    return {"pred": pred, "prob": prob}

@app.post("/predict-multiclass")
def predict_heart_risk_multiclass(data: Patient):
    """
    Returns:
        class_id: 0-3 class ID based on severity
        class_name: Categorical name for risk level
        probabilities: Probability distribution for all classes
    """
    payload = data.model_dump()
    
    patient_id = uuid.uuid4().int % 100000
    
    encoded = {
        "id": patient_id,  
        "age": payload["age"],
        "sex": sex_map[payload["sex"]],
        "dataset": dataset_map["Cleveland"],  
        "cp": cp_map[payload["chest_pain_type"]],
        "trestbps": payload["resting_blood_pressure"],
        "chol": payload["cholesterol"],
        "fbs": bool_map[payload["fasting_blood_sugar"]],
        "restecg": restecg_map[payload["Restecg"]],
        "thalch": payload["max_heart_rate_achieved"],
        "exang": bool_map[payload["exercise_induced_angina"]],
        "oldpeak": payload["st_depression"],
        "slope": slope_map[payload["st_slope_type"]],
        "ca": int(payload["num_major_vessels"]),
        "thal": thal_map[payload["thalassemia_type"]]
    }
    
    df = pd.DataFrame([encoded])
    
    bins = [0, 60, 80, 130, 135, 140]
    labels = ['very_low', 'low', 'Normal', 'high', 'very_high']
    df['trestbps_bins'] = pd.cut(df['trestbps'], bins=bins, labels=labels)
    df['trestbps_bins'].fillna('Normal', inplace=True)
    df['trestbps_bins'] = df['trestbps_bins'].map(trestbps_bins_map)
    
    numeric_cols = ['id', 'age', 'trestbps', 'chol', 'thalch', 'oldpeak']
    df[numeric_cols] = multiclass_scaler.transform(df[numeric_cols])
    
    class_id = int(multiclass_model.predict(df)[0])
    class_name = class_mapping[class_id]
    probabilities = {class_mapping[i]: float(prob) for i, prob in enumerate(multiclass_model.predict_proba(df)[0])}
    
    return {
        "class_id": class_id,
        "class_name": class_name,
        "probabilities": probabilities
    }

with open("model/binary_feature_names.json", "r") as f:
    binary_feature_names = json.load(f)


@app.get("/feature-importance")
def get_binary_feature_importance():
    try:
        
        with open("model/binary_feature_importance.json", "r") as f:
            response = json.load(f)
        
        return {"importances": response}
    except Exception as e:
        return {"error": str(e)}


@app.get("/risk-distribution")
def get_risk_distribution():
    try:
        with open("model/risk_distribution.json", "r") as f:
            return json.load(f)
    except Exception as e:
        return {"error": str(e)}

@app.get("/age-risk")
def get_age_risk():
    try:
        with open("model/age_risk_profiles.json", "r") as f:
            return json.load(f)
    except Exception as e:
        return {"error": str(e)}


class Message(BaseModel):
    name: str
    email: EmailStr
    message: str

def send_email(name: str, email: str, message: str):
    msg = EmailMessage()
    msg["Subject"] = f"New Message from {name}"
    msg["From"] = "siddiquemangi03@gmail.com"
    msg["To"] = "siddiquemangi03@gmail.com"
    msg["Reply-To"] = email
    msg.set_content(message)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login("siddiquemangi03@gmail.com", "incorrect2003")  # 🔐 CHANGE THIS
        smtp.send_message(msg)

@app.post("/send-message")
async def send_message(data: Message, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, data.name, data.email, data.message)
    return {"message": "Your message has been sent!"}