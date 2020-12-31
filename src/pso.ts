class PSO {

  private static size = 10000;
  private static best:Array<number>;
  private static particleSize = 8;
  private static readonly TOLERANCE:number = 0.01;
  private static readonly MAX_SAME_COUNT = 100;
  private samecount:number = 0;
  private swarm:Array<Particle>;
  private globalBest:Array<number>;
  private prevErr:number = 0;
  private w:number = 0.72984;
  private c1:number = 2.05;
  private c2:number = 2.05;

  public static run() {
    console.log("running particle swarm optimization");
    let optimizer = new PSO();
    optimizer.solve();
  }
  
  /**
   * init
   */
  private init() {
    //randomly initialize particles
    this.swarm = new Array<Particle>(10000);
    for(let i = 0; i < PSO.size; i++) {
      //create new 8 dimensional position 
      let curPos = new Array<number>(8);
      for(let j = 0; j < curPos.length; j++) {
        curPos[j] = Objective.getRandomWeight();
      }

      this.swarm[i] = new Particle(curPos);
    }
  }

  /**
   * solve
   */
  private solve() {
    let converged:boolean = false;
    //init swarm
    this.init();
    //loop
    while(!converged) {
      //move particles
      this.moveParticles();
      //get/update best
      //check convergence
      converged = this.didConverge();
    }
  }

  /**
   * calcVelocity
   * @param p particle to calculate velocity for
   */
  private calcVelocity(p:Particle): Array<number> { 
    let inertia = this.vectorScale(p.velocity, this.w);
    let cogvec = this.vectorScale(this.vectorSub(p.best, p.pos), this.c1 * (Math.random() + 2));
    let socialvec = this.vectorScale(this.vectorSub(PSO.best, p.pos), this.c2 * (Math.random() + 2));
    return this.vectorAdd(this.vectorAdd(cogvec, socialvec), inertia);
  }

  /**
   * moveParticles
   */
  private moveParticles() {
    for(let i = 0; i < this.swarm.length; i++) {
      //calculate new velocity
      let vel = this.calcVelocity(this.swarm[i]);
      //set particle position
      this.swarm[i].setVelocity(vel);
      this.swarm[i].setPosition(this.vectorAdd(this.swarm[i].pos, vel));
    }
  }

  /**
   * didConverge
   */
  private didConverge(): boolean {
    let obj = new Objective();
    let err = obj.calculateScoreParticle(new Particle(this.globalBest));
    if(this.samecount >= PSO.MAX_SAME_COUNT) {
      return true;
    }
    else if(Math.abs(this.prevErr - err) < PSO.TOLERANCE) {
      this.samecount++;
    }
    else {
      this.samecount = 0;
    }
    this.prevErr = err;
    return false;
  }

  /**
   * vectorAdd
   * @param v1 first vector to sum
   * @param v2 second vector to sum
   */
  private vectorAdd(v1:Array<number>, v2:Array<number>): Array<number> {
    let newVector = new Array<number>(8);
    for(let i = 0; i < newVector.length; i++) {
      newVector[i] = v1[i] + v2[i];
    }
    return newVector;
  }
  
  /**
   * vectorSub
   * @param v1 vector to subtract from
   * @param v2 vector subtracted from the first vector
   */
  private vectorSub(v1:Array<number>, v2:Array<number>): Array<number> {
    let newVector = new Array<number>(8);
    for(let i = 0; i < newVector.length; i++) {
      newVector[i] = v1[i] - v2[i];
    }
    return newVector;
  }

  /**
   * vectorMultiply
   * @param v1 first vector to multiply
   * @param v2 second vector to multiply
   */
  private vectorMultiply(v1:Array<number>, v2:Array<number>): Array<number> {
    let newVector = new Array<number>(8);
    for(let i = 0; i < newVector.length; i++) {
      newVector[i] = v1[i] * v2[i];
    }
    return newVector;
  }

  /**
   * vectorScale
   * @param vec vector to scale
   * @param scalar scalar value to scale the vector by
   */
  private vectorScale(vec:Array<number>, scalar:number): Array<number> {
    let newVector = new Array<number>(vec.length);
    for(let i = 0; i < newVector.length; i++) {
      newVector[i] = vec[i] * scalar;
    }
    return newVector;
  }
}