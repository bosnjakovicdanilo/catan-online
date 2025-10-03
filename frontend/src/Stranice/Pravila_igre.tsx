import React from "react";
import "./Pravila_igre.css";

export default function PravilaIgre() {
  return (
    <div className="pravila-container">
     
      <div className="pravila-top">
        <div className="pravila-box">
          <h3>Opis</h3>
          <p>
            Catan je strateška igra trgovine i izgradnje. Cilj je osvojiti 10 poena izgradnjom naselja,
            gradova i puteva te korišćenjem posebnih bonusa.
          </p>
        </div>
        <div className="pravila-box">
          <h3>Cilj igre</h3>
          <p>
            Budi prvi igrač sa 10 poena, prikupljajući resurse i pametno ih razmenjujući kako bi
            gradio i razvijao svoje teritorije.
          </p>
        </div>
      </div>


      <div className="pravila-left">
        <h3>Tok poteza</h3>
        <ol>
          <li>Bacite kockice – svi igrači dobijaju resurse sa odgovarajućih polja.</li>
          <li>Trgujte sa igračima ili preko luka.</li>
          <li>Gradite puteve, naselja i gradove ili kupujte karte razvoja.</li>
        </ol>
      </div>

      <div className="pravila-center">
        <h3>Poeni</h3>
        <p>
          Naselje: 1 poen | Grad: 2 poena | Karte pobede: 1 poen <br />
          Najduži put: 2 poena | Najveća vojska: 2 poena
        </p>
      </div>

      <div className="pravila-right">
        <h3>Razbojnik</h3>
        <p>
          Kad se baci 7, igrači sa više od 7 karata odbacuju polovinu. Bacajući 7 pomerate
          razbojnika na novo polje, blokirate ga i uzimate 1 kartu od igrača pored tog polja.
        </p>
      </div>
    </div>
  );
}