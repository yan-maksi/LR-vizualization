// Training data points
const data = [
    [1, 2], [2, 4], [3, 6], [4, 8], [6, 19]  // linear relationship y = 2x
];

// Global state - not great but works for now
let losses = [];
let w = 0;  // weight
let b = 0;  // bias
let iteration = 0;
let trainingInterval;

// DOM elements - cache them for performance
const form = document.getElementById('configForm');
const errorCanvas = document.getElementById('errorCanvas');
const regressionCanvas = document.getElementById('regressionCanvas');
const errorCtx = errorCanvas.getContext('2d');
const regressionCTX = regressionCanvas.getContext('2d');

// TODO: Maybe add input validation?
function predict(x) {
    return w * x + b;  
}

function calculateLoss() {
    let totalLoss = 0;
    
    for (const point of data) {
        const predicted = predict(point[0]);
        const actual = point[1];
        totalLoss += Math.pow(predicted - actual, 2);
    }
    
    return totalLoss / (2 * data.length);
}

// Gradient descent step
function updateParameters(learningRate) {
    let weightGradient = 0;
    let biasGradient = 0;
    
    for (let i = 0; i < data.length; i++) {
        const x = data[i][0];
        const y = data[i][1];
        const error = predict(x) - y;
        
        weightGradient += error * x;
        biasGradient += error;
    }
    w -= (learningRate * weightGradient) / data.length;
    b -= (learningRate * biasGradient) / data.length;
}

// draw error function
function drawErrorGraph() {
    const PADDING = 50;
    const WIDTH = errorCanvas.width - PADDING;
    const HEIGHT = 150;
    
    errorCtx.clearRect(0, 0, errorCanvas.width, errorCanvas.height);
    
    errorCtx.beginPath();
    errorCtx.moveTo(PADDING, HEIGHT);
    errorCtx.lineTo(WIDTH + PADDING, HEIGHT);
    errorCtx.moveTo(PADDING, HEIGHT);
    errorCtx.lineTo(PADDING, HEIGHT - 100);
    errorCtx.stroke();
    
    if (losses.length > 0) {
        errorCtx.beginPath();
        errorCtx.strokeStyle = 'blue';
        
        for (let i = 0; i < losses.length; i++) {
            const x = PADDING + (i * (WIDTH / losses.length));
            const y = HEIGHT - (losses[i] * 100);
            
            if (i === 0) errorCtx.moveTo(x, y);
            else errorCtx.lineTo(x, y);
        }
        errorCtx.stroke();
    }
}

// draw reggerssin with global vars
function drawRegression() {
    const SCALE_X = 100;
    const SCALE_Y = 20;
    const Y_OFFSET = 200;
    
    regressionCTX.clearRect(0, 0, regressionCanvas.width, regressionCanvas.height);
    
    data.forEach(point => {
        regressionCTX.beginPath();
        regressionCTX.arc(
            point[0] * SCALE_X, 
            Y_OFFSET - point[1] * SCALE_Y, 
            5, 0, Math.PI * 2
        );
        regressionCTX.fillStyle = 'blue';
        regressionCTX.fill();
    });
    
    regressionCTX.beginPath();
    regressionCTX.strokeStyle = 'red';
    const startY = Y_OFFSET - predict(0) * SCALE_Y;
    const endY = Y_OFFSET - predict(5) * SCALE_Y;
    regressionCTX.moveTo(0, startY);
    regressionCTX.lineTo(500, endY);
    regressionCTX.stroke();
}

function train() {
    const maxIterations = Number(document.getElementById('maxIterations').value);
    const maxError = Number(document.getElementById('maxError').value);
    const learningRate = Number(document.getElementById('learningRate').value);
    
    const currentLoss = calculateLoss();
    losses.push(currentLoss);
    
    if (iteration >= maxIterations || currentLoss <= maxError) {
        clearInterval(trainingInterval);
        console.log('Training finished - iterations:', iteration, 'final loss:', currentLoss);
        return;
    }
    
    updateParameters(learningRate);
    drawErrorGraph();
    drawRegression();
    iteration++;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    losses = [];
    w = 0;
    b = 0;
    iteration = 0;
    
    if (trainingInterval) {
        clearInterval(trainingInterval);
    }
    trainingInterval = setInterval(train, 100);
});

drawErrorGraph();
drawRegression();