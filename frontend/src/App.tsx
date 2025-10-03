import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Stranice/Home";
import Register from "./Stranice/Register";
import Stats from "./Stranice/Statistika_igraca";
import CatanInfo from "./Stranice/Pravila_igre";
import Igraj from "./Stranice/Igraj";
import Login from "./Stranice/Login";
import Ekspanzije from "./Stranice/Ekspanzije";
import Navbar from "./Komponente/NavBar";
import Footer from "./Komponente/Footer";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/statistika" element={<Stats />} />
        <Route path="/pravila" element={<CatanInfo />} />
        <Route path="/igraj" element={<Igraj />} />
        <Route path="/ekspanzije" element={<Ekspanzije />} />
        <Route path="*" element={<h1>Stranica nije pronađena</h1>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
