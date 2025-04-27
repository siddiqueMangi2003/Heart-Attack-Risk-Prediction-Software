from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_predict_endpoint():
    input_data = {
        "age": 45.0,
        "sex": "Male",
        "dataset": "Cleveland",
        "cp": "asymptomatic",
        "trestbps": 120.0,
        "chol": 180.0,
        "fbs": False,
        "restecg": "normal",
        "thalch": 170.0,
        "exang": False,
        "oldpeak": 0.0,
        "slope": "upsloping",
        "ca": "0.0"
    }

    response = client.post("/predict", json=input_data)
    assert response.status_code == 200
    assert "prediction" in response.json()
