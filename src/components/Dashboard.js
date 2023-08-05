import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <nav>
        <Link to="/weather" className="a">
          <h3>Weather</h3>
        </Link>
        <Link to="/prompt" className="a">
          <h3>Davinci</h3>
        </Link>
      </nav>
    </>
  );
}

export default Dashboard;
