class Genome {
  genes: Array<number>;

  public constructor (size:number) {
    this.genes = new Array(size);
  }

  public getData(): Array<number> {
    return this.genes;
  }

  public mutate(rate: number) {
    for(let i = 0; i < this.genes.length; i++) {
      this.genes[i] += this.genes[i] * (rate - Math.random() * rate * 2);
    }
  }
  
  public toString(): string {
    let s = "";
    for(let i = 0; i < this.genes.length; i++) {
      s += this.genes[i] + " ";
    }
    return s;
  }

  public getScore(): number {
    let objective = new Objective();
    return objective.calculateScore(this);
  }
}