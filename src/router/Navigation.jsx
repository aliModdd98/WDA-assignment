import { Route, Routes } from "react-router-dom";
import ResultsDashboard from "../Pages/Result";
import WelcomePage from "../Pages/Launch";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/results" element={<ResultsDashboard />} />
    </Routes>
  );
};

export default Navigation;
