import React from "react";
import { useNavigate } from "react-router-dom";

import WidgetIcon from "../images/menu.png";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logging out user...");
  };

  const style = {
    cursor: "pointer",
    width: "100px",
  };

  return (
    <header>
      <img onClick={() => navigate("/")} src={WidgetIcon} style={style}></img>
      <h1>WidgetWorld</h1>
      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
