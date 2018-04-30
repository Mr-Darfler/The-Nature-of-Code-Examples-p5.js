function newChar(){
  let c = floor(random(64,122));
  if (c === 64) c = 32;

  return String.fromCharCode(c);
}

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
