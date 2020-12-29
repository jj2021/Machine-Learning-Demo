var canvas;
var ctx;
const radius = 50;

/**
 * Initialize the UI when the page loads
 */
var onDocumentLoad = function() {
  canvas = document.getElementById('diagram');
  ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 500;

  animate();
}
/**
 * Draw the diagram of the neural network onto the canvas
 */
function animate() {
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
  connectNeurons(100,100,400,100,'#FFA9B6');
  // Connect x2 to h2
  connectNeurons(100,300,400,300,'#E6B8FF');
  //Connect x1 to h2
  connectNeurons(100,100,400,300,'#68FBF0'); 
  // Connect x2 to h1 
  connectNeurons(100,300,400,100,'#BDFF00'); 
  // Connect b1 to h1
  connectNeurons(250,400,400,100,'#FFA9B6');
  // Connect b1 to h2
  connectNeurons(250,400,400,300,'#E6B8FF');
  // Connect h1 to y1
  connectNeurons(400,100,700,200,'#68FBF0');
  // Connect h2 to y1
  connectNeurons(400,300,700,200,'#BDFF00');
  // Connect b2 to y1
  connectNeurons(550,400,700,200,'#FFA9B6');

  // Draw the weight values
  drawWeights();
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
function drawWeights() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#FFA9B6';
  ctx.fillText('w1:',200,90);
  ctx.fillText('b1:',200,345);
  ctx.fillText('b2:',500,320);
  ctx.fillStyle = '#68FBF0';
  ctx.fillText('w2:',200,150);
  ctx.fillText('w5:',500,100);
  ctx.fillStyle = '#BDFF00';
  ctx.fillText('w3:',120,220);
  ctx.fillText('w6:',500,230);
  ctx.fillStyle = '#E6B8FF';
  ctx.fillText('w4:',190,290);
  ctx.fillText('b1:',310,400);
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
