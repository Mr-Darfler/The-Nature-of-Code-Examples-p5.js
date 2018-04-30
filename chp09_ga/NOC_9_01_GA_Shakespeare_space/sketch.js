function setup(){
  p = new Population("To be or not to be.",0.1,200);

    p.calcFitness();
    p.naturalSelection();
    p.generate();
    p.checkDone();
}
