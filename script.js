var canvas;
var ctx;
const radius = 50;

var myBrown = '#C28176';
var myLightGreen = '#A2C24F';
var myDarkGreen = '#637536';
var myBlue = '#6386C2';

function gaHandler() {
  enableSpinner("gaSpinner");
  disableTrainingButtons();
  GeneticAlgorithm.run().then((answer) => {
    console.log(answer);
    disableSpinner("gaSpinner");
    enableTrainingButtons();
    animate(answer.best.genes);
    populateTable(answer);
  }, 
  (error) => {
    console.log("GA Run Promise error: " + error);
    enableTrainingButtons();
  })
}

function psoHandler() {
  enableSpinner("psoSpinner");
  disableTrainingButtons();
  PSO.run_async().then(answer => {
    console.log(answer);
    disableSpinner("psoSpinner");
    enableTrainingButtons();
    animate(answer.best);
    populateTable(answer);
  })
}

function disableTrainingButtons() {
  document.getElementById("gaStart").classList.add('disabled');
  document.getElementById("psoStart").classList.add('disabled');
}

function enableTrainingButtons() {
  document.getElementById("gaStart").classList.remove('disabled');
  document.getElementById("psoStart").classList.remove('disabled');
}

function enableSpinner(element) {
  document.getElementById(element).classList.add('spinner-grow');
  document.getElementById(element).classList.add('spinner-grow-sm');
}

function disableSpinner(element) {
  document.getElementById(element).classList.remove('spinner-grow');
  document.getElementById(element).classList.remove('spinner-grow-sm');
}

/**
 * Initialize the UI when the page loads
 */
var onDocumentLoad = function() {
  canvas = document.getElementById('diagram');
  ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 500;

  animate([0,0,0,0,0,0,0,0]);
}

function populateTable(answerObj){
  if(answerObj.result00 !== undefined && answerObj.result00 !== null) {
    document.getElementById("result00").innerHTML = precRound(answerObj.result00, 5);
  }
  if(answerObj.result01 !== undefined && answerObj.result01 !== null) {
    document.getElementById("result01").innerHTML = precRound(answerObj.result01, 5);
  }
  if(answerObj.result10 !== undefined && answerObj.result10 !== null) {
    document.getElementById("result10").innerHTML = precRound(answerObj.result10, 5);
  }
  if(answerObj.result11 !== undefined && answerObj.result11 !== null) {
    document.getElementById("result11").innerHTML = precRound(answerObj.result11, 5);
  }
  if(answerObj.err !== undefined && answerObj.err !== null) {
    document.getElementById("resultErr").innerHTML = precRound(answerObj.err, 5);
  }
}

/**
 * Round a number to the given number of decimal places
 */
function precRound(num, precision) {
  place = Math.pow(10, precision);
  return Math.round(num * place) / place;
}

/**
 * Draw the diagram of the neural network onto the canvas
 */
function animate(weights) {
  //clear the canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';

  // Draw neurons
  drawNeuron(100,100,'x1');
  drawNeuron(100,300,'x2');
  drawNeuron(250,400,'b1');
  drawNeuron(400,100,'h1');
  drawNeuron(400,300,'h2');
  drawNeuron(550,400,'b2');
  drawNeuron(700,200,'y1');

  // Connect the neurons

  // Connect x1 to h1
  connectNeurons(100,100,400,100,myBrown);
  // Connect x2 to h2
  connectNeurons(100,300,400,300,myBlue);
  //Connect x1 to h2
  connectNeurons(100,100,400,300,myLightGreen); 
  // Connect x2 to h1 
  connectNeurons(100,300,400,100,myDarkGreen); 
  // Connect b1 to h1
  connectNeurons(250,400,400,100,myBrown);
  // Connect b1 to h2
  connectNeurons(250,400,400,300,myBlue);
  // Connect h1 to y1
  connectNeurons(400,100,700,200,myLightGreen);
  // Connect h2 to y1
  connectNeurons(400,300,700,200,myDarkGreen);
  // Connect b2 to y1
  connectNeurons(550,400,700,200,myBrown);

  // Draw the weight values
  drawWeights(weights);
}

/**
 * Connect two neurons in the diagram
 * @param {number} x1 - X coordinate of neuron 1
 * @param {number} y1 - Y coordinate of neuron 1
 * @param {number} x2 - X coordinate of neuron 2
 * @param {number} y2 - Y coordinate of neuron 2
 * @param {string} color - color of the line connecting the neurons
 */
function connectNeurons(x1,y1,x2,y2,color) {
  ctx.strokeStyle = color;
  // Calculate angle of line from the center of neuron 1 to neuron 2
  // and calculate the start coordinates
  let angle = Math.atan2(y2-y1,x2-x1);
  let startX = radius * Math.cos(angle) + x1;
  let startY = radius * Math.sin(angle) + y1;

  // Calculate angle from the center of neuron 2 to neuron 1
  // and calculate the destination coordinates
  angle = Math.atan2(y1-y2, x1-x2);
  let targetX = radius * Math.cos(angle) + x2;
  let targetY = radius * Math.sin(angle) + y2;

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(targetX,targetY);
  ctx.stroke();
}

/**
 * Draw the weight values onto the diagram
 */
function drawWeights(weights) {
  ctx.font = '20px Arial';
  ctx.fillStyle = myBrown;
  ctx.fillText('w1: ' + (Math.round(weights[0] * 1000)/1000),200,90);
  ctx.fillText('b1: ' + (Math.round(weights[6] * 1000)/1000),190,345);
  ctx.fillText('b2: ' + (Math.round(weights[7] * 1000)/1000),500,320);
  ctx.fillStyle = myLightGreen;
  ctx.fillText('w2: ' + (Math.round(weights[1] * 1000)/1000),200,150);
  ctx.fillText('w5: ' + (Math.round(weights[4] * 1000)/1000),500,100);
  ctx.fillStyle = myDarkGreen;
  ctx.fillText('w3: ' + (Math.round(weights[2] * 1000)/1000),120,220);
  ctx.fillText('w6: ' + (Math.round(weights[5] * 1000)/1000),500,230);
  ctx.fillStyle = myBlue;
  ctx.fillText('w4: ' + (Math.round(weights[3] * 1000)/1000),190,290);
  ctx.fillText('b1: ' + (Math.round(weights[6] * 1000)/1000),310,400);
}

/**
 * Draws a neuron on the canvas
 * @param {number} x - X coordinate of the neuron on the canvas
 * @param {number} y - Y coordinate of the neuron on the canvas
 * @param {string} label - Descriptive label for the neuron
 */
function drawNeuron(x, y, label) {
  // Draw the neuron
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.stroke();

  // Draw neuron label
  ctx.font = '20px Arial';
  ctx.fillText(label, x-10, y+5);
}
