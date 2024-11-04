import AllData from "./AllData";
import RevenuePerCity from "./CitiesInsight";
import MonthlyMetrics from "./MonthlyMertrics";
import RevenuePerMonth from "./MonthlyTrends";

const ResultsDashboard = () => {
  return (
    <>
      <AllData />
      <RevenuePerCity />
      <RevenuePerMonth />
      <MonthlyMetrics />
    </>
  );
};

export default ResultsDashboard;
