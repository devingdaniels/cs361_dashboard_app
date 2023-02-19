// Routing
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <nav>
        <Link to="/weather">
          <h3>Weather</h3>
        </Link>
        <Link to="/stocks">
          <h3>Stocks</h3>
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Dashboard;
