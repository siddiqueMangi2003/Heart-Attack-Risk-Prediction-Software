"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeatureImportanceChart from "@/components/FeatureImportanceChart"
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RiskCategory {
  name: string
  value: number
  color: string
}

interface AgeScenario {
  age: number
  lowRisk: number
  moderateRisk: number
  highRisk: number
}

export function AnalysisCharts() {
  const [activeTab, setActiveTab] = useState("risk-factors")
  const [ageData, setAgeData] = useState<AgeScenario[]>([])
  const [riskData, setRiskData] = useState<RiskCategory[]>([])


  useEffect(() => {
    fetch(`${BASE_URL}/age-risk`)
      .then((res) => res.json())
      .then((data) => setAgeData(data))
  
    fetch(`${BASE_URL}/risk-distribution`)
      .then((res) => res.json())
      .then((data) => setRiskData(data))
  }, [])

  return (
    <div className="w-full max-w-5xl space-y-8">
      <Tabs defaultValue="risk-factors" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
          <TabsTrigger value="age-scenarios">Age Scenarios</TabsTrigger>
          <TabsTrigger value="distribution">Risk Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-factors" className="mt-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl">Model Feature Importances</CardTitle>
              <CardDescription>
                These are the most influential features used by the prediction model, based on real training data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FeatureImportanceChart />
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Understanding Feature Importance</h3>
                <p className="text-sm text-blue-700">
                  This chart reflects how much each health parameter contributed to the final prediction made by the
                  machine learning model. The higher the bar, the more weight that feature had in influencing the heart
                  attack risk outcome.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="age-scenarios" className="mt-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">Heart Attack Risk by Age and Health Profile</CardTitle>
              <CardDescription>
                This line graph shows how heart attack risk changes with age for different health profiles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" label={{ value: "Age (years)", position: "insideBottom", offset: -10 }} />
                    <YAxis label={{ value: "Risk Probability (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Healthy" name="Healthy Profile" stroke="#4ade80" strokeWidth={2} />
                    <Line type="monotone" dataKey="Average" name="Average Profile" stroke="#facc15" strokeWidth={2} />
                    <Line type="monotone" dataKey="AtRisk" name="At-Risk Profile" stroke="#f87171" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="text-lg font-medium text-purple-800 mb-2">Age and Health Profiles</h3>
                <p className="text-sm text-purple-700">
                  This visualization demonstrates how heart attack risk increases with age across different health
                  profiles. The "Healthy Profile" represents individuals with optimal health parameters, while the
                  "At-Risk Profile" represents those with multiple risk factors such as high blood pressure, high
                  cholesterol, and smoking. Note how the gap between profiles widens with age, highlighting the
                  importance of managing risk factors early.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-white to-green-50">
            <CardHeader>
              <CardTitle className="text-2xl">Distribution of Heart Attack Risk Levels</CardTitle>
              <CardDescription>
                This pie chart shows the distribution of users across different risk categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium text-green-800 mb-2">Population Risk Distribution</h3>
                <p className="text-sm text-green-700">
                  This chart reflects the percentage of people falling into each risk category. It helps identify the
                  proportion of the population in critical or safe zones, reinforcing the need for early detection and
                  lifestyle management.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl">How We Calculate Heart Attack Risk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our heart attack risk prediction model uses a comprehensive algorithm that considers multiple health
            parameters and their interactions. The calculation process involves:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-4 rounded-lg bg-white/80 border border-blue-100 shadow-sm">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Data Collection</h3>
              <p className="text-sm">
                We collect key health parameters including age, gender, blood pressure, cholesterol levels, blood sugar,
                smoking status, physical activity, family history, and BMI.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/80 border border-purple-100 shadow-sm">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Risk Weighting</h3>
              <p className="text-sm">
                Each parameter is assigned a weight based on its relative importance as determined by clinical research.
                For example, smoking and high blood pressure carry higher weights than some other factors.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/80 border border-indigo-100 shadow-sm">
              <h3 className="text-lg font-medium text-indigo-800 mb-2">Interaction Analysis</h3>
              <p className="text-sm">
                Our model accounts for how different risk factors interact with each other. For instance, the
                combination of diabetes and high blood pressure presents a higher risk than either factor alone.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/80 border border-sky-100 shadow-sm">
              <h3 className="text-lg font-medium text-sky-800 mb-2">Risk Categorization</h3>
              <p className="text-sm">
                The final risk score is calculated and normalized to a 0-100 scale. Scores below 30 are categorized as
                "Low Risk," 30-60 as "Moderate Risk," and above 60 as "High Risk."
              </p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg mt-4">
            <h3 className="text-lg font-medium mb-2">Important Note</h3>
            <p className="text-sm">
              This risk assessment tool is based on statistical models and is intended for educational purposes only. It
              should not replace professional medical advice. Always consult with a healthcare provider for a
              comprehensive evaluation of your cardiovascular health.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}