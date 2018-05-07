let target;
let gaPop;
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

  gaPop = new GAPop(target,2);
  console.log(gaPop)
  gaPop.evaluate();
  gaPop.naturalSelection();
  console.log(done)
  // popMax = 200;
  // mutationRate = 0.01;
  // let genome = Array(6).fill(0).map(()=> floor(random(10)));
  //
  // metaGA = new GA(target, [1,0,0,8,0,0]);


}

// function draw() {
//   while(!metaGA.isFinished(0.01)) {
//     metaGA.createGA();
//     metaGA.evolve();
//     metaGA.calcRateOfChange();
//     metaGA.evaluate(0.1,10);
//     console.log('rateOfChange: ',metaGA.rateOfChange,"\n Time: ",metaGA.executionTime[metaGA.executionTime.length-1]);
//     if(metaGA.executionTime.length > 50) break;
//   }
//   console.log("Average Time: ",metaGA.currentAve,"\nRoC: ",metaGA.rateOfChange)
//
//   noLoop()
//
// }
