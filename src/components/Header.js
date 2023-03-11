import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import "../styles/siteMenu.css";
import WidgetIcon from "../images/menu.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    window.open(
      "https://github.com/devingdaniels/cs361_dashboard_app",
      "_blank"
    );
  };
  const [active, setActive] = useState("");
  const handleClick = (event) => {
    setActive(event.target.id);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActive("1");
    }
  }, [location.pathname]);

  const style = {
    cursor: "pointer",
    width: "100px",
  };

  return (
    <header>
      <img onClick={() => navigate("/")} src={WidgetIcon} style={style}></img>
      <h1>WidgetWorld</h1>
      <Menu right>
        <div className="ham-nav-buttons">
          <Link
            onClick={handleClick}
            className={active === "1" ? "active" : undefined}
            id={"1"}
            to="/"
          >
            Home
          </Link>
        </div>
        <div className="ham-nav-buttons">
          <Link
            onClick={handleClick}
            className={active === "2" ? "active" : undefined}
            id={"2"}
            to="/weather"
          >
            Weather
          </Link>
        </div>
        <div className="ham-nav-buttons">
          <Link
            onClick={handleClick}
            className={active === "3" ? "active" : undefined}
            id={"3"}
            to="/prompt"
          >
            promptGPT
          </Link>
        </div>
      </Menu>
    </header>
  );
}

export default Header;
