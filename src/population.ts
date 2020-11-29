class Population {
  size: number;
  individuals: Array<Genome>;
  best: Genome;
  worst: Genome;

  public constructor(size:number) {
    this.size = size;
    this.individuals = new Array<Genome>(size);
  }

  public getBest() {
    return this.best;
  }

  public getWorst() {
    return this.worst;
  }

  public getMember(index: number): Genome {
    return this.individuals[index];
  }

  public setMember(index: number, genome: Genome) {
    this.individuals[index] = genome;
  }

  public setBestWorst() {
    let bestGenome = null;
    let worstGenome = null;
    let bestScore = Number.MAX_SAFE_INTEGER;
    let worstScore = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < this.individuals.length; i++) {
      let genomeScore = this.individuals[i].getScore() 
      if(genomeScore < bestScore) {
        bestGenome = this.individuals[i];
        bestScore = genomeScore;
      }
      if(genomeScore > worstScore) {
        worstGenome = this.individuals[i];
        worstScore = genomeScore;
      }
    }
    this.best = bestGenome;
    this.worst = worstGenome;
  }

}