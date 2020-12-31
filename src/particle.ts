class Particle {

  public pos: Array<number>;
  public velocity: Array<number>;
  public best: Array<number>;
  public bestScore: number;

  public constructor(position:Array<number>) {
    this.pos = position;
    this.bestScore = Number.MAX_SAFE_INTEGER;
    this.velocity = new Array<number>(8);
    this.best = this.pos;
  }

  public setPosition(position:Array<number>) {
    this.pos = position;
  }

  public setVelocity(vel:Array<number>) {
    this.velocity = vel;
  }
  
  public setBest(best:Array<number>) {
    this.best = best;
  }

  public setBestScore(score:number) {
    this.bestScore = score;
  }
}