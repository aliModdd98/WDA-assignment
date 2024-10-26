import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const students = ["Student Name 1", "Student Name 2", "Student Name 3"];

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
