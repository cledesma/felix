let dots = [];
let data = [];
let m = 0;
let b = 0;
let xMean = 0;
let yMean = 0;

function doOrdinaryLeastSquares(){
  let xSum = 0;
  let ySum = 0;
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i<data.length; i++){
    xSum += data[i].x;
    ySum += data[i].y;
  }
  xMean = xSum / data.length;
  yMean = ySum / data.length;
  for (let i=0; i < data.length; i++){
    let x = data[i].x;
    let y = data[i].y;
    numerator += (x - xMean) * (y - yMean)
    denominator += Math.pow((x-xMean),2)
  }
  m = numerator / denominator
  b = yMean - (m * xMean)
  console.log("m: ", m);
  console.log("b: ", b);
}

function setup(){
  createCanvas(400,400);
}

function mousePressed() {
  dots.push(createVector(mouseX, mouseY));
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  data.push(createVector(x,y));
  doOrdinaryLeastSquares();
}

function drawDots(){
  for (let i = 0; i < dots.length; i++){
    ellipse(dots[i].x, dots[i].y, 8, 8);
  }
}

function drawLine(){
  if (data.length > 0) {
    x1 = 0;
    y1 = m * x1 + b;
    x2 = 1;
    y2 = m * x2 + b;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 1, 0, 0, height);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 1, 0, 0, height);

    line(x1, y1, x2, y2);
    stroke(255);
  }
}

function draw(){
  background(51);
  drawDots();
  drawLine();
}
