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

const RevenuePerMonth = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axiosInstance.get("/revenue-per-month", {
          params: { page: 1, pageSize: 10 },
        });

        setRevenueData(response.data.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  const data = {
    labels: revenueData.map((item) => item.YearMonth),
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: revenueData.map((item) => item.Revenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Monthly Revenue",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue ($)",
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
    <div
      style={{
        width: "100%",
        maxHeight: "500px",
        padding: "20px",
        marginBottom: "3rem",
      }}
    >
      <h2>Revenue per Month</h2>
      <Bar data={data} options={options} height={400} />
    </div>
  );
};

export default RevenuePerMonth;
