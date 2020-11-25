const canvas = document.getElementById('diagram');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

/**
 * Draw the diagram of the neural network onto the canvas
 */
function animate() {
  drawNeuron(100,100,'x1');
  drawNeuron(100,300,'x2');
  drawNeuron(250,400,'b1');
  drawNeuron(400,100,'h1');
  drawNeuron(400,300,'h2');
  drawNeuron(550,400,'b2');
  drawNeuron(700,200,'y1');
}

/**
 * Draws a neuron on the canvas
 * @param {number} x - X coordinate of the neuron on the canvas
 * @param {number} y - Y coordinate of the neuron on the canvas
 * @param {string} lable - Descriptive lable for the neuron
 */
function drawNeuron(x, y, lable) {
  // Draw the neuron
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, 2*Math.PI);
  ctx.stroke();

  // Draw neuron lable
  ctx.font = '20px Arial';
  ctx.fillText(lable, x-10, y+5);
}
animate();