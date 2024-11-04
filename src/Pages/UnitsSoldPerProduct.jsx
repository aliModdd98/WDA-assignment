import { useEffect, useState } from "react";
import { Button } from "@mui/material";
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

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UnitsSoldChart = ({ data, height = 400 }) => {
  const chartData = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: "Units Sold",
        data: data.map((product) => product.unitsSold),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div style={{ height: `${height}px`, position: "relative" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Units Sold per Product",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Units Sold",
              },
            },
            x: {
              title: {
                display: true,
                text: "Product Name",
              },
            },
          },
        }}
      />
    </div>
  );
};

const UnitsSoldPerProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUnitsSoldData = async (page) => {
      try {
        const response = await axiosInstance.get("/units-sold-per-product", {
          params: { page, pageSize },
        });

        const productData = Object.entries(response.data.data).map(
          ([key, value]) => ({
            name: key,
            unitsSold: value,
          })
        );

        setProducts(productData);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching units sold data:", error);
      }
    };

    fetchUnitsSoldData(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Units Sold Insights</h2>
      <UnitsSoldChart data={products} height={400} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="contained"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default UnitsSoldPerProduct;
