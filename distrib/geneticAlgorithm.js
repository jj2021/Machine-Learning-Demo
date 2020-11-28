class GeneticAlgorithm {
    constructor() {
        this.TOLERANCE = 0.01;
        this.samecount = 0;
    }
    /**
     * Run the genetic algorithm for the XOR network
     */
    static run() {
        let ga = new GeneticAlgorithm();
        let best = ga.solve();
        console.log("best = " + best.toString() + " fitness = " + best.getScore());
    }
    /**
     * Generate a randome genome
     * @param size number of genes in the genome
     */
    randGenome(size) {
        let member = new Genome(size);
        let data = member.getData();
        for (let k = 0; k < data.length; k++) {
            data[k] = Objective.getRandomWeight();
        }
        return member;
    }
    /**
     * Solve the objective
     */
    solve() {
        // TODO: Initialize the population
        let population = this.initPop();
        // TODO: Run the training algorithm
        // TODO: Return the best genome
        return new Genome(8);
    }
    /**
     * Run the training algorithm (iterate over generations)
     */
    train() {
        // TODO: iterate until convergence
        // TODO: crossover and mutate at the correct rate
        // TODO: output/set best genome
        // TODO: check for convergence
    }
    /**
     * Check whether or not the network has converged
     */
    didConverge() {
        // TODO: Check for convergence and return result
        return false;
    }
    /**
     * Create initial population with random members (genomes)
     */
    initPop() {
        let pop = new Population(GeneticAlgorithm.POPULATION_SIZE);
        // TODO: Add random members to the population
        return pop;
    }
    /**
     * Create offspring from two existing genomes
     */
    crossover() {
        // TODO: Implement crossover algorithm for simulating offspring
        // TODO: Normalize the fitness values of the individuals
        // TODO: Create a "mating pool" based on the scaled fitness
        // TODO: Execute crossover by random selection from the mating pool
        // TODO: child.mutate(probability)
    }
    /**
     * Decides whether or not the function will execute based on
     * probability
     */
    willExecute() {
        // get the total probability
        // generate a random number
        // if the random number is less than the probability
        // of the action then return true, otherwise return false
    }
}
GeneticAlgorithm.MUTATION_RATE = 0.01;
GeneticAlgorithm.MAX_SAME_COUNT = 100;
GeneticAlgorithm.POPULATION_SIZE = 1000;
//# sourceMappingURL=geneticAlgorithm.js.map