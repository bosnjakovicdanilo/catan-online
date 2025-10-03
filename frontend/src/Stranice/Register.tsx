import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import catanImage from "../slike/katantabla.png";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username.trim() || !password.trim()) {
    setError("⚠️ Sva polja su obavezna!");
    return;
  }

  setError("");
  setLoading(true);

  try {
    // Šaljemo samo username i password backendu
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // email NE šaljemo
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "❌ Došlo je do greške prilikom registracije.");
    } else {
      console.log("✅ Registrovan:", { username, email }); // email za frontend samo za log
      navigate("/login"); // Preusmeravanje na login
    }
  } catch (err) {
    console.error(err);
    setError("❌ Greška pri konekciji sa serverom.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Registracija</h2>

          {error && <p className="error-message">{error}</p>}

          <label htmlFor="username">Korisničko ime</label>
          <input
            id="username"
            type="text"
            placeholder="Unesite korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email (trenutno nije u bazi)</label>
          <input
            id="email"
            type="email"
            placeholder="Unesite email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />

          <label htmlFor="password">Lozinka</label>
          <input
            id="password"
            type="password"
            placeholder="Unesite lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registracija..." : "Registracija"}
          </button>

          <div className="register-section">
            Već imate nalog?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Prijavite se
            </span>
          </div>
        </form>

        <img src={catanImage} alt="Catan" className="register-image" />
      </div>
    </div>
  );
};

export default Register;
