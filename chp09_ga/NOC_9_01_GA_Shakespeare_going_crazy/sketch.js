let target;
let popmax;
let mutationRate;
let population;
let numGenerations = [];
let aveGen = [0];
let iterator = 0;
let monteCarlo = 50;
let w;
let runningAve;
const maxGens = 1000;


function setup() {

  createCanvas(600, 400);
  background(255);
  strokeWeight(4);
  stroke(0);
  rect(0, 0, width, height);
  runningAve = createP('Running Average: ')

  w = width/monteCarlo;

  target = "To be or not to be.";
  popMax = 200;
  mutationRate = 0.01;



  //for (let popMax = 100; popMax < 1000; popMax += 100) {

  //for (let mutationRate = 0.0005; mutationRate < 0.05; mutationRate += 0.005) {

  //for (let i = 0; i < 10; i++) {

}

function draw() {
  let tStart = millis();

    population = new Population(target, mutationRate, popMax);
    population.calcFitness();

    while (!population.isFinished()) {
      population.naturalSelection();
      //Create next generation
      population.generate();
      // Calculate fitness
      population.calcFitness();

      population.evaluate();

      if (population.generations > 1000) break;
    }

    strokeWeight(1);
    stroke(100);
    fill(150);
    let h = map(population.generations, 0, maxGens, 0, height);
    rectMode(CORNER)

    rect(iterator * w, height - h, w, h);
    numGenerations.push(population.generations);
    //}
    let s,ave;
    s = numGenerations.reduce((s, c) => s + c);
    ave = s/(iterator+1)
    aveGen.push(ave);

    strokeWeight(5);
    stroke(255,0,0);

    let x1 = iterator * w;
    let y1 = map(aveGen[iterator],0,maxGens,height,0);
    let x2 = x1 + w;
    let y2 = map(ave,0,maxGens,height,0);
    line(x1,y1,x2,y2);

    runningAve.html("Running Average: "+round(ave));
    console.log((millis()-tStart)/1000);

    // println("pop size: " + popMax);
    // println("Mutation Rate: " + mutationRate);
    // println("Ave # of Generations: " + sum / numGenerations.length);

    iterator++
    if(iterator > monteCarlo) {
      noLoop();
      println("Average Generations after " + monteCarlo + " generations: " + ave)
      console.log('done')
    }


}
