// CityInsights.js
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

const CityInsights = ({ cities }) => {
  const data = {
    labels: cities.map((city) => city.name),
    datasets: [
      {
        label: "Total Revenue",
        data: cities.map((city) => city.totalRevenue),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div style={{ height: "300px", position: "relative" }}>
      {" "}
      {/* Set fixed height */}
      <h2>City Insights</h2>
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default CityInsights;
