class GA {
  constructor(targetPhrase) {
    this.executionTime = [];
    this.population;
    this.targetPhrase = targetPhrase;
    this.genome = new GA_DNA();
    this.mutationRate = parseInt(this.genome.genes.slice(0,3).join(""))/10000;
    this.popSize = parseInt(this.genome.genes.slice(3,6).join(""));
    this.rateOfChange = 1;
    this.finished = false;
    this.currentAve = 1;
    console.log("Mutation Rate: ",this.mutationRate,"\nPopulation Size: ",this.popSize)
  }

  createGA() {
    this.population = new Population(this.targetPhrase, this.mutationRate, this.popSize)

  }
  evolve() {
    const sTime = millis();
    while(!this.population.isFinished()){
      this.population.calcFitness();
      this.population.evaluate();
      this.population.naturalSelection();
      this.population.generate();
      if(millis()-sTime > 10000) break;
    }
    this.executionTime.push(millis()-sTime);


  }
  calcRateOfChange() {

      let total = this.executionTime.reduce((a, cv) => a + cv);
      let newAve = total / this.executionTime.length;

      this.rateOfChange = abs(newAve - this.currentAve) / this.currentAve;
      this.currentAve = newAve;
  }

  evaluate(threshold,minRuns){
    if(this.rateOfChange < threshold && this.executionTime.length > minRuns) {
      this.finished = true;
    } else {
      this.finished = false;
    }
  }

  isFinished(){
    return this.finished;
  }

  getAveGens(){
    return this.executionTime[this.executionTime.length - 1];
  }

}
