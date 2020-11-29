class GeneticAlgorithm {

  static readonly MUTATION_RATE: number = 0.01;
  static readonly MAX_SAME_COUNT: number = 100;
  static readonly GENOME_SIZE: number = 8;
  static readonly POPULATION_SIZE = 10;
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
    // TODO: Initialize the population
    let population = this.initPop();
    // TODO: Run the training algorithm
    this.train();
    // TODO: Return the best genome
    return population.getBest();
  }

  /**
   * Run the training algorithm (iterate over generations)
   */
  private train() {
    // TODO: iterate until convergence
      // TODO: output best genome and error
      // TODO: check for convergence
  }

  /**
   * Generate the next generation of individuals
   */
  private iterate() {
    // TODO: crossover and mutate at the correct rate
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
    for (let i = 0; i < GeneticAlgorithm.POPULATION_SIZE; i++) {
      pop.setMember(i, this.randGenome(GeneticAlgorithm.GENOME_SIZE));
    }
    console.log(pop);
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