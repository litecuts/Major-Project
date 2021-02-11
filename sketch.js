// Major Assignment
// Omair
// 2/9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let playerX = 0;
let playerY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background("black");

  let r1 = map(mouseX, 0, width, 0, height);
  let r2 = height - r1;

  fill(255, 0, 100, r1);
  rect(width / 2 + r1 / 2, height / 2, r1, r1);

  fill(255, 0, 100, r2);
  rect(width / 2 - r2 / 2, height / 2, r2, r2);
}   
