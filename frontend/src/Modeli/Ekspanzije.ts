export interface IExpansion {
  title: string;
  img: string;
  desc: string;
  shortDesc(maxLength: number): string;
}

export class Expansion implements IExpansion {
  title: string;
  img: string;
  desc: string;

  constructor(title: string, img: string, desc: string) {
    this.title = title;
    this.img = img;
    this.desc = desc;
  }

  shortDesc(maxLength: number = 60): string {
    return this.desc.length > maxLength
      ? this.desc.slice(0, maxLength) + "..."
      : this.desc;
  }
}
