let data = [];

function setup() {
  createCanvas(400,400)
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  let point = createVector(x, y);
  data.push(point);
}

function draw() {
  background(51)

}
