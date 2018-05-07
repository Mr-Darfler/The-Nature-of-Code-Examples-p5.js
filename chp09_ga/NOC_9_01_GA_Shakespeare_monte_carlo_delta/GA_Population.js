class GAPop {
  constructor(target, popSize) {
    this.population = Array(popSize).fill(0);
    this.target = target
    this.population = this.population.map(() => new GA(this.target));
    this.finished = false;
    this.matingPool = [];
    this.best
    this.generations = 0;
  }

  run() {
    for (let ga of this.population) {
      while (!ga.isFinished()) {
          ga.createGA();
          ga.evolve();
          ga.calcRateOfChange();
          ga.evaluate(0.1, 10);
          console.log('rateOfChange: ', ga.rateOfChange, "\n Time: ", ga.executionTime[ga.executionTime.length - 1]);
          if (ga.executionTime.length > 50) break;
        }
        console.log("Average Time: ", ga.currentAve, "\nRoC: ", ga.rateOfChange)

      }
    }

    naturalSelection() {
      this.matingPool = [];

      let maxFit = 100000;
      let minFit = 0
      for (let ga of this.population) {
        const thisFit = ga.currentAve;
        if (thisFit < maxFit) {
          maxFit = thisFit;
          this.best = ga;
        } else if(thisFit > minFit) minFit = thisfit;
      }

      for(ga of this.population){
        let fitness = map(ga.currentAve,minFit,MaxFit,1,100);
        fitness = floor(fitness);
        for (let i = 0; i < fitness; i++){
          this.matingPool.push(ga)
        }
      }

    }

    generate() {
      // Refill the population with children from the mating pool
      let nextGen = [];
      const mpSize = this.matingPool.length;
      for(let ga of this.population){
        let a = floor(random(mpSize));
        let b = floor(random(mpSize));
        let partnerA = this.matingPool[a];
        let partnerB = this.matingPool[b];
        let child = partnerA.genome.crossover(partnerB.genome);
        child.genome.mutate(this.mutationRate);
        nextGen.push(child);
      }
      this.population = nextGen;
      this.generations++;
    }
  }
