# Heart Attack Risk Prediction System

A machine learning-powered web application that predicts heart disease risk based on clinical user input. It supports both binary and multiclass classification and offers intuitive charts and real-time predictions.

## Live Demo
https://heart-attack-risk-prediction-software.vercel.app/

## Features

- Real-time heart disease prediction (binary and multiclass)
- Feature importance bar chart
- Risk distribution pie chart
- Age-based risk simulation line chart
- Responsive frontend for desktop and mobile
- Contact form integration using Formspree
- Fast and scalable backend deployed on AWS

## Technologies Used

- Frontend: React.js, Next.js, Tailwind CSS, Axios, Recharts, Framer Motion
- Backend: FastAPI, Python, scikit-learn, XGBoost, joblib
- Deployment:
  - Frontend hosted on Vercel
  - Backend hosted on AWS EC2 with Nginx and HTTPS
- Other Tools: Git, Formspree

## Installation

### Prerequisites

- Python 3.9 or higher
- Node.js (LTS version) and npm
- Git
- (Optional) Docker

## Clone the Repository

```bash
git clone https://github.com/siddiqueMangi2003/Heart-Attack-Risk-Prediction-Software.git
cd Heart-Attack-Risk-Prediction-Software
```

## Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```bash
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app:app --reload
```

Backend will run on http://127.0.0.1:8000

## Frontend Setup (React + Next.js)

```bash
cd ui
npm install
```

### Environment Variables

Create a file named `.env.local` inside the `ui` folder and add:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# Or use deployed backend:
# NEXT_PUBLIC_API_BASE_URL=https://cardioguard.xyz
```

Run the frontend server:

```bash
npm run dev
```

Frontend will be available at http://localhost:3000

## API Endpoints

- POST /predict-binary – Predict binary heart disease risk
- POST /predict-multiclass – Predict multiclass heart disease risk
- GET /feature-importance – Feature importance data
- GET /risk-distribution – Risk distribution data
- GET /age-risk – Age-based simulation data
- POST /send-message – Contact form handler

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, feel free to open an issue or create a pull request.
