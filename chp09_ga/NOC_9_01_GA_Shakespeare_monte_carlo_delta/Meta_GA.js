class MetaGA {
  constructor(targetPhrase, mutationRate, popSize) {
    this.numGens = [];
    this.population;
    this.targetPhrase = targetPhrase;
    this.mutationRate = mutationRate;
    this.popSize = popSize;
    this.rateOfChange = 1;
    this.finished = false;
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
      if(this.population.generations > 1000) break;
    }
    this.numGens.push(this.population.generations);


  }
  rateOfChange() {
    const runLength = 10;
    if (this.numGens.length > runLength) {
      this.numGens.shift();
      let runningAve = this.numGens.reduce((a, cv) => a + cv);
      runningAve = runningAve / runLength;

      const last = this.numGens[this.numGens.length - 1];
      this.rateOfChange = abs((last - runningAve) / runningAve);
    }
  }

  isFinished(threshold){
    if(this.rateOfChange < threshold) this.finished = true;
    return this.finished;
  }

  getAveGens(){
    return this.numGens[this.numGens.length - 1];
  }

}
