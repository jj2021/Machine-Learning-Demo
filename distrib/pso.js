class PSO {
    constructor() {
        this.samecount = 0;
        this.prevErr = 0;
        this.w = 0.72984;
        this.c1 = 2.05;
        this.c2 = 2.05;
    }
    static run() {
        console.log("running particle swarm optimization");
        let optimizer = new PSO();
        optimizer.solve();
        /*
        //test the calc vel method
        optimizer.init();
        let boid = optimizer.swarm[100];
        console.log(optimizer.calcVelocity(boid));
        */
    }
    static async run_async() {
        console.log("running PSO in async mode");
        let optimizer = new PSO();
        optimizer.init();
        await optimizer.iter_solve();
        let best = optimizer.globalBest;
        let obj = new Objective();
        let result00 = obj.feedforward(Objective.XOR_INPUTS[0][0], Objective.XOR_INPUTS[0][1], best);
        let result01 = obj.feedforward(Objective.XOR_INPUTS[1][0], Objective.XOR_INPUTS[1][1], best);
        let result10 = obj.feedforward(Objective.XOR_INPUTS[2][0], Objective.XOR_INPUTS[2][1], best);
        let result11 = obj.feedforward(Objective.XOR_INPUTS[3][0], Objective.XOR_INPUTS[3][1], best);
        let err = optimizer.globalBestScore;
        return { best, result00, result01, result10, result11, err };
    }
    /**
     * init
     */
    init() {
        this.globalBestScore = Number.MAX_SAFE_INTEGER;
        this.nextGlobalBestScore = Number.MAX_SAFE_INTEGER;
        let obj = new Objective();
        //randomly initialize particles
        this.swarm = new Array(PSO.size);
        for (let i = 0; i < PSO.size; i++) {
            //create new 8 dimensional position 
            let curPos = new Array(8);
            for (let j = 0; j < curPos.length; j++) {
                curPos[j] = Objective.getRandomWeight();
            }
            this.swarm[i] = new Particle(curPos);
            //calculate initial swarm best
            let score = obj.calculateScoreParticle(this.swarm[i]);
            if (score < this.globalBestScore) {
                this.globalBestScore = score;
                this.globalBest = this.swarm[i].pos;
            }
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
        let iteration = 0;
        while (!converged) {
            //move particles
            this.moveParticles();
            //console.log(this.swarm[100]);
            //check convergence
            converged = this.didConverge();
            console.log("" + iteration + ": " + this.globalBestScore + "\nbest: " + this.globalBest);
            iteration++;
            //Safety net so the algorithm does not get stuck in an infinite loop
            if (iteration > 200) {
                converged = true;
            }
            //update the best score and position
            this.globalBest = this.nextGlobalBest;
            this.globalBestScore = this.nextGlobalBestScore;
        }
    }
    /**
     * iter_solve
     *
     * Optimizes the model iteratively, allowing for sleep function to unbloock
     * the UI
     * @param p iter_solve
     */
    async iter_solve() {
        let converged = false;
        this.moveParticles();
        converged = this.didConverge();
        console.log("best score: " + this.globalBestScore + "\nbest: " + this.globalBest);
        this.globalBest = this.nextGlobalBest;
        this.globalBestScore = this.nextGlobalBestScore;
        if (!converged) {
            await this.sleep(100);
            await this.iter_solve();
        }
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * calcVelocity
     * @param p particle to calculate velocity for
     */
    calcVelocity(p) {
        let inertia = this.vectorScale(p.velocity, this.w);
        let cogvec = this.vectorScale(this.vectorSub(p.best, p.pos), this.c1 * (Math.random() + 2));
        let socialvec = this.vectorScale(this.vectorSub(this.globalBest, p.pos), this.c2 * (Math.random() + 2));
        return this.vectorAdd(this.vectorAdd(cogvec, socialvec), inertia);
    }
    /**
     * moveParticles
     */
    moveParticles() {
        let obj = new Objective();
        for (let i = 0; i < this.swarm.length; i++) {
            //calculate new velocity
            let vel = this.calcVelocity(this.swarm[i]);
            //set particle position
            this.swarm[i].setVelocity(vel);
            this.swarm[i].setPosition(this.vectorAdd(this.swarm[i].pos, vel));
            //calculate new score and compare to personal best
            let score = obj.calculateScoreParticle(this.swarm[i]);
            if (score < this.swarm[i].bestScore) {
                this.swarm[i].bestScore = score;
                this.swarm[i].best = this.swarm[i].pos;
            }
            //compare new score to swarm (global) best
            if (score < this.globalBestScore && score < this.nextGlobalBestScore) {
                this.nextGlobalBestScore = score;
                this.nextGlobalBest = this.swarm[i].pos;
            }
        }
    }
    /**
     * didConverge
     */
    didConverge() {
        let obj = new Objective();
        let err = obj.calculateScoreParticle(new Particle(this.globalBest));
        if (this.samecount >= PSO.MAX_SAME_COUNT) {
            return true;
        }
        else if (Math.abs(this.prevErr - err) < PSO.TOLERANCE) {
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