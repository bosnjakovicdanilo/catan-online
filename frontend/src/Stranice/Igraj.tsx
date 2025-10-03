import React, { useState } from "react";
import "./Igraj.css";

import pustinjaImg from "../slike/pustinja.png";
import drvoImg from "../slike/drvo.png";
import ovcaImg from "../slike/ovca.png";
import psenicaImg from "../slike/psenica.png";
import ciglaImg from "../slike/cigla.png";
import kamenImg from "../slike/kamen.png";

const hexLayout = [3, 4, 5, 4, 3];

const resourceLimits: Record<string, number> = {
  pustinja: 1,
  drvo: 4,
  ovca: 4,
  pšenica: 4,
  cigla: 3,
  kamen: 3,
};

const numberTokens = [
  5, 2, 6, 3, 8, 10, 9,
  12, 11, 4, 8, 10, 9,
  4, 5, 6, 3, 11,
];

const outerRing = [0, 1, 2, 6, 11, 15, 18, 17, 16, 12, 7, 3];
const innerRing = [4, 5, 10, 14, 13, 8];
const center = 9;
const cornerIndices = [0, 2, 11, 18, 16, 7];

const tromedje: number[][] = [
  [0, 1, 4], [1, 2, 5], [2, 5, 6],
  [0, 3, 4], [1, 4, 5],
  [3, 4, 8], [3, 7, 8], [4, 5, 9],
  [4, 8, 9], [5, 6, 10], [5, 9, 10],
  [6, 10, 11],
  [7, 8, 12], [8, 12, 13], [8, 9, 13],
  [9, 13, 14], [9, 10, 14],
  [10, 14, 15], [10, 11, 15],
  [12, 13, 16], [13, 16, 17], [13, 14, 17],
  [14, 17, 18], [14, 15, 18],
];

type Player = {
  id: number;
  name: string;
  avatar?: string;
  resources: Record<string, number>;
};

