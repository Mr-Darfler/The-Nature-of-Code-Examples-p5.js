class MetaGA {
  constructor(targetPhrase, mutationRate, popSize) {
    this.numGens = [];
    this.population;
    this.targetPhrase = targetPhrase;
    this.mutationRate = mutationRate;
    this.popSize = popSize;
    this.rateOfChange = 1;
    this.finished = false;
    this.currentAve = 1;
  }

  createGA() {
    this.population = new Population(this.targetPhrase, this.mutationRate, this.popSize)
  }
  evolve() {
    while(!this.population.isFinished()){
      this.population.calcFitness();
      this.population.evaluate();
      this.population.naturalSelection();
      this.population.generate();
      if(this.population.generations > 2000) break;
    }
    this.numGens.push(this.population.generations);


  }
  calcRateOfChange() {

      let total = this.numGens.reduce((a, cv) => a + cv);
      let newAve = total / this.numGens.length;

      this.rateOfChange = abs(newAve - this.currentAve) / this.currentAve;
      this.currentAve = newAve;
  }

  evaluate(threshold,minRuns){
    if(this.rateOfChange < threshold && this.numGens.length > minRuns) {
      this.finished = true;
    } else {
      this.finished = false;
    }
  }

  isFinished(){
    return this.finished;
  }

  getAveGens(){
    return this.numGens[this.numGens.length - 1];
  }

}
