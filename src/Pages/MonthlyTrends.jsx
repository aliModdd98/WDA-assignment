// MonthlyTrends.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyTrends = ({ monthlyData }) => {
  const data = {
    labels: monthlyData.map((month) => month.month),
    datasets: [
      {
        label: "Total Revenue",
        data: monthlyData.map((month) => month.totalRevenue),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Units Sold",
        data: monthlyData.map((month) => month.unitsSold),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div style={{ height: "300px", position: "relative" }}>
      {" "}
      {/* Set fixed height */}
      <h2>Monthly Trends</h2>
      <Line
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default MonthlyTrends;
