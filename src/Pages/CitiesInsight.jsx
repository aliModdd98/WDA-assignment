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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenuePerCity = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchCityRevenueData = async () => {
      try {
        const response = await axiosInstance.get("/revenue-per-city", {
          params: { page: 1, pageSize: 10 },
        });

        const revenueData = Object.entries(response.data.data).map(
          ([city, revenue]) => ({
            city,
            revenue,
          })
        );

        setCityData(revenueData);
      } catch (error) {
        console.error("Error fetching city revenue data:", error);
      }
    };

    fetchCityRevenueData();
  }, []);

  const data = {
    labels: cityData.map((item) => item.city),
    datasets: [
      {
        label: "Revenue",
        data: cityData.map((item) => item.revenue),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxHeight: "500px", padding: "20px" }}>
      <h2>Top Revenue by City</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Makes it responsive within the fixed height
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Revenue per City",
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
                text: "City",
              },
            },
          },
        }}
        height={400} // This controls the rendered height within the fixed container
      />
    </div>
  );
};

export default RevenuePerCity;
