import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Logging out user...");
  };
  return (
    <header>
      <h1 className="dashboard-heading" onClick={() => navigate("/")}>
        Dashboard365
      </h1>
      <button className="nav-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
