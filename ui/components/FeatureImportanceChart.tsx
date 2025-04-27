"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FeatureImportanceChart() {
  const [data, setData] = useState<{ feature: string; importance: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


useEffect(() => {
  setLoading(true)
  fetch(`${BASE_URL}/feature-importance`)
    .then((res) => res.json())
    .then((res) => {
      if (res.importances && Array.isArray(res.importances)) {
        const sorted = [...res.importances].sort((a: any, b: any) => b.importance - a.importance)
        setData(sorted)
      } else if (res.error) {
        setError(`Error from API: ${res.error}`)
      } else {
        setError("Invalid response format: 'importances' array not found")
        console.error("API response format error:", res)
      }
    })
    .catch((err) => {
      setError(`Failed to fetch data: ${err.message}`)
      console.error("API fetch error:", err)
    })
    .finally(() => {
      setLoading(false)
    })
}, [])

  const chartData = {
    labels: data.map((d) => d.feature),
    datasets: [
      {
        label: "Feature Importance",
        data: data.map((d) => d.importance),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Importance: ${context.parsed.y.toFixed(4)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.05,
        },
      },
    },
  }

  if (loading) {
    return <div className="flex h-[400px] items-center justify-center">Loading feature importance data...</div>
  }

  if (error) {
    return <div className="flex h-[400px] items-center justify-center text-red-500">{error}</div>
  }

  if (data.length === 0) {
    return <div className="flex h-[400px] items-center justify-center">No feature importance data available</div>
  }

  return (
    <div className="h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  )
}