class GeneticAlgorithm {

  static readonly MUTATION_RATE: number = 0.01;
  static readonly MAX_SAME_COUNT: number = 100;
  static readonly GENOME_SIZE: number = 8;
  static readonly POPULATION_SIZE = 10;
  readonly TOLERANCE: number = 0.01;
  samecount: number = 0;
  ylast: number = 0;

  /**
   * Run the genetic algorithm for the XOR network
   */
  public static run() {
    let ga = new GeneticAlgorithm();

    let best = ga.solve();

    console.log("best = " + best.toString() + " fitness = " + best.getScore());
  }

  /**
   * Generate a random genome
   * @param size number of genes in the genome
   */
  public randGenome(size:number): Genome {
    let member = new Genome(size);
    let data = member.getData();

    for(let k = 0; k < data.length; k++) {
      data[k] = Objective.getRandomWeight();
    }

    return member;
  }

  /**
   * Solve the objective
   */
  public solve(): Genome {
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
  private train(population: Population) {
    let iteration: number = 0;
    let converged: boolean = false;

    while(!converged) {
      // Generate the next epoch
      this.iterate(population);
      iteration++;
      // Output best genome and error
      let err = population.best.getScore();
      console.log("" + iteration + ": " + err);
      // Check for convergence
      //converged = this.didConverge(err);
      converged = true;
    }
  }

  /**
   * Generate the next generation of individuals
   * @param population The population used to create the next epoch
   */
  private iterate(population: Population) {
    // TODO: crossover and mutate at the correct rate
    let bestGenome = population.getBest();
    let worstGenome = population.getWorst();
    let bestScore = bestGenome.getScore();
    let worstScore = worstGenome.getScore();

    let matingPool = new Array<Genome>();
    for (let i = 0; i < population.individuals.length; i++) {
      // TODO: Normalize the fitness values of the individuals
      let normScore = this.normalize(population.individuals[i].getScore(),bestScore,worstScore);
      console.log("Score: " + population.individuals[i].getScore() + " Norm Score:" + normScore);
      // TODO: Create a "mating pool" based on the scaled fitness
      let n = normScore * 100;
      for(let i = 0; i < n; i++) {
        matingPool.push(population.individuals[i]);
      }
    }
    console.log("Mating pool: " + matingPool.length);
  }

  /**
   * Normalize an individuals score to 0 - 1 range
   * @param score score to normalize
   * @param best best score
   * @param worst worst score
   */
  private normalize(score: number, best: number, worst: number): number {
    return (score - worst)/(best - worst);
  }

  private crossover() {
    // TODO: Execute crossover by random selection from the mating pool
    // TODO: child.mutate(probability)
  }

  /**
   * Check whether or not the network has converged
   * @param err The error of the current best individual
   */
  private didConverge(err: number): boolean {
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
  private initPop(): Population {
    let pop = new Population(GeneticAlgorithm.POPULATION_SIZE);
    // TODO: Add random members to the population
    for (let i = 0; i < GeneticAlgorithm.POPULATION_SIZE; i++) {
      pop.setMember(i, this.randGenome(GeneticAlgorithm.GENOME_SIZE));
    }
    pop.setBestWorst();
    console.log(pop);
    return pop;
  }

  /**
   * Decides whether or not the function will execute based on 
   * probability
   */
  private willExecute() {
    // get the total probability

    // generate a random number

    // if the random number is less than the probability
    // of the action then return true, otherwise return false
  }

}