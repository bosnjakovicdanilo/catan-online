
export interface IPlayerStats {
  odigrane: number;
  pobedjene: number;
  ukupnoPoena: number;
  getProcenat(): number;
  getPoeniPoPartiji(): number;
  getStats(): {
    odigrane: number;
    pobedjene: number;
    procenat: number;
    poeniPoPartiji: number;
    ukupnoPoena: number;
  };
}


export class PlayerStats implements IPlayerStats {
  odigrane: number;
  pobedjene: number;
  ukupnoPoena: number;

  constructor(odigrane: number, pobedjene: number, ukupnoPoena: number) {
    this.odigrane = odigrane;
    this.pobedjene = pobedjene;
    this.ukupnoPoena = ukupnoPoena;
  }

  getProcenat(): number {
    return this.odigrane > 0
      ? Math.round((this.pobedjene / this.odigrane) * 100)
      : 0;
  }

  getPoeniPoPartiji(): number {
    return this.odigrane > 0
      ? parseFloat((this.ukupnoPoena / this.odigrane).toFixed(2))
      : 0;
  }

  getStats() {
    return {
      odigrane: this.odigrane,
      pobedjene: this.pobedjene,
      procenat: this.getProcenat(),
      poeniPoPartiji: this.getPoeniPoPartiji(),
      ukupnoPoena: this.ukupnoPoena,
    };
  }
}
