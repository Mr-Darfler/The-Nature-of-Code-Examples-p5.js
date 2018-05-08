// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {
  constructor(targetPhrase, mutationRate, popSize) {
    this.target = targetPhrase;
    this.mutationRate = mutationRate;
    this.matingPool;
    this.population = Array(popSize).fill(0).map(() => new DNA(this.target.length));

  }



  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    for(let p of this.population){
      p.calcFitness(this.target);
    }
  }


  // Generate a mating pool
  naturalSelection() {
    this.matingPool = [];

    let maxFitness = 0;
    for(let p of this.population){
      if(p.fitness > maxFitness) maxFitness = p.fitness;
      //console.log(maxFitness);
    }

    for(let p of this.population){
      let matingFitness = map(p.fitness,0,maxFitness,0,100);

      for(let i = 0; i < matingFitness; i++){
        this.matingPool.push(p);
      }
    }

  }

  // Create a new generation
  generate() {

  }


  getBest() {

  }

  // Compute the current "most fit" member of the population
  evaluate() {}

  isFinished() {

  }

  getGenerations() {

  }

  // Compute average fitness for the population
  getAverageFitness() {

  }

  allPhrases() {

  }
}
