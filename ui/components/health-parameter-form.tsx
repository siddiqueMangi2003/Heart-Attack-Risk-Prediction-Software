/* eslint-disable react/jsx-one-expression-per-line */
"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
/* ---------- 1. Zod schema (13 features - removed country) ---------- */
const formSchema = z.object({
  age: z.coerce.number().min(18).max(120),
  sex: z.enum(["Male", "Female"]),
  chest_pain_type: z.enum([
    "typical angina",
    "atypical angina",
    "non-anginal",
    "asymptomatic",
  ]),
  resting_blood_pressure: z.coerce.number().min(70).max(250),
  cholesterol: z.coerce.number().min(100).max(700),
  fasting_blood_sugar: z.boolean(),
  Restecg: z.enum(["normal", "lv-hypertrophy", "st-t-abnormality"]),
  max_heart_rate_achieved: z.coerce.number().min(60).max(250),
  exercise_induced_angina: z.boolean(),
  st_depression: z.coerce.number().min(0).max(6).multipleOf(0.1),
  st_slope_type: z.enum(["upsloping", "flat", "downsloping"]),
  num_major_vessels: z.enum(["0", "1", "2", "3"]),
  thalassemia_type: z.enum([
    "normal",
    "fixed-defect",
    "reversable-defect",
  ]),
});

type FormValues = z.infer<typeof formSchema>;
type PredictionMode = "binary" | "multiclass";

type BinaryResult = {
  score: number;
  category: string;
  message: string;
};

type MulticlassResult = {
  category: string;
  probabilities: Record<string, number>;
  message: string;
};

