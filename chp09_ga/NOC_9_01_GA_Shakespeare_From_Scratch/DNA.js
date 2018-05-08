function newChar() {
  let c = floor(random(63,90));
  if (c == 63) c = 32;
  if (c == 64) c = 46;

  c = String.fromCharCode(c);

  return c;
}

// Constructor (makes a random DNA)
class DNA {
  // The genetic sequence
  constructor(length){
    this.genes = Array(length).fill(0).map(newChar);
    this.fitness = 0;
    this.length = length
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("");
  }

  // Fitness function (returns floating point % of "correct" characters)
  calcFitness(target) {
    let score = 0;
    for(let i = 0; i < this.length; i++){
      if(this.genes[i] == target[i]) score++
    };
     this.fitness = score/this.length;

  }

  // Crossover
  crossover(partner) {

  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
  }
}
