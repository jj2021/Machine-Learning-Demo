class Genome {
  genes: Array<number>;

  public constructor (size:number) {
    this.genes = new Array(size);
  }

  public getData(): Array<number> {
    return this.genes;
  }

  public mutate() {

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