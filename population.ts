class Population {
  size: number;
  individuals: Array<Genome>;
  best: Genome;

  public constructor(size:number) {
    this.size = size;
    this.individuals = new Array<Genome>(size);
  }

  public getBest() {
    return this.best;
  }

  public getMember(index: number): Genome {
    return this.individuals[index];
  }

  public setMember(index: number, genome: Genome) {
    this.individuals[index] = genome;
  }

}