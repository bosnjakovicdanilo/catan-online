import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import home from "../slike/home.png";
import CustomButton from "./CustomButton";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {location.pathname !== "/" && (
          <Link to="/">
            <img src={home} alt="Home" className="home-icon" />
          </Link>
        )}
        <h1>Settlers of CATAN</h1>
      </div>

      <div className="navbar-center">
        {location.pathname !== "/" && (
          <>
            <Link to="/pravila">Pravila igre</Link>
            <Link to="/igraj">Igraj</Link>
            <Link to="/ekspanzije">Ekspanzije</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {!user ? (
          <CustomButton
            className="nav-btn login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </CustomButton>
        ) : (
          <div className="user-section">
            <CustomButton className="logout-btn" onClick={handleLogout}>
              Logout
            </CustomButton>

            <CustomButton
              className="user-btn"
              onClick={() => navigate("/statistika")}
            >
              <span className="user-icon">👤</span>
              <span className="username">{user.username}</span>
            </CustomButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
