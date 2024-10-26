import { useEffect, useState } from "react";
import ProductInsights from "./ProductInsight";
import MonthlyTrends from "./MonthlyTrends";
import CityInsights from "./CitiesInsight";

const ResultsDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with actual API call when ready
    /*
    fetch("/api/processed-data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
    */

    // Temporary fake data for testing
    const fakeData = {
      totalRevenue: 50000,
      totalUnitsSold: 2000,
      averagePrice: 25,
      totalOrders: 1500,
      products: [
        {
          name: "Product A",
          totalRevenue: 15000,
          unitsSold: 500,
          averagePrice: 30,
        },
        {
          name: "Product B",
          totalRevenue: 10000,
          unitsSold: 300,
          averagePrice: 33,
        },
      ],
      monthlyData: [
        {
          month: "January",
          totalRevenue: 8000,
          unitsSold: 300,
          averagePrice: 26.67,
        },
        {
          month: "February",
          totalRevenue: 7000,
          unitsSold: 280,
          averagePrice: 25,
        },
      ],
      cities: [
        { name: "City X", totalRevenue: 20000, totalOrders: 400 },
        { name: "City Y", totalRevenue: 15000, totalOrders: 300 },
        { name: "City xx", totalRevenue: 16000, totalOrders: 300 },
        { name: "City ss", totalRevenue: 15000, totalOrders: 300 },
      ],
    };

    setData(fakeData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Sales Analysis Results</h1>
      <div>
        <h3 style={{ marginBottom: "15px" }}>
          <strong>Total Revenue:</strong> ${data.totalRevenue}
        </h3>
        <h3 style={{ marginBottom: "15px" }}>
          {" "}
          <strong>Total Units Sold:</strong> {data.totalUnitsSold}
        </h3>
        <h3 style={{ marginBottom: "15px" }}>
          {" "}
          <strong>Average Price per Unit:</strong> ${data.averagePrice}
        </h3>
        <h3 style={{ marginBottom: "15px" }}>
          {" "}
          <strong>Total Orders:</strong> {data.totalOrders}
        </h3>
      </div>
      <div style={{ marginBottom: "40px", marginTop: "50px" }}>
        <ProductInsights products={data.products} />
      </div>
      <div style={{ marginBottom: "40px" }}>
        <MonthlyTrends monthlyData={data.monthlyData} />
      </div>
      <div style={{ marginBottom: "40px" }}>
        <CityInsights cities={data.cities} />
      </div>
    </div>
  );
};

export default ResultsDashboard;
