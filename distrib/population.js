class Population {
    constructor(size) {
        this.size = size;
        this.individuals = new Array(size);
    }
    getBest() {
        return this.best;
    }
    getWorst() {
        return this.worst;
    }
    getMember(index) {
        return this.individuals[index];
    }
    setMember(index, genome) {
        this.individuals[index] = genome;
    }
    setBestWorst() {
        let bestGenome = null;
        let worstGenome = null;
        let bestScore = Number.MAX_SAFE_INTEGER;
        let worstScore = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < this.individuals.length; i++) {
            let genomeScore = this.individuals[i].getScore();
            if (genomeScore < bestScore) {
                bestGenome = this.individuals[i];
                bestScore = genomeScore;
            }
            if (genomeScore > worstScore) {
                worstGenome = this.individuals[i];
                worstScore = genomeScore;
            }
        }
        this.best = bestGenome;
        this.worst = worstGenome;
    }
}
//# sourceMappingURL=population.js.map