export default function Igraj() {
  const [tiles, setTiles] = useState<(string | null)[]>(Array(19).fill(null));
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(Object.keys(resourceLimits).map(r => [r, 0]))
  );
  const [numbers, setNumbers] = useState<(number | null)[]>(Array(19).fill(null));
  const [rolled, setRolled] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Igrač 1", resources: { drvo: 0, ovca: 0, pšenica: 0, cigla: 0, kamen: 0 } },
    { id: 2, name: "Igrač 2", resources: { drvo: 0, ovca: 0, pšenica: 0, cigla: 0, kamen: 0 } },
  ]);

  const [log, setLog] = useState<string[]>([]); 
  const [playerTromedje, setPlayerTromedje] = useState<{ id: number; fields: number[] }[]>([]);

  const resourceImages: Record<string, string> = {
    pustinja: pustinjaImg,
    drvo: drvoImg,
    ovca: ovcaImg,
    pšenica: psenicaImg,
    cigla: ciglaImg,
    kamen: kamenImg,
  };
  const resourceEmojis: Record<string, string> = {
    pustinja: "🏜",
    drvo: "🌲",
    ovca: "🐑",
    pšenica: "🌾",
    cigla: "🧱",
    kamen: "🪨",
  };

  async function rollTwoDiceAPI() {
    try {
      const res = await fetch("https://www.dejete.com/api/dice?numdice=2&numsides=6");
      const data = await res.json();
      const sum = data.dice.reduce((a: number, b: number) => a + b, 0);
      return sum;
    } catch {
      return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    }
  }

  function rollOneDie(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  function saveGame() {
    const payload = { tiles, counts, numbers, players, playerTromedje, started, log };
    localStorage.setItem("catan_game", JSON.stringify(payload));
    alert("✅ Partija sačuvana.");
  }

  function loadGame() {
    const saved = localStorage.getItem("catan_game");
    if (!saved) return alert("❌Nema sačuvane partije.");
    try {
      const parsed = JSON.parse(saved);
      setTiles(parsed.tiles || Array(19).fill(null));
      setCounts(parsed.counts || counts);
      setNumbers(parsed.numbers || numbers);
      setPlayers(parsed.players || players);
      setPlayerTromedje(parsed.playerTromedje || []);
      setStarted(parsed.started || false);
      setLog(parsed.log || []);
      alert("✅ Partija učitana.");
    } catch {
      alert("❌ Greška pri učitavanju.");
    }
  }

  function resetGame() {
    if (!window.confirm("Reset partiju?")) return;
    setTiles(Array(19).fill(null));
    setCounts(Object.fromEntries(Object.keys(resourceLimits).map(r => [r, 0])));
    setNumbers(Array(19).fill(null));
    setRolled(null);
    setStarted(false);
    setPlayerTromedje([]);
    setLog([]);
  }

  const handleSelect = (idx: number, res: string) => {
    if (tiles[idx]) return;
    if (counts[res] >= resourceLimits[res]) {
      alert(`Nema više ${res}`);
      return;
    }
    const newTiles = [...tiles];
    newTiles[idx] = res;
    setTiles(newTiles);
    setCounts({ ...counts, [res]: counts[res] + 1 });
  };

  const rollDiceAndAssign = () => {
    if (tiles.includes(null)) return alert("Popuni sva polja!");
    const dice = rollOneDie();
    setRolled(dice);

    const startCorner = cornerIndices[dice - 1];
    const startOuterIdx = outerRing.indexOf(startCorner);
    const rotatedOuter = outerRing.slice(startOuterIdx).concat(outerRing.slice(0, startOuterIdx));

    let numIndex = 0;
    const newNumbers: Array<number | null> = Array(19).fill(null);
    rotatedOuter.forEach(idx => {
      if (tiles[idx] !== "pustinja") newNumbers[idx] = numberTokens[numIndex++];
    });

    const rotatedInner = innerRing.concat(innerRing).slice(dice % 6, dice % 6 + 6);
    rotatedInner.forEach(idx => {
      if (tiles[idx] !== "pustinja") newNumbers[idx] = numberTokens[numIndex++];
    });
    if (tiles[center] !== "pustinja") newNumbers[center] = numberTokens[numIndex++];

    setNumbers(newNumbers);
  };

  const startGame = () => {
    const allAssigned = tiles.every((tile, idx) => tile === "pustinja" || numbers[idx] !== null);
    if (!allAssigned) return alert("Prvo dodeli brojeve!");
    const shuffled = [...tromedje].sort(() => Math.random() - 0.5);
    const chosen: { id: number; fields: number[] }[] = [];
    for (let pid = 1; pid <= players.length; pid++) {
      let playerT: number[][] = [];
      for (let i = 0; i < 2; i++) {
        const candidate = shuffled.find(tri => {
          const overlapSelf = playerT.some(t => t.some(f => tri.includes(f)));
          const overlapOthers = chosen.some(ch => ch.fields.some(f => tri.includes(f)));
          return !overlapSelf && !overlapOthers;
        });
        if (candidate) {
          playerT.push(candidate);
          shuffled.splice(shuffled.indexOf(candidate), 1);
        }
      }
      playerT.forEach(tri => chosen.push({ id: pid, fields: tri }));
    }
    setPlayerTromedje(chosen);
    setLog(prev => [...chosen.map(obj => `Igrač ${obj.id}: ${JSON.stringify(obj.fields)}`), ...prev].slice(0, 4));
    setStarted(true);
  };

  const [shake, setShake] = useState(false);

  const rollGameDice = async () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);

    const dice = await rollTwoDiceAPI();
    setRolled(dice);

    const newPlayers = players.map(p => {
      const upd = { ...p, resources: { ...p.resources } };
      const troms = playerTromedje.filter(t => t.id === p.id);
      troms.forEach(trom => {
        trom.fields.forEach(idx => {
          if (numbers[idx] === dice && tiles[idx] && tiles[idx] !== "pustinja") {
            const r = tiles[idx]!;
            upd.resources[r as keyof typeof upd.resources] += 1;
          }
        });
      });
      return upd;
    });

    setPlayers(newPlayers);
    setLog(prev => [`Dobijen je broj ${dice}`, ...prev].slice(0, 4));
  };

  let counter = 0;

  return (
    <>
      <div className="board-wrapper">
        <div className="left-column">
          {!started && (
            <>
              <button className="dice-btn" onClick={rollDiceAndAssign}>
                Baci kocku i dodeli brojeve
              </button>
              {rolled !== null && <p>Pao broj: {rolled}</p>}
              <button className="start-btn" onClick={startGame}>Počni igru</button>
            </>
          )}

          {started && (
            <>
              <div className="button-row">
                <div
                  className={`dice-icon ${shake ? "dice-shake" : ""}`}
                  onClick={rollGameDice}>
                  <span style={{ fontSize: "32px", cursor: "pointer" }}>🎲</span>
                </div>

                <button
                  className="start-btn"
                  onClick={() => {
                    resetGame();
                    window.location.href = "/";
                  }}>
                  Završi partiju
                </button>
              </div>

              <div className="player-info">
                {players.map(p => (
                  <div key={p.id} className="player-box">
                    <h3 style={{margin:0}}>{p.name}</h3>
                    <p>🌲 {p.resources.drvo} 🐑 {p.resources.ovca} 🌾 {p.resources.pšenica} 🧱 {p.resources.cigla} 🪨 {p.resources.kamen}</p>
                  </div>
                ))}
              </div>

              <div className="roll-log">
                <h3>Poslednja bacanja:</h3>
                <ul>{log.map((entry, idx) => <li key={idx}>{entry}</li>)}</ul>
              </div>
            </>
          )}
        </div>

        <div className="board">
          {hexLayout.map((count, rowIdx) => (
            <div key={rowIdx} className="row">
              {Array(count).fill(null).map(() => {
                const idx = counter++;
                const owner = playerTromedje.find(t => t.fields.includes(idx));
                const ownerClass = owner ? `owned player-${owner.id}` : "";

                return (
                  <div key={idx} className={`hex ${ownerClass}`}>
                    {tiles[idx] ? (
                      <>
                        <img src={resourceImages[tiles[idx]!]} alt={tiles[idx]!} />
                        {numbers[idx] && <div className="number">{numbers[idx]}</div>}
                      </>
                    ) : (
                      <div className="options-grid">
                        {Object.keys(resourceLimits).map(res => (
                          <button key={res} onClick={() => handleSelect(idx, res)}>
                            {resourceEmojis[res]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="controls-top">
          <button onClick={saveGame} className="small-btn">Sačuvaj</button>
          <button onClick={loadGame} className="small-btn">Učitaj</button>
          <button onClick={resetGame} className="small-btn">Reset</button>
        </div>
      </div>
    </>
  );
}
