"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, DownloadIcon, BarChart3Icon, PieChartIcon, AlertCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Define types for model data
interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
}

// Define valid metric keys
type MetricKey = keyof ModelMetrics

interface ModelData {
  id: number
  name: string
  description: string
  metrics: ModelMetrics
  features: string[]
  bestFor: string
  limitations: string
  modelType: "multiclass" | "binary"
  classCount: number
}

// Define type for radar chart data
interface RadarChartData {
  model: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
}

// Define type for metric data
interface MetricData {
  name: string
  value: number
}

// Type guard to check if a string is a valid metric key
function isMetricKey(key: string): key is MetricKey {
  return ["accuracy", "precision", "recall", "f1Score"].includes(key)
}

// Multiclass model data
const multiclassModelData: ModelData[] = [
  {
    id: 1,
    name: "Random Forest",
    description: "An ensemble learning method that operates by constructing multiple decision trees during training.",
    metrics: {
      accuracy: 0.74,
      precision: 0.72,
      recall: 0.74,
      f1Score: 0.73,
    },
    features: ["Handles non-linear relationships", "Robust to outliers", "High performance on complex datasets"],
    bestFor: "Complex classification tasks with many features",
    limitations: "Shows weakness on minority classes as seen in the classification report",
    modelType: "multiclass",
    classCount: 5,
  },
  {
    id: 2,
    name: "Gradient Boosting",
    description: "An ensemble technique that builds models sequentially, with each new model correcting errors from previous ones.",
    metrics: {
      accuracy: 0.70,
      precision: 0.70,
      recall: 0.70,
      f1Score: 0.70,
    },
    features: ["High performance", "Handles mixed data types", "Sequential learning approach"],
    bestFor: "Structured data problems with numerical and categorical features",
    limitations: "Requires careful tuning to prevent overfitting",
    modelType: "multiclass",
    classCount: 5,
  },
  {
    id: 3,
    name: "XGBoost",
    description: "An optimized distributed gradient boosting library designed for efficient and scalable training.",
    metrics: {
      accuracy: 0.68,
      precision: 0.69,
      recall: 0.68,
      f1Score: 0.69,
    },
    features: ["Regularization to prevent overfitting", "Handles missing values", "Parallel processing"],
    bestFor: "Large datasets with complex relationships",
    limitations: "Can be computationally intensive and requires parameter tuning",
    modelType: "multiclass",
    classCount: 5,
  },
  {
    id: 4,
    name: "SVC",
    description: "Support Vector Classification finds the hyperplane that best separates classes in a high-dimensional space.",
    metrics: {
      accuracy: 0.67,
      precision: 0.63,
      recall: 0.67,
      f1Score: 0.64,
    },
    features: ["Effective in high dimensional spaces", "Memory efficient", "Versatile through different kernel functions"],
    bestFor: "Classification with clear margins between classes",
    limitations: "Performance drops when classes overlap significantly",
    modelType: "multiclass",
    classCount: 5,
  },
]
// Binary model data
const binaryModelData: ModelData[] = [
  {
    id: 3,
    name: "Random Forest",
    description: "An ensemble learning method that operates by constructing multiple decision trees during training.",
    metrics: {
      accuracy: 0.89,
      precision: 0.89,
      recall: 0.89,
      f1Score: 0.89,
    },
    features: ["Non-parametric", "Handles non-linear relationships", "Robust to outliers", "Provides feature importance"],
    bestFor: "Complex binary classification tasks with many features",
    limitations: "Can be computationally expensive and may overfit on noisy datasets",
    modelType: "binary",
    classCount: 2,
  },
  {
    id: 1,
    name: "XGBoost",
    description: "An optimized gradient boosting library designed for efficiency, flexibility and portability that implements machine learning algorithms under the Gradient Boosting framework.",
    metrics: {
      accuracy: 0.88,
      precision: 0.87,
      recall: 0.88,
      f1Score: 0.87,
    },
    features: ["Regularized boosting to prevent overfitting", "Handles missing values", "Tree pruning", "Parallel processing"],
    bestFor: "Structured/tabular data with complex relationships",
    limitations: "May require careful hyperparameter tuning and can be memory-intensive on large datasets",
    modelType: "binary",
    classCount: 2,
  },
  {
    id: 4,
    name: "CatBoost",
    description: "A gradient boosting library with special handling for categorical features that uses ordered boosting to fight prediction shift.",
    metrics: {
      accuracy: 0.86,
      precision: 0.89,
      recall: 0.85,
      f1Score: 0.87,
    },
    features: ["Automatic handling of categorical features", "Reduced overfitting", "Built-in GPU support", "Robust to categorical shifts"],
    bestFor: "Datasets with many categorical features requiring minimal preprocessing",
    limitations: "Can be slower than other boosting algorithms during training, especially on larger datasets",
    modelType: "binary",
    classCount: 2,
  },
  {
    id: 2,
    name: "TabPFN",
    description: "A prior-data fitted network specifically designed for tabular data that requires minimal training and can generalize well from small datasets.",
    metrics: {
      accuracy: 0.86,
      precision: 0.86,
      recall: 0.86,
      f1Score: 0.86,
    },
    features: ["Zero-shot learning capability", "Fast inference", "Works well with small datasets", "Minimal hyperparameter tuning"],
    bestFor: "Small to medium-sized tabular datasets with limited training time",
    limitations: "May not perform as well as specialized models on very large datasets or specific domains",
    modelType: "binary",
    classCount: 2,
  },
];
// Format for radar chart - multiclass
const formatRadarData = (modelData: ModelData[]): RadarChartData[] => {
  return modelData.map((model) => ({
    model: model.name,
    accuracy: model.metrics.accuracy * 100,
    precision: model.metrics.precision * 100,
    recall: model.metrics.recall * 100,
    f1Score: model.metrics.f1Score * 100,
  }))
}

