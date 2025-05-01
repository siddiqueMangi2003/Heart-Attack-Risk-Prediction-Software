from fastapi.testclient import TestClient
import sys
import os
from unittest.mock import patch
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app


client = TestClient(app)


valid_input = {
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



def test_missing_fields_binary():
    response = client.post("/predict-binary", json={"age": 60})
    assert response.status_code == 422
    print(" Missing fields correctly rejected")

def test_invalid_type_binary():
    bad_input = valid_input.copy()
    bad_input["age"] = "fifty"  # should be float
    response = client.post("/predict-binary", json=bad_input)
    assert response.status_code == 422
    print(" Invalid type correctly rejected")

def test_invalid_enum_binary():
    bad_input = valid_input.copy()
    bad_input["sex"] = "Other"  # not allowed
    response = client.post("/predict-binary", json=bad_input)
    assert response.status_code == 422
    print(" Invalid enum correctly rejected")



@patch("app.send_email")
def test_send_message_success(mock_send):
    payload = {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "message": "I have a question about your app."
    }
    response = client.post("/send-message", json=payload)
    assert response.status_code == 200
    assert "message" in response.json()
    mock_send.assert_called_once()
    print("/send-message (mocked) passed!")



def test_send_message_invalid_email():
    payload = {
        "name": "John Doe",
        "email": "not-an-email",
        "message": "Hello there!"
    }
    response = client.post("/send-message", json=payload)
    assert response.status_code == 422
    print("/send-message (invalid email) correctly rejected.")


def test_send_message_missing_fields():
    payload = {
        "name": "Jane Doe",
        "message": "Missing email!"
    }
    response = client.post("/send-message", json=payload)
    assert response.status_code == 422
    print("/send-message (missing fields) correctly rejected.")
