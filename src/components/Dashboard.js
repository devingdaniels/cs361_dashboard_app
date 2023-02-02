import React from "react";

import { Link, Outlet } from "react-router-dom";

import { TiWeatherPartlySunny } from "react-icons/ti";
import { TfiMoney } from "react-icons/tfi";

function Dashboard() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/weather">
              <TiWeatherPartlySunny size="40px" />
              <h3>Weather</h3>
            </Link>
          </li>
          <li>
            <Link to="/stocks">
              <TfiMoney size="40px" />
              <h3>Stock Search</h3>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Dashboard;
