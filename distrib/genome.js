class Genome {
    constructor(size) {
        this.genes = new Array(size);
    }
    getData() {
        return this.genes;
    }
    mutate() {
    }
    toString() {
        let s = "";
        for (let i = 0; i < this.genes.length; i++) {
            s += this.genes[i] + " ";
        }
        return s;
    }
    getScore() {
        let objective = new Objective();
        return objective.calculateScore(this);
    }
}
//# sourceMappingURL=genome.js.map