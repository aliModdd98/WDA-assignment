import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../config/axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyMetrics = () => {
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        const response = await axiosInstance.get("/monthly-metrics", {
          params: { pageSize: 20 },
        });

        // Set the metrics data from the response
        setMetricsData(response.data.data); // Adjust according to your response structure
      } catch (error) {
        console.error("Error fetching monthly metrics data:", error);
      }
    };

    fetchMetricsData();
  }, []);

  // Prepare data for the chart
  const data = {
    labels: metricsData.map((item) => item.YearMonth), // Extracting YearMonth for labels
    datasets: [
      {
        label: "Total Revenue ($)",
        data: metricsData.map((item) => item.TotalRevenue || 0), // Extracting TotalRevenue
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Units Sold",
        data: metricsData.map((item) => item.TotalUnitsSold || 0), // Extracting TotalUnitsSold
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Average Price Per Unit ($)",
        data: metricsData.map((item) => item.AveragePricePerUnit || 0), // Extracting AveragePricePerUnit
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Metrics Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Year-Month",
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Monthly Metrics</h2>
      <div style={{ width: "100%", height: "400px", marginBottom: "20px" }}>
        <Bar data={data} options={options} />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Year-Month
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Total Revenue ($)
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Total Units Sold
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Average Price Per Unit ($)
            </th>
          </tr>
        </thead>
        <tbody>
          {metricsData.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.YearMonth}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.TotalRevenue.toFixed(2)}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.TotalUnitsSold}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.AveragePricePerUnit.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyMetrics;
