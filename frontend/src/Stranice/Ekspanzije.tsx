import React, { useState } from "react";
import "./Ekspanzije.css";
import eks1 from "../slike/ekspanzija1.png";
import eks2 from "../slike/ekspanzija2.png";
import eks3 from "../slike/ekspanzija3.png";
import eks4 from "../slike/ekspanzija4.png";
import { Expansion } from "../Modeli/Ekspanzije";


const allExpansions: Expansion[] = [
  new Expansion(
    "SEAFARERS",
    eks1,
    "Dodaje more, brodove i nova ostrva za istraživanje i kolonizaciju."
  ),
  new Expansion(
    "TRADERS & BARBARIANS",
    eks2,
    "Donosi nove scenarije, trgovce i nove mehanike kretanja karavana."
  ),
  new Expansion(
    "EXPLORERS & PIRATES",
    eks3,
    "Dodaje misije, gusare i otkrivanje novih oblasti mape."
  ),
  new Expansion(
    "CITIES & KNIGHTS",
    eks4,
    "Uvodi vitezove, unapređenja gradova i odbranu od varvara."
  ),
];

export default function Ekspanzije() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("title");

  const itemsPerPage = 2;

  
  const filtered = allExpansions.filter((exp) =>
    exp.title.toLowerCase().includes(search.toLowerCase())
  );

  
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return a.desc.length - b.desc.length;
    }
  });

  
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sorted.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  return (
    <div className="ekspanzije-container">

      {}
      <div className="filters">
        <input
          type="text"
          placeholder="Pretraži po nazivu..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="title">Sortiraj po nazivu</option>
          <option value="length">Sortiraj po dužini opisa</option>
        </select>
      </div>

      {}
      <div className="ekspanzije-grid">
        {currentItems.map((exp, i) => (
          <div key={i} className="ekspanzija-box">
            <h3>{exp.title}</h3>
            <img src={exp.img} alt={exp.title} />
            <p>{exp.shortDesc(80)}</p>
          </div>
        ))}
      </div>

      {}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
