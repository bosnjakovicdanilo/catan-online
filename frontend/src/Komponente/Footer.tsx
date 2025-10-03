import React from "react";
import "./Footer.css";
import ikonica1 from "../slike/ikonica1.png";
import ikonica2 from "../slike/ikonica2.png";
import ikonica3 from "../slike/ikonica3.png";
import ikonica4 from "../slike/ikonica4.png";

const Footer: React.FC = () => {
  return (
    <footer className="home-footer">
      <div className="footer-icons">
        <a href="#"><img src={ikonica1} alt="Ikonica 1" /></a>
        <a href="#"><img src={ikonica2} alt="Ikonica 2" /></a>
        <a href="#"><img src={ikonica3} alt="Ikonica 3" /></a>
        <a href="#"><img src={ikonica4} alt="Ikonica 4" /></a>
      </div>
    </footer>
  );
};

export default Footer;
