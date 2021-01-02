class Particle {
    constructor(position) {
        this.pos = position;
        this.bestScore = Number.MAX_SAFE_INTEGER;
        this.velocity = new Array(1, 1, 1, 1, 1, 1, 1, 1);
        this.best = this.pos;
    }
    setPosition(position) {
        this.pos = position;
    }
    setVelocity(vel) {
        this.velocity = vel;
    }
    setBest(best) {
        this.best = best;
    }
    setBestScore(score) {
        this.bestScore = score;
    }
}
//# sourceMappingURL=particle.js.map