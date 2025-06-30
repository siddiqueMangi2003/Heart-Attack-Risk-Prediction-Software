"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ParameterExplanations() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleExplanations = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full mb-8 bg-white rounded-lg shadow-sm border p-4">
      <button
        onClick={toggleExplanations}
        className="w-full flex items-center justify-between text-left font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        <div className="flex items-center">
          <HelpCircle className="h-5 w-5 mr-2" />
          <span>Need help understanding the parameters?</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Understanding Model Inputs</h3>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-blue-700">Personal Information</h4>
                  <dl className="mt-2 space-y-4">
                    <div>
                      <dt className="font-medium">Age</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Enter your age in years. Age is a key risk factor for heart disease, with risk rising as you get older.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Gender (sex)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Select your biological sex. Heart disease risk profiles differ between males and females.
                      </dd>
                    </div>
                
                    <div>
                      <dt className="font-medium">Chest Pain Type (cp)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Describe the chest pain you experience:
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            <strong>Typical Angina:</strong> Pressure or tightness triggered by exertion or stress, usually relieved by rest or nitroglycerin.
                          </li>
                          <li>
                            <strong>Atypical Angina:</strong> Discomfort that does not fully match typical angina criteria, but still related to coronary blood flow.
                          </li>
                          <li>
                            <strong>Non-anginal Pain:</strong> Chest pain of other origin (e.g., musculoskeletal or gastrointestinal), not linked to heart blood flow.
                          </li>
                          <li>
                            <strong>Asymptomatic:</strong> No chest pain symptoms, but heart disease may be detected through tests.
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Health Metrics */}
                <div>
                  <h4 className="font-medium text-blue-700">Health Metrics</h4>
                  <dl className="mt-2 space-y-4">
                    <div>
                      <dt className="font-medium">Resting Blood Pressure (trestbps)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Enter your resting systolic blood pressure in mmHg.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Cholesterol (chol)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Enter total serum cholesterol in mg/dL.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Max Heart Rate Achieved (thalch)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        The highest heart rate reached during exercise, in beats per minute.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">ST Depression (oldpeak)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        ST depression induced by exercise relative to rest, measured in mm.
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Diagnostic & Categorical */}
                <div>
                  <h4 className="font-medium text-blue-700">Diagnostic & Categorical Features</h4>
                  <dl className="mt-2 space-y-4">
                    <div>
                      <dt className="font-medium">Fasting Blood Sugar &gt; 120 mg/dL (fbs)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        True if fasting blood sugar exceeds 120 mg/dL, indicating potential diabetes.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Resting ECG (restecg)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Based on your resting electrocardiogram reading:
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            <strong>Normal:</strong> No significant abnormalities.
                          </li>
                          <li>
                            <strong>ST-T Wave Abnormality:</strong> Changes in ST segment or T wave, often detected on ECG printout.
                          </li>
                          <li>
                            <strong>Left Ventricular Hypertrophy:</strong> Enlarged left ventricle pattern seen on ECG.
                          </li>
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Exercise Induced Angina (exang)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        True if you experienced chest pain during an exercise stress test.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Slope of ST Segment (slope)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Determine from your exercise ECG tracing:
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li><strong>Upsloping:</strong> ST segment rises after exercise peak.</li>
                          <li><strong>Flat:</strong> ST segment remains level.</li>
                          <li><strong>Downsloping:</strong> ST segment falls after exercise peak.</li>
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Number of Major Vessels (ca)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Obtained via coronary angiography: count of vessels (0–3) showing significant narrowing.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Thalassemia Type (thal)</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        From a thallium stress test:
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li><strong>Fixed Defect:</strong> Permanent perfusion defect.</li>
                          <li><strong>Normal:</strong> No perfusion defect.</li>
                          <li><strong>Reversible Defect:</strong> Defect present during stress but normal at rest.</li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">How to Use This</h4>
                <p className="text-sm text-blue-700">
                  Provide accurate test results or measurements from recent medical exams. Consult a healthcare provider
                  or lab report for precise values.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
