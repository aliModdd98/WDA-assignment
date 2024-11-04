import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axiosInstance from "../config/axios";
import BarChart from "../components/BarChart";

const ProductInsights = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchPageData = async (page) => {
      try {
        const response = await axiosInstance.get("/revenue-per-product", {
          params: { page, pageSize },
        });

        const productData = Object.entries(response.data.data).map(
          ([key, value]) => ({
            name: key,
            totalRevenue: value,
            unitsSold: Math.floor(Math.random() * 100),
          })
        );

        setProducts(productData);
        setTotalPages(response.data.totalPages); // Update total pages from API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPageData(page);
  }, [page]);

  const chartData = {
    labels: products.map((product) => product.name),
    totalRevenue: products.map((product) => product.totalRevenue),
    unitsSold: products.map((product) => product.unitsSold),
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Revenue per Product Insights</h2>
      <BarChart data={chartData} height={400} />

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

export default ProductInsights;
