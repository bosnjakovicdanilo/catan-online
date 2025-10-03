import React, { useEffect, useState } from "react";
import "./Statistika_igraca.css";
import { PlayerStats } from "../Modeli/Statistika"; 

export default function Stats() {
  const userData = localStorage.getItem("user");
  const username = userData
    ? JSON.parse(userData).username
    : "Nepoznati korisnik";

  const playerStats = new PlayerStats(12, 7, 85); 
  const stats = playerStats.getStats();

  const [quote, setQuote] = useState<string>("Učitavam motivacionu poruku...");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          setQuote(`"${data.content}" — ${data.author}`);
        }
      })
      .catch(() => {
        setQuote("You win some, you lose some.");
      });
  }, []);

  return (
    <div className="stats-container">
      <h1>Statistika igrača: {username}</h1>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Odigrane partije</th>
            <th>Pobedjene partije</th>
            <th>Procenat pobeda</th>
            <th>Poeni po partiji</th>
            <th>Ukupno poena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stats.odigrane}</td>
            <td>{stats.pobedjene}</td>
            <td>{stats.procenat}%</td>
            <td>{stats.poeniPoPartiji}</td>
            <td>{stats.ukupnoPoena}</td>
          </tr>
        </tbody>
      </table>

      <div className="quote-box">
        <h2>Motivacija za nastavak igre</h2>
        <p>{quote}</p>
      </div>
    </div>
  );
}
