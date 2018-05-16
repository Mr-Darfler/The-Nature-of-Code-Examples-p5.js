// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function newChar() {
  var c = floor(random(63,122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

// Constructor (makes a random DNA)
class DNA {

  constructor(num){
    this.genes = Array(num).fill(0).map(newChar);
    this.len = this.genes.length;
    this.fitness = 0;
  }

  getPhrase(){
    return this.genes.join("");
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.len; i++){
      if (this.genes[i] == target.charAt(i)){
        score++;
      }
    }
    this.fitness = score/this.len;
    this.fitness *= this.fitness
  }

  crossover(partner) {
    let child = new DNA(this.len);

    let midpoint = floor(random(this.len));

    for(let i = 0; i < this.len; i++){
      if( i < midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  mutate(mutationRate) {
    for(let i = 0; i < this.len; i++){
      if(random() < mutationRate){
        this.genes[i] = newChar();
      }
    }
  }

}
