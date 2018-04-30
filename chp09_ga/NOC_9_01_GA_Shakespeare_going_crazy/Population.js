// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object
class Population{

  constructor(targetPhrase, mutationRate, popSize) {
    this.target = targetPhrase; // Target phrase
    this.mutationRate = mutationRate; // Mutation rate
    this.population = Array(popSize).fill(0); // Array to hold the current population
    this.matingPool = []; // ArrayList which we will use for our "mating pool"
    this.generations = 0; // Number of generations
    this.finished = false; // Are we finished evolving
    this.perfectScore = 1;

    this.population = this.population.map(() => new DNA(this.target.length))

  }

  calcFitness() {
    for(let p of this.population){
      p.calcFitness(this.target);
    }
  }

  naturalSelection() {
    this.matingPool = [];
    let maxFitness = 0;

    for(let p of this.population){
      if(p.fitness > maxFitness) maxFitness = p.fitness;
    }

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for( let p of this.population){
      let fitness = map(p.fitness,0,maxFitness,0,1);
      let n = floor(fitness * 100);

      for(let i = 0; i < n; i++){
        this.matingPool.push(p)
      }
    }
  }

  generate() {
    // Refill the population with children from the mating pool
    let nextGen = [];
    const mpSize = this.matingPool.length;
    for(let p of this.population){
      let a = floor(random(mpSize));
      let b = floor(random(mpSize));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      nextGen.push(child);
    }
    this.population = nextGen;
    this.generations++;
  }

  evaluate() {
    let worldrecord = 0.0;

    for(let p of this.population){
      if(p.fitness > worldrecord){
        worldrecord = p.fitness;
      }
    }

    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;

    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

}
