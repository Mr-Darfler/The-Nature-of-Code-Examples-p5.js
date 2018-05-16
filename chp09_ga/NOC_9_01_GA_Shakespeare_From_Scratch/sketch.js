let targetPhrase = "I FEEL LIKE KOBE.";
let mutationRate = 0.005;
//let popSize;
let numGens = []; //array to hold samples
//let data = {'runs':[]}
let data;
let sampleMean, sampleStdDev, sampleError, sTime;
let bestTime, bestError, bestPopSize, bestMutationRate;
let genP, meanP, errorP, popSizeP, mutationRateP; //DOM elements for display


function setup() {
  genP = createP("Number of trials: ");
  meanP = createP("Best time to evolve: " + bestTime);
  errorP = createP("Error at 95% confidence: +/-" + bestError);
  popSizeP = createP("Population size: " + bestPopSize);
  mutationRateP = createP("Mutation Rate: " + bestMutationRate);

  data = new p5.Table();
  data.addColumn('id');
  data.addColumn('popSize');
  data.addColumn('mutationRate');
  data.addColumn('sampleMean');
  data.addColumn('sampleStdDev');
  data.addColumn('sampleError');
  data.addColumn('numRuns');

  bestTime = 10000000;
  //noLoop()
  console.log("STARTING")
  //run();
}

function draw() {
  if (mutationRate > 0.07) {
    noLoop();
  } else {
    for (let popSize = 100; popSize <= 1000; popSize += 50) {
      console.log("**********");
      console.log("Population Size: ", popSize, "MutationRate: ", mutationRate);
      console.log("**********");

      //initialize run
      numGens = []; //array to hold samples
      sampleMean = 1;
      sampleError = 1;
      population = new Population(targetPhrase, mutationRate, popSize);

      sTime = millis() //start clock

      while ((sampleError / sampleMean > 0.1 || numGens.length < 10) && numGens.length < 500) {
        //console.log(sampleError/sampleMean)
        population.calcFitness();
        population.evaluate();

        if (population.isDone()) {
          //push population.getGenerations() to numGens
          //console.log("POPULATION DONE")
          numGens.push(millis() - sTime);
          if (numGens.length != 1) { //You can't do statistics on one value.
            //find the mean and assign it to sampleMean
            sampleMean = mean(numGens);
            //find stdDev and assign it to sampleStdDev
            sampleStdDev = stdDev(numGens);
            //find error and assign it to sampleError
            sampleError = error95(numGens);
            //displayStats();
          }
          population = new Population(targetPhrase, mutationRate, popSize);
          sTime = millis()
          population.calcFitness();
          population.evaluate();
        }
        population.naturalSelection();
        population.generate();

      }

      let newRow = data.addRow();
      newRow.setNum('id', data.getRowCount() - 1);
      newRow.setNum('popSize', popSize);
      newRow.setNum('mutationRate', mutationRate);
      newRow.setNum('sampleMean', sampleMean);
      newRow.setNum('sampleError', sampleError);
      newRow.setNum('sampleStdDev', sampleStdDev);
      newRow.setNum('numRuns', numGens.length);

      if (sampleMean < bestTime) {
        bestTime = sampleMean;
        bestError = sampleError;
        bestPopSize = popSize;
        bestMutationRate = mutationRate;
      }
      consoleStats();
    }
  }
  saveTable(data,'data.csv')
  displayStats();
  console.log(data);
  mutationRate += 0.005;
}


function displayStats() {
  genP.html("Number of trials: " + data.getRowCount());
  meanP.html("Best time to evolve: " + bestTime);
  errorP.html("Error at 95% confidence: +/-" + bestError);
  popSizeP.html("Population Size " + bestPopSize);
  mutationRateP.html("Mutation Rate: " + bestMutationRate);
}

function consoleStats() {
  console.log("Number of trials: ", data.getRowCount());
  console.log("Best time to evolve: ", bestTime, " +/-", bestError);
  console.log("Population Size: ", bestPopSize, " Mutation Rate: ", bestMutationRate);
}

function mean(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i]
  }
  return total / array.length
}

function stdDev(array) {
  const ave = mean(array);
  let sumOfDiffSq = 0
  for (i = 0; i < array.length; i++) {
    sumOfDiffSq += sq(array[i] - ave)
  }

  const stdDev = sqrt(sumOfDiffSq / array.length - 1)
  return stdDev;
}

function error95(array) {
  return 2 * (stdDev(array) / sqrt(array.length));
}
