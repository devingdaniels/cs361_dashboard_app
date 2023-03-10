import React from "react";
import { useNavigate } from "react-router-dom";

import WidgetIcon from "../images/menu.png";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.open(
      "https://github.com/devingdaniels/cs361_dashboard_app",
      "_blank" // <- This is what makes it open in a new window.
    );
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
        Source Code
      </button>
    </header>
  );
}

export default Header;
