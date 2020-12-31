class Particle {

  public pos: Array<number>;
  public velocity: Array<number>;
  public best: Array<number>;

  public constructor(position:Array<number>) {
    this.pos = position;
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
}