class Genome {
    constructor(size) {
        this.genes = new Array(size);
    }
    getData() {
        return this.genes;
    }
    setData(data) {
        this.genes = data;
    }
    mutate(rate, perturbance) {
        if (Math.random() < rate) {
            for (let i = 0; i < this.genes.length; i++) {
                this.genes[i] += this.genes[i] * (perturbance - (Math.random() * perturbance * 2));
            }
        }
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