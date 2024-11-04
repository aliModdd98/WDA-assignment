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
import { Box, CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityRevenueData = async () => {
      setLoading(true); // Start loading
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
      } finally {
        setLoading(false); // End loading
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
    <Box
      sx={{
        width: "100%",
        maxHeight: "500px",
        padding: "1rem",
        margin: "3rem auto",
        maxWidth: "800px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Top Revenue by City</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
          height={400}
        />
      )}
    </Box>
  );
};

export default RevenuePerCity;
