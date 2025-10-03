import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import catanImage from "../slike/katantabla.png";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameOrEmail.trim() || !password.trim()) {
      setError("⚠️ Sva polja su obavezna!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameOrEmail,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "❌ Pogrešno korisničko ime/email ili lozinka");
      } else {
        console.log("✅ Ulogovan:", data);
        localStorage.setItem("user", JSON.stringify({ username: usernameOrEmail }));
        navigate("/"); // Preusmeravanje nakon uspešnog logina
      }
    } catch (err) {
      console.error(err);
      setError("❌ Greška pri konekciji sa serverom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Prijavi se:</h2>

          {error && <p className="error-message">{error}</p>}

          <label>Username/Email</label>
          <input
            type="text"
            placeholder="Unesite korisničko ime ili email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />

          <label>Lozinka</label>
          <input
            type="password"
            placeholder="Unesite lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Prijavljivanje..." : "Prijavi se"}
          </button>

          <div className="register-section">
            <p>ili ukoliko nemaš nalog:</p>
            <button type="button" onClick={() => navigate("/register")}>
              Registracija
            </button>
          </div>
        </form>

        <img className="login-image" src={catanImage} alt="Catan tabla" />
      </div>
    </div>
  );
};

export default Login;
