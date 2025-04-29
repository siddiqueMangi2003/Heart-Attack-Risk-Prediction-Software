from fastapi.testclient import TestClient
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app


client = TestClient(app)

input_data = {
    "age": 45.0,
    "sex": "Male",
    "chest_pain_type": "asymptomatic",
    "country": "Cleveland",
    "resting_blood_pressure": 120.0,
    "cholesterol": 180.0,
    "fasting_blood_sugar": False,
    "Restecg": "normal",
    "max_heart_rate_achieved": 170.0,
    "exercise_induced_angina": False,
    "st_depression": 0.0,
    "st_slope_type": "upsloping",
    "num_major_vessels": 0,
    "thalassemia_type": "normal"
}

def test_predict_binary():
    response = client.post("/predict-binary", json=input_data)
    assert response.status_code == 200
    assert "pred" in response.json()
    assert "prob" in response.json()
    print("/predict-binary passed!")


def test_predict_multiclass():
    response = client.post("/predict-multiclass", json=input_data)
    assert response.status_code == 200
    assert "class_id" in response.json()
    assert "class_name" in response.json()
    assert "probabilities" in response.json()
    print("/predict-multiclass passed!")


def test_feature_importance():
    response = client.get("/feature-importance")
    assert response.status_code == 200
    assert "importances" in response.json()
    print("/feature-importance passed!")


def test_risk_distribution():
    response = client.get("/risk-distribution")
    assert response.status_code == 200
    print("/risk-distribution passed!")


def test_age_risk():
    response = client.get("/age-risk")
    assert response.status_code == 200
    print("/age-risk passed!")

