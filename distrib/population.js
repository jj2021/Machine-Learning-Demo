class Population {
    constructor(size) {
        this.size = size;
        this.individuals = new Array(size);
    }
    getBest() {
        return this.best;
    }
    getMember(index) {
        return this.individuals[index];
    }
    setMember(index, genome) {
        this.individuals[index] = genome;
    }
}
//# sourceMappingURL=population.js.map