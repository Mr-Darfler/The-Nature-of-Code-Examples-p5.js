// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

let targetPhrase = "I FEEL LIKE KOBE.";
let mutationRate = 0.01;
let popSize = 200;
let generations = [];
let error,stdDev;
let averageGenerations;

let genP, meanP, stdDevP, errorP, percentErrorP;


function setup() {
  population = new Population(targetPhrase, mutationRate, popSize);
  population.calcFitness();
  population.evaluate();
  
  genP = createP("Number of current generations: ");
  meanP = createP("Average number of generations: ");
  stdDevP = createP("Standard Deviation from the mean: ");
  errorP = createP("Error at 95% confidence: +/-");
  percentErrorP = createP("Error as percentage of the mean: ")
}

function draw() {

  if(population.isDone()){
    generations.push(population.getGenerations());
    if(generations.length != 1) {
      averageGenerations = ss.mean(generations);
      stdDev = ss.standardDeviation(generations);
      error = 2 * (stdDev/sqrt(generations.length));
      displayStats();
    }
    population = new Population(targetPhrase, mutationRate, popSize);
    population.calcFitness();
    population.evaluate();

    if(error/averageGenerations < 0.05) {
      console.log("!!!! Ave number of generations: ",averageGenerations," +/-",error);
      console.log("!!!! Number of populations: "+generations.length)
      noLoop();
    }
  }
  population.naturalSelection();
  population.generate();
  population.calcFitness();
  population.evaluate();

}

function displayStats(){
  genP.html("Number of samples: "+generations.length)
  meanP.html("Average number of generations: "+averageGenerations);
  stdDevP.html("Standard deviation from the mean: "+stdDev)
  errorP.html("Error at 95% confidence: +/-"+error);
  percentErrorP.html("Error as percentage of the mean: "+(error/averageGenerations)*100,"\n")
}
