class PSO {
    constructor() {
        this.samecount = 0;
        this.w = 0.72984;
        this.c1 = 2.05;
        this.c2 = 2.05;
    }
    static run() {
        console.log("running particle swarm optimization");
        let optimizer = new PSO();
        optimizer.solve();
    }
    /**
     * init
     */
    init() {
        //randomly initialize particles
        this.swarm = new Array(10000);
        for (let i = 0; i < PSO.size; i++) {
            //create new 8 dimensional position 
            let curPos = new Array(8);
            for (let j = 0; j < curPos.length; j++) {
                curPos[j] = Objective.getRandomWeight();
            }
            this.swarm[i] = new Particle(curPos);
        }
    }
    /**
     * solve
     */
    solve() {
        let converged = false;
        //init swarm
        this.init();
        //loop
        while (!converged) {
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
    calcVelocity(p) {
        let inertia = this.vectorScale(p.velocity, this.w);
        let cogvec = this.vectorScale(this.vectorSub(p.best, p.pos), this.c1 * (Math.random() + 2));
        let socialvec = this.vectorScale(this.vectorSub(PSO.best, p.pos), this.c2 * (Math.random() + 2));
        return this.vectorAdd(this.vectorAdd(cogvec, socialvec), inertia);
    }
    /**
     * moveParticles
     */
    moveParticles() {
        for (let i = 0; i < this.swarm.length; i++) {
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
    didConverge() {
        if (this.samecount >= PSO.MAX_SAME_COUNT) {
            return true;
        }
        else {
            this.samecount++;
        }
        return false;
    }
    /**
     * vectorAdd
     * @param v1 first vector to sum
     * @param v2 second vector to sum
     */
    vectorAdd(v1, v2) {
        let newVector = new Array(8);
        for (let i = 0; i < newVector.length; i++) {
            newVector[i] = v1[i] + v2[i];
        }
        return newVector;
    }
    /**
     * vectorSub
     * @param v1 vector to subtract from
     * @param v2 vector subtracted from the first vector
     */
    vectorSub(v1, v2) {
        let newVector = new Array(8);
        for (let i = 0; i < newVector.length; i++) {
            newVector[i] = v1[i] - v2[i];
        }
        return newVector;
    }
    /**
     * vectorMultiply
     * @param v1 first vector to multiply
     * @param v2 second vector to multiply
     */
    vectorMultiply(v1, v2) {
        let newVector = new Array(8);
        for (let i = 0; i < newVector.length; i++) {
            newVector[i] = v1[i] * v2[i];
        }
        return newVector;
    }
    /**
     * vectorScale
     * @param vec vector to scale
     * @param scalar scalar value to scale the vector by
     */
    vectorScale(vec, scalar) {
        let newVector = new Array(vec.length);
        for (let i = 0; i < newVector.length; i++) {
            newVector[i] = vec[i] * scalar;
        }
        return newVector;
    }
}
PSO.size = 10000;
PSO.particleSize = 8;
PSO.TOLERANCE = 0.01;
PSO.MAX_SAME_COUNT = 100;
//# sourceMappingURL=pso.js.map