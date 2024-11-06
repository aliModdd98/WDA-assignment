import AllData from "./AllData";
import RevenuePerCity from "./CitiesInsight";
import MonthlyMetrics from "./MonthlyMertrics";
import RevenuePerMonth from "./MonthlyTrends";
import UnitsSoldPerProduct from "./UnitsSoldPerProduct";

const ResultsDashboard = () => {
  return (
    <>
      <AllData />
      <RevenuePerCity />
      <UnitsSoldPerProduct />
      <RevenuePerMonth />
      <MonthlyMetrics />
    </>
  );
};

export default ResultsDashboard;
