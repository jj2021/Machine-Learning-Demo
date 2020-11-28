class GeneticAlgorithm {

  static readonly MUTATION_RATE: number = 0.01;
  static readonly MAX_SAME_COUNT: number = 100;
  static readonly POPULATION_SIZE = 1000;
  readonly TOLERANCE: number = 0.01;
  samecount: number = 0;
  ylast: number;

  /**
   * Run the genetic algorithm for the XOR network
   */
  public static run() {
    let ga = new GeneticAlgorithm();

    let best = ga.solve();

    console.log("best = " + best.toString() + " fitness = " + best.getScore());
  }

  /**
   * Generate a randome genome
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
    // TODO: Initialize the population
    let population = this.initPop();
    // TODO: Run the training algorithm
    // TODO: Return the best genome
    return new Genome(8);
  }

  /**
   * Run the training algorithm (iterate over generations)
   */
  private train() {
    // TODO: iterate until convergence
      // TODO: crossover and mutate at the correct rate
      // TODO: output/set best genome
      // TODO: check for convergence
  }

  /**
   * Check whether or not the network has converged
   */
  private didConverge(): boolean {
    // TODO: Check for convergence and return result
    return false;
  }

  /**
   * Create initial population with random members (genomes)
   */
  private initPop(): Population {
    let pop = new Population(GeneticAlgorithm.POPULATION_SIZE);
    // TODO: Add random members to the population
    return pop;
  }

  /**
   * Create offspring from two existing genomes
   */
  private crossover() {
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
  private willExecute() {
    // get the total probability

    // generate a random number

    // if the random number is less than the probability
    // of the action then return true, otherwise return false
  }

}