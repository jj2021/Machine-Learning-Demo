class GeneticAlgorithm {
    constructor() {
        this.TOLERANCE = 0.01;
        this.samecount = 0;
        this.ylast = 0;
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
     * Generate a random genome
     * @param size number of genes in the genome
     */
    static randGenome(size) {
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
        // Initialize the population
        let population = this.initPop();
        // Run the training algorithm
        this.train(population);
        // Return the best genome
        return population.getBest();
    }
    /**
     * Run the training algorithm (iterate over generations)
     * @param population The population to train
     */
    train(population) {
        let iteration = 0;
        let converged = false;
        while (!converged) {
            // Generate the next epoch
            this.iterate(population);
            iteration++;
            // Output best genome and error
            let err = population.best.getScore();
            console.log("" + iteration + ": " + err);
            // Check for convergence
            converged = this.didConverge(err);
            //converged = true;
        }
    }
    /**
     * Generate the next generation of individuals
     * @param population The population used to create the next epoch
     */
    iterate(population) {
        // crossover and mutate at the correct rate
        // Create a mating pool for selecting parents to breed
        let bestGenome = population.getBest();
        let matingPool = new Array();
        for (let i = 0; i < population.individuals.length; i++) {
            // Normalize the fitness values of the individuals
            // Fitness is already between 0 and 1 so just reverse for minimization effect
            let normScore = 1 - population.individuals[i].getScore();
            //console.log("Score: " + population.individuals[i].getScore() + " Norm Score:" + normScore);
            let n = normScore * 100;
            //console.log(n);
            // Create a "mating pool" based on the scaled fitness
            // (The greater fittness, the greater the likelyhood of being a parent)
            for (let j = 0; j < n; j++) {
                matingPool.push(population.individuals[i]);
            }
        }
        //console.log("Mating pool: " + matingPool.length);
        // Use elite selection to avoid regressing
        population.setMember(0, bestGenome);
        // Execute cross-over to produce new epoch/generation of individuals
        for (let i = 1; i < population.size; i++) {
            // Select random parents from mating pool
            let parentAIndex = Math.floor(Math.random() * matingPool.length);
            let parentBIndex = Math.floor(Math.random() * matingPool.length);
            let parentA = matingPool[parentAIndex];
            let parentB = matingPool[parentBIndex];
            let children = this.crossover(parentA, parentB);
            if (Math.random() < .9) {
                population.setMember(i, children[0]);
                population.setMember(i + 1, children[1]);
            }
        }
        // Update best and worst individual for the new epoch/generation
        population.setBestWorst();
    }
    /**
     * Normalize an individuals score to 0 - 1 range
     * @param score score to normalize
     * @param best best score
     * @param worst worst score
     */
    normalize(score, best, worst) {
        return (score - worst) / (best - worst);
    }
    crossover(parentA, parentB) {
        // Execute crossover by random selection from the mating pool
        let midPoint = Math.floor(GeneticAlgorithm.GENOME_SIZE / 2);
        let parentA1 = parentA.getData().slice(0, midPoint);
        let parentA2 = parentA.getData().slice(midPoint, GeneticAlgorithm.GENOME_SIZE);
        let parentB1 = parentB.getData().slice(0, midPoint);
        let parentB2 = parentB.getData().slice(midPoint, GeneticAlgorithm.GENOME_SIZE);
        // Create children by crossing over at the mid point
        let child1 = new Genome(GeneticAlgorithm.GENOME_SIZE);
        let child2 = new Genome(GeneticAlgorithm.GENOME_SIZE);
        child1.setData(parentA1.concat(parentB2));
        child2.setData(parentB1.concat(parentA2));
        // Mutate based on the given rate and amount of perturbance
        child1.mutate(GeneticAlgorithm.MUTATION_RATE, .001);
        child2.mutate(GeneticAlgorithm.MUTATION_RATE, .001);
        let children = new Array();
        children.push(child1);
        children.push(child2);
        return children;
    }
    /**
     * Check whether or not the network has converged
     * @param err The error of the current best individual
     */
    didConverge(err) {
        // TODO: Check for convergence and return result
        if (this.samecount >= GeneticAlgorithm.MAX_SAME_COUNT) {
            return true;
        }
        if (Math.abs(this.ylast - err) < this.TOLERANCE) {
            this.samecount++;
        }
        else {
            this.samecount = 0;
        }
        this.ylast = err;
        return false;
    }
    /**
     * Create initial population with random members (genomes)
     */
    initPop() {
        let pop = new Population(GeneticAlgorithm.POPULATION_SIZE);
        // TODO: Add random members to the population
        for (let i = 0; i < GeneticAlgorithm.POPULATION_SIZE; i++) {
            pop.setMember(i, GeneticAlgorithm.randGenome(GeneticAlgorithm.GENOME_SIZE));
        }
        pop.setBestWorst();
        //console.log(pop);
        return pop;
    }
}
GeneticAlgorithm.MUTATION_RATE = 0.01;
GeneticAlgorithm.MAX_SAME_COUNT = 100;
GeneticAlgorithm.GENOME_SIZE = 8;
GeneticAlgorithm.POPULATION_SIZE = 10000;
//# sourceMappingURL=geneticAlgorithm.js.map