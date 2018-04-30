class Population {

  constructor(targetPhrase, mutationRate, popSize) {
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;
    this.target = targetPhrase;
    this.mutationRate = mutationRate;
    this.perfectScore = 1;

    this.population = Array(popSize).fill().map(() => new DNA(this.target.length));
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  naturalSelection() {
    this.matingPool = [];
    let maxFitness = 0;

    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    for (let i = 0; i < this.population.length; i++) {

      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method

      for (let j = 0; j < n; j++) { // and pick two random numbers
        this.matingPool.push(this.population[i]);
      }
    }
  }


  generate(){
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  checkDone(){
    let bestScore = 0;

    for(let i = 0; i < this.population.length; i++){
      let thisScore = this.population[i].fitness;
      //console.log(this.population[i].fitness)
      if (thisScore > bestScore) {
        bestScore = thisScore;
      }
    }
    console.log(bestScore);
    if (bestScore === this.perfectScore) this.finished = true;
  }
}
