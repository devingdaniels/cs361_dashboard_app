// Routing\
import { Link, Outlet } from "react-router-dom";
import "../App.css";

function Dashboard() {
  return (
    <>
      <nav>
        <Link to="/weather" className="a">
          <h3>Weather</h3>
        </Link>
        <Link to="/prompt" className="a">
          <h3>PromptGPT</h3>
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Dashboard;
