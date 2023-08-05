import { useNavigate, Link } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import WidgetIcon from "../images/menu.png";
import "../styles/siteMenu.css";

function Header() {
  const navigate = useNavigate();
  const style = {
    cursor: "pointer",
    width: "100px",
    padding: "10px",
  };

  return (
    <header>
      <img
        onClick={() => navigate("/")}
        src={WidgetIcon}
        style={style}
        alt=""
      ></img>
      <h1>WidgetWorld</h1>
      <Menu right>
        <div className="ham-nav-buttons">
          <Link to="/">Home</Link>
        </div>
        <div className="ham-nav-buttons">
          <Link to="/weather">Weather</Link>
        </div>
        <div className="ham-nav-buttons">
          <Link to="/prompt">Davinci</Link>
        </div>
      </Menu>
    </header>
  );
}

export default Header;
