// ProductInsights.js
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductInsights = ({ products }) => {
  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Total Revenue",
        data: products.map((product) => product.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Units Sold",
        data: products.map((product) => product.unitsSold),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div style={{ height: "300px", position: "relative" }}>
      {" "}
      {/* Set fixed height */}
      <h2>Product Insights</h2>
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default ProductInsights;
