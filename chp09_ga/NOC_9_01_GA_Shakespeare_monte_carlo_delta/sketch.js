let target;
let popSize;
let mutationRate;
let metaGA;
// let aveGen = [0];
// let iterator = 0;
// let monteCarlo = 100;
// let w;
// let runningAve;
// const maxGens = 1000;


function setup() {

  //createCanvas(600, 400);
  //background(255);
  // strokeWeight(4);
  // stroke(0);
  // rect(0, 0, width, height);
  // runningAve = createP('Running Average: ')
  //
  // w = width/monteCarlo;
  //
  target = "To be or not to be.";
  popMax = 200;
  mutationRate = 0.01;

  metaGA = new MetaGA(target, mutationRate, popMax);



  //for (let popMax = 100; popMax < 1000; popMax += 100) {

  //for (let mutationRate = 0.0005; mutationRate < 0.05; mutationRate += 0.005) {

  //for (let i = 0; i < 10; i++) {

}

function draw() {
  while(!metaGA.isFinished(0.01)) {
    metaGA.createGA();
    metaGA.evolve();
    metaGA.calcRateOfChange();
    metaGA.evaluate(0.01,20);
    console.log(metaGA.rateOfChange);
    if(metaGA.numGens.length > 50) break;
  }
  console.log("Average Number of Generations: ",metaGA.currentAve)
  console.log("RoC: ",metaGA.rateOfChange)
  noLoop()

}
