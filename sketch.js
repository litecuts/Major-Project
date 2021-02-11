// Major Assignment
// Omair
// 2/9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let y = 1;
let x = 1;
let follow = 0.5;
let font;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background("black");

  let r1 = map(mouseX, 0, width, 0, height);
  let r2 = height - r1;

  fill(0, 0, 205, r1);
  rect(width / 2 + r1 / 2, height / 2, r1, r1);

  fill(255, 0, 100, r2);
  rect(width / 2 - r2 / 2, height / 2, r2, r2);

  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * follow;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * follow;

  ellipse(x, y, 66, 66);
  fill(0);
}
