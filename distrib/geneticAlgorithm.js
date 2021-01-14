class GeneticAlgorithm {
    constructor() {
        this.TOLERANCE = 0.01;
        this.samecount = 0;
        this.ylast = 0;
    }
    /**
     * Run the genetic algorithm for the XOR network
     */
    static async run() {
        let ga = new GeneticAlgorithm();
        //let best = ga.solve();
        let best = await ga.asyncSolve();
        console.log("best = " + best.toString() + " fitness = " + best.getScore());
        let obj = new Objective();
        console.log("x1    x2    t1    y1");
        console.log("" + Objective.XOR_INPUTS[0][0] + "    " + Objective.XOR_INPUTS[0][1] + "    " + Objective.XOR_IDEALS[0] + "    " + obj.feedforward(Objective.XOR_INPUTS[0][0], Objective.XOR_INPUTS[0][1], best.getData()));
        console.log("" + Objective.XOR_INPUTS[1][0] + "    " + Objective.XOR_INPUTS[1][1] + "    " + Objective.XOR_IDEALS[1] + "    " + obj.feedforward(Objective.XOR_INPUTS[1][0], Objective.XOR_INPUTS[1][1], best.getData()));
        console.log("" + Objective.XOR_INPUTS[2][0] + "    " + Objective.XOR_INPUTS[2][1] + "    " + Objective.XOR_IDEALS[2] + "    " + obj.feedforward(Objective.XOR_INPUTS[2][0], Objective.XOR_INPUTS[2][1], best.getData()));
        console.log("" + Objective.XOR_INPUTS[3][0] + "    " + Objective.XOR_INPUTS[3][1] + "    " + Objective.XOR_IDEALS[3] + "    " + obj.feedforward(Objective.XOR_INPUTS[3][0], Objective.XOR_INPUTS[3][1], best.getData()));
        //return best
        //return the best individual in a promise
        return new Promise((resolve) => resolve(best));
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
     * Solve the objective and return the best individual
     */
    async asyncSolve() {
        // Initialize the population
        let population = this.initPop();
        // Run the training algorithm asynchornously then return the best individual
        //return this.iter_train(population).then(() => population.getBest());
        await this.iter_train(population);
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
            // Output current epoch number, best genome, and error
            let err = population.best.getScore();
            console.log("" + iteration + ": " + err + "\nbest: " + population.getBest());
            // Check for convergence
            converged = this.didConverge(err);
        }
    }
    /**
     * Run the iterative training algorithm
     * @param population The population to train
     */
    async iter_train(population) {
        this.iterate(population);
        let err = population.best.getScore();
        console.log("Error: " + err + "\nbest: " + population.getBest());
        if (!this.didConverge(err)) {
            //pause to unblock UI
            await this.sleep(100);
            await this.iter_train(population);
        }
    }
    //custom sleep function to force setTimeout to return a promise
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Generate the next generation of individuals
     * @param population The population used to create the next epoch
     */
    iterate(population) {
        // Create a new generation using crossover and mutation
        // Create a mating pool for selecting parents to breed
        let bestGenome = population.getBest();
        let matingPool = new Array();
        for (let i = 0; i < population.individuals.length; i++) {
            // Score is already between 0 and 1 so just reverse for minimization effect
            // (The lower the score, the greater the fitness)
            let normScore = 1 - population.individuals[i].getScore();
            let n = normScore * 100;
            // Create a "mating pool" based on the scaled fitness
            // (The greater fittness, the more spots in the mating pool)
            for (let j = 0; j < n; j++) {
                matingPool.push(population.individuals[i]);
            }
        }
        // Use elite selection to avoid regressing
        population.setMember(0, bestGenome);
        // Execute cross-over to produce new epoch/generation of individuals
        for (let i = 1; i < population.size - 1; i++) {
            // Crossover 90% of the time
            if (Math.random() < .9) {
                // Select random parents from mating pool
                let parentAIndex = Math.floor(Math.random() * matingPool.length);
                let parentBIndex = Math.floor(Math.random() * matingPool.length);
                let parentA = matingPool[parentAIndex];
                let parentB = matingPool[parentBIndex];
                let children = this.crossover(parentA, parentB);
                // Add children to the population
                population.setMember(i, children[0]);
                population.setMember(i + 1, children[1]);
            }
        }
        // Update best and worst individual for the new epoch/generation
        population.setBestWorst();
    }
    /**
     * Use two parent genomes to create two new "child" genomes
     * @param parentA First parent genome
     * @param parentB Secnd parent genome
     */
    crossover(parentA, parentB) {
        // Use multi-point crossover to produce children
        let midPoint = Math.floor(GeneticAlgorithm.GENOME_SIZE / 2);
        let cutPoint1 = Math.floor(Math.random() * (GeneticAlgorithm.GENOME_SIZE - midPoint));
        let cutPoint2 = cutPoint1 + midPoint;
        // Partition the parent genes
        let parentA1 = parentA.getData().slice(0, cutPoint1);
        let parentA2 = parentA.getData().slice(cutPoint1, cutPoint2);
        let parentA3 = parentA.getData().slice(cutPoint2, GeneticAlgorithm.GENOME_SIZE);
        let parentB1 = parentB.getData().slice(0, cutPoint1);
        let parentB2 = parentB.getData().slice(cutPoint1, cutPoint2);
        let parentB3 = parentB.getData().slice(cutPoint2, GeneticAlgorithm.GENOME_SIZE);
        // Create children by crossing over at the cut points 
        let child1 = new Genome(GeneticAlgorithm.GENOME_SIZE);
        let child2 = new Genome(GeneticAlgorithm.GENOME_SIZE);
        child1.setData(parentA1.concat(parentB2).concat(parentA3));
        child2.setData(parentB1.concat(parentA2).concat(parentB3));
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
        // Check for convergence and return result
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
        // Add random members to the population
        for (let i = 0; i < GeneticAlgorithm.POPULATION_SIZE; i++) {
            pop.setMember(i, GeneticAlgorithm.randGenome(GeneticAlgorithm.GENOME_SIZE));
        }
        pop.setBestWorst();
        return pop;
    }
}
GeneticAlgorithm.MUTATION_RATE = 0.01;
GeneticAlgorithm.MAX_SAME_COUNT = 100;
GeneticAlgorithm.GENOME_SIZE = 8;
GeneticAlgorithm.POPULATION_SIZE = 10000;
//# sourceMappingURL=geneticAlgorithm.js.map