import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  // Updated students array with names and IDs
  const students = [
    "  ali_228133 علي محمد",
    "ward_330831 ورد سلطان",
    "wedian_321996 وديان الابراهيم",
    "sara_328638 ساره حسن",
    "souzan _331010 سوزان طيار",
  ];

  const handleNavigate = () => {
    navigate("/results");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Data Analysis Assignment</h1>
      <h2>Supervised by Dr. Bassel Al Khateb</h2>

      <div className="student-list">
        {students.map((student, index) => (
          <div key={index} className="student-card">
            {student}
          </div>
        ))}
      </div>

      <button className="results-button" onClick={handleNavigate}>
        View Results
      </button>
    </div>
  );
};

export default WelcomePage;