/* ---------- 2. Component ---------- */
export function HealthParameterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionMode, setPredictionMode] = useState<PredictionMode>("binary");
  const [binaryResult, setBinaryResult] = useState<BinaryResult | null>(null);
  const [multiclassResult, setMulticlassResult] = useState<MulticlassResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 50,
      sex: "Male",
      chest_pain_type: "non-anginal",
      resting_blood_pressure: 120,
      cholesterol: 200,
      fasting_blood_sugar: false,
      Restecg: "normal",
      max_heart_rate_achieved: 150,
      exercise_induced_angina: false,
      st_depression: 1.0,
      st_slope_type: "flat",
      num_major_vessels: "0",
      thalassemia_type: "normal",
    },
  });

  /* ------------ helpers ------------- */
  const getBinaryBadge = (category: string): string =>
    category === "No Disease"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const getMulticlassBadge = (category: string): string => {
    switch (category) {
      case "No Heart Disease":
        return "bg-green-100 text-green-800";
      case "Mild Heart Disease":
        return "bg-yellow-100 text-yellow-800";
      case "Moderate Heart Disease":
        return "bg-orange-100 text-orange-800";
      case "Severe Heart Disease":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  /* ------------- onSubmit ------------ */
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setBinaryResult(null);
    setMulticlassResult(null);
    setErrorMsg(null);

    try {
      const dataToSend = {
        ...data,
        num_major_vessels: parseInt(data.num_major_vessels, 10)
      };
      
      console.log(`Sending data to backend for ${predictionMode} prediction:`, dataToSend);

      const endpoint = predictionMode === "binary" 
      ? `${BASE_URL}/predict-binary` 
      : `${BASE_URL}/predict-multiclass`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        setErrorMsg(`Error from server: ${res.status} - ${JSON.stringify(errorData)}`);
        return;
      }
      
      const responseData = await res.json();
      
      if (predictionMode === "binary") {
        // Binary prediction result
        const { pred, prob } = responseData;
        setBinaryResult({
          score: Math.round(prob * 100),
          category: pred === 1 ? "Disease" : "No Disease",
          message:
            pred === 1
              ? "Based on your inputs, you may have heart disease. Please consult a cardiologist."
              : "Your risk appears low. Keep up a healthy lifestyle!",
        });
      } else {
        // Multiclass prediction result
        const { class_name, probabilities } = responseData;
        
        // Create appropriate message based on class
        let message = "";
        switch (class_name) {
          case "No Heart Disease":
            message = "Your risk appears low. Keep up a healthy lifestyle!";
            break;
          case "Mild Heart Disease":
            message = "You show signs of mild heart disease. Consider lifestyle changes and consult a doctor.";
            break;
          case "Moderate Heart Disease":
            message = "You show signs of moderate heart disease. We recommend consulting a cardiologist.";
            break;
          case "Severe Heart Disease":
            message = "You show signs of severe heart disease. Please consult a cardiologist urgently.";
            break;
        }
        
        setMulticlassResult({
          category: class_name,
          probabilities,
          message,
        });
      }
    } catch (e) {
      console.error("Prediction failed:", e);
      setErrorMsg("Prediction failed – check the browser console and backend logs.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- 3. JSX ---------- */
  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="p-6 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Prediction Mode</h2>
        <div className="flex items-center space-x-4">
          <Label className={predictionMode === "binary" ? "font-medium" : ""}>
            Binary
          </Label>
          <Switch
            checked={predictionMode === "multiclass"}
            onCheckedChange={(checked) => {
              setPredictionMode(checked ? "multiclass" : "binary");
              setBinaryResult(null);
              setMulticlassResult(null);
            }}
          />
          <Label className={predictionMode === "multiclass" ? "font-medium" : "text-muted-foreground"}>
            Multiclass
          </Label>
        </div>
      </div>

      {/* Error message display */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          <h3 className="font-medium">Error</h3>
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      {/* ---------- FORM ---------- */}
      <form 
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-8"
      >
        {/* Personal */}
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* age */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                className="w-full p-2 border rounded-md"
                {...register("age")}
              />
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
            </div>

            {/* sex */}
            <div>
              <label className="block text-sm font-medium mb-1">Sex</label>
              <select
                className="w-full p-2 border rounded-md"
                {...register("sex")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.sex && (
                <p className="text-sm text-red-500">{errors.sex.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Clinical metrics */}
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Clinical Metrics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* chest pain */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Chest-pain type
              </label>
              <select
                className="w-full p-2 border rounded-md"
                {...register("chest_pain_type")}
              >
                <option value="typical angina">Typical angina</option>
                <option value="atypical angina">Atypical angina</option>
                <option value="non-anginal">Non-anginal</option>
                <option value="asymptomatic">Asymptomatic</option>
              </select>
            </div>

            {/* blood pressure */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Resting blood pressure (mmHg)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                {...register("resting_blood_pressure")}
              />
            </div>

            {/* cholesterol */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Cholesterol (mg/dL)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                {...register("cholesterol")}
              />
            </div>

            {/* fasting blood sugar */}
            <div className="flex items-center space-x-3">
              <input
                id="fbs"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded"
                {...register("fasting_blood_sugar")}
              />
              <label htmlFor="fbs" className="text-sm">
                Fasting blood sugar &gt; 120 mg/dL
              </label>
            </div>

            {/* Restecg */}
            <div>
              <label className="block text-sm font-medium mb-1">Rest ECG</label>
              <select
                className="w-full p-2 border rounded-md"
                {...register("Restecg")}
              >
                <option value="normal">Normal</option>
                <option value="lv-hypertrophy">LV Hypertrophy</option>
                <option value="st-t-abnormality">ST-T abnormality</option>
              </select>
            </div>

            {/* max HR */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Max heart rate achieved
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                {...register("max_heart_rate_achieved")}
              />
            </div>

            {/* exercise angina */}
            <div className="flex items-center space-x-3">
              <input
                id="exang"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded"
                {...register("exercise_induced_angina")}
              />
              <label htmlFor="exang" className="text-sm">
                Exercise-induced angina
              </label>
            </div>

            {/* ST depression */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ST depression
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 border rounded-md"
                {...register("st_depression")}
              />
            </div>

            {/* ST slope */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ST slope type
              </label>
              <select
                className="w-full p-2 border rounded-md"
                {...register("st_slope_type")}
              >
                <option value="upsloping">Upsloping</option>
                <option value="flat">Flat</option>
                <option value="downsloping">Downsloping</option>
              </select>
            </div>

            {/* vessels */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of major vessels (0-3)
              </label>
              <select
                className="w-full p-2 border rounded-md"
                {...register("num_major_vessels")}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* thal */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Thalassemia type
              </label>
              <select
                className="w-full p-2 border rounded-md"
                {...register("thalassemia_type")}
              >
                <option value="normal">Normal</option>
                <option value="fixed-defect">Fixed defect</option>
                <option value="reversable-defect">Reversible defect</option>
              </select>
            </div>
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 font-medium"
        >
          {isLoading ? "Calculating…" : `Predict Heart-Disease (${predictionMode === "binary" ? "Binary" : "Multiclass"})`}
        </button>
      </form>

      {/* Binary result */}
      {binaryResult && predictionMode === "binary" && (
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Binary Prediction Result</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">
              Probability of disease: {binaryResult.score}%
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getBinaryBadge(
                binaryResult.category
              )}`}
            >
              {binaryResult.category}
            </span>
          </div>
          <p className="text-muted-foreground">{binaryResult.message}</p>
        </div>
      )}

      {/* Multiclass result */}
      {multiclassResult && predictionMode === "multiclass" && (
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-4">Multiclass Prediction Result</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Heart Disease Classification</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getMulticlassBadge(
                multiclassResult.category
              )}`}
            >
              {multiclassResult.category}
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Class Probabilities:</h3>
            <div className="space-y-2">
              {Object.entries(multiclassResult.probabilities).map(([className, probability]) => (
                <div key={className} className="flex items-center">
                  <div className="w-40 text-sm">{className}:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.round(probability * 100)}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right text-sm">{Math.round(probability * 100)}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-muted-foreground">{multiclassResult.message}</p>
        </div>
      )}
    </div>
  );
}