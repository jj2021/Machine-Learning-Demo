class Particle {
  private x: number;
  private y: number;

  public constructor (x:number, y:number) {
    this.setPosition(x, y);
  }

  public setPosition(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}