// Format for bar chart comparison
const getMetricData = (modelData: ModelData[], metric: MetricKey): MetricData[] => {
  return modelData.map((model) => ({
    name: model.name,
    value: model.metrics[metric] * 100,
  }))
}

export default function CompareModelsPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("accuracy")
  const [chartType, setChartType] = useState("bar")
  const [comparisonMode, setComparisonMode] = useState("multiclass")
  const [modelData, setModelData] = useState<ModelData[]>(multiclassModelData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Update model data when comparison mode changes
  useEffect(() => {
    const updateModelData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API call with setTimeout
        await new Promise((resolve) => setTimeout(resolve, 600))

        // Update model data based on selected mode
        if (comparisonMode === "multiclass") {
          setModelData(multiclassModelData)
        } else {
          setModelData(binaryModelData)
        }
      } catch (err) {
        console.error("Error loading model data:", err)
        setError("Failed to load model comparison data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    updateModelData()
  }, [comparisonMode])

  const metricLabels: Record<MetricKey, string> = {
    accuracy: "Accuracy",
    precision: "Precision",
    recall: "Recall",
    f1Score: "F1-Score",
  }

  const metricColors: Record<MetricKey, string> = {
    accuracy: "#3b82f6", // blue
    precision: "#8b5cf6", // purple
    recall: "#10b981", // green
    f1Score: "#f59e0b", // amber
  }

  // Handle comparison mode change
  const handleComparisonModeChange = (checked: boolean) => {
    setComparisonMode(checked ? "binary" : "multiclass")
  }

  // Handle metric selection change
  const handleMetricChange = (value: string) => {
    if (isMetricKey(value)) {
      setSelectedMetric(value)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Compare Heart Risk Prediction Models
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the performance of different machine learning models used for heart attack risk prediction.
          </p>
        </motion.div>

        {/* Comparison Mode Toggle */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">Model Comparison Mode</h2>
              <p className="text-muted-foreground">Compare models trained for different prediction tasks</p>
            </div>
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="comparison-mode"
                className={`text-sm ${comparisonMode === "multiclass" ? "font-medium" : "text-muted-foreground"}`}
              >
                Multiclass
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  5 Classes
                </span>
              </Label>
              <Switch
                id="comparison-mode"
                checked={comparisonMode === "binary"}
                onCheckedChange={handleComparisonModeChange}
              />
              <Label
                htmlFor="comparison-mode"
                className={`text-sm ${comparisonMode === "binary" ? "font-medium" : "text-muted-foreground"}`}
              >
                Binary
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  2 Classes
                </span>
              </Label>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            {comparisonMode === "multiclass" ? (
              <p className="text-sm text-blue-700">
                <strong>Multiclass Models:</strong> These models predict heart disease severity on a scale from 0 (No
                Disease) to 4 (Critical), providing more granular risk assessment but typically with lower overall
                accuracy.
              </p>
            ) : (
              <p className="text-sm text-purple-700">
                <strong>Binary Models:</strong> These models predict a simple yes/no outcome for heart disease presence,
                offering higher accuracy but less detailed risk assessment.
              </p>
            )}
          </div>
        </motion.div>

        <div ref={ref} className="space-y-12">
          {/* Chart Section */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-[500px]"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-600 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-lg font-medium text-gray-700">Loading {comparisonMode} model data...</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Data</h3>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button
                      onClick={() => setComparisonMode(comparisonMode === "multiclass" ? "binary" : "multiclass")}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={comparisonMode}
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {comparisonMode === "multiclass" ? "Multiclass" : "Binary"} Model Performance
                    </h2>
                    <p className="text-muted-foreground">
                      Visual comparison of {comparisonMode === "multiclass" ? "multiclass" : "binary"} model performance
                      metrics
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                      <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                      <select
                        className="bg-transparent border-none text-sm focus:outline-none"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                      >
                        <option value="bar">Bar Chart</option>
                        <option value="radar">Radar Chart</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                      <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                      <select
                        className="bg-transparent border-none text-sm focus:outline-none"
                        value={selectedMetric}
                        onChange={(e) => handleMetricChange(e.target.value)}
                      >
                        <option value="accuracy">Accuracy</option>
                        <option value="precision">Precision</option>
                        <option value="recall">Recall</option>
                        <option value="f1Score">F1-Score</option>
                      </select>
                    </div>

                  
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  {chartType === "bar" ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getMetricData(modelData, selectedMetric)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                        <YAxis
                          label={{
                            value: `${metricLabels[selectedMetric]} (%)`,
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle" },
                          }}
                        />
                        <Tooltip
                          formatter={(value) => [`${Number(value).toFixed(1)}%`, metricLabels[selectedMetric]]}
                        />
                        <Legend />
                        <Bar
                          dataKey="value"
                          name={metricLabels[selectedMetric]}
                          fill={metricColors[selectedMetric]}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={150} data={formatRadarData(modelData)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="model" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        {selectedMetric === "accuracy" && (
                          <Radar
                            name="Accuracy"
                            dataKey="accuracy"
                            stroke={metricColors.accuracy}
                            fill={metricColors.accuracy}
                            fillOpacity={0.2}
                            isAnimationActive={true}
                            animationBegin={0}
                            animationDuration={500}
                          />
                        )}
                        {selectedMetric === "precision" && (
                          <Radar
                            name="Precision"
                            dataKey="precision"
                            stroke={metricColors.precision}
                            fill={metricColors.precision}
                            fillOpacity={0.2}
                            isAnimationActive={true}
                            animationBegin={0}
                            animationDuration={500}
                          />
                        )}
                        {selectedMetric === "recall" && (
                          <Radar
                            name="Recall"
                            dataKey="recall"
                            stroke={metricColors.recall}
                            fill={metricColors.recall}
                            fillOpacity={0.2}
                            isAnimationActive={true}
                            animationBegin={0}
                            animationDuration={500}
                          />
                        )}
                        {selectedMetric === "f1Score" && (
                          <Radar
                            name="F1-Score"
                            dataKey="f1Score"
                            stroke={metricColors.f1Score}
                            fill={metricColors.f1Score}
                            fillOpacity={0.2}
                            isAnimationActive={true}
                            animationBegin={0}
                            animationDuration={500}
                          />
                        )}
                        <Legend />
                        <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`]} />
                      </RadarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Model Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold mb-2 md:mb-0">
                {comparisonMode === "multiclass" ? "Multiclass" : "Binary"} Model Details
              </h2>
              <Badge
                variant="outline"
                className={
                  comparisonMode === "multiclass" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                }
              >
                {comparisonMode === "multiclass" ? "5-Class Prediction" : "Binary Prediction"}
              </Badge>
            </div>

            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="cards">Card View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              <TabsContent value="cards" className="w-full">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  ) : error ? (
                    <div className="text-center p-6 bg-red-50 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  ) : (
                    <motion.div
                      key={comparisonMode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {modelData.map((model, index) => (
                        <motion.div
                          key={model.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                          <Card className="h-full hover:shadow-md transition-shadow duration-300">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{model.name}</CardTitle>
                                  <CardDescription className="mt-1">{model.description}</CardDescription>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={
                                    comparisonMode === "multiclass"
                                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                                  }
                                >
                                  {comparisonMode === "multiclass" ? "Multiclass" : "Binary"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Accuracy</p>
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                      <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${model.metrics.accuracy * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium">
                                      {(model.metrics.accuracy * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Precision</p>
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                      <div
                                        className="bg-purple-600 h-2.5 rounded-full"
                                        style={{ width: `${model.metrics.precision * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium">
                                      {(model.metrics.precision * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">Recall</p>
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                      <div
                                        className="bg-green-600 h-2.5 rounded-full"
                                        style={{ width: `${model.metrics.recall * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium">
                                      {(model.metrics.recall * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">F1-Score</p>
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                      <div
                                        className="bg-amber-500 h-2.5 rounded-full"
                                        style={{ width: `${model.metrics.f1Score * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium">
                                      {(model.metrics.f1Score * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3 mt-6">
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Key Features</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {model.features.map((feature, i) => (
                                      <span
                                        key={i}
                                        className={`text-xs px-2 py-1 rounded-full ${
                                          comparisonMode === "multiclass"
                                            ? "bg-blue-50 text-blue-700"
                                            : "bg-purple-50 text-purple-700"
                                        }`}
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Best For</h4>
                                  <p className="text-sm text-muted-foreground">{model.bestFor}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Limitations</h4>
                                  <p className="text-sm text-muted-foreground">{model.limitations}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="table" className="w-full">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  ) : error ? (
                    <div className="text-center p-6 bg-red-50 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  ) : (
                    <motion.div
                      key={comparisonMode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="overflow-x-auto"
                    >
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Model</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Accuracy</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Precision</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Recall</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">F1-Score</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Best For</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modelData.map((model) => (
                            <tr key={model.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm font-medium">{model.name}</td>
                              <td className="px-4 py-3 text-sm">{(model.metrics.accuracy * 100).toFixed(1)}%</td>
                              <td className="px-4 py-3 text-sm">{(model.metrics.precision * 100).toFixed(1)}%</td>
                              <td className="px-4 py-3 text-sm">{(model.metrics.recall * 100).toFixed(1)}%</td>
                              <td className="px-4 py-3 text-sm">{(model.metrics.f1Score * 100).toFixed(1)}%</td>
                              <td className="px-4 py-3 text-sm">{model.bestFor}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </motion.div>

         
        </div>
      </div>
    </main>
  )
}
