// Major Assignment
// Omair
// 2/9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 3;
const COLS = 3;
let grid, cellWidth, cellHeight;
let playerX = 0;
let playerY = 0;
let someMaze;
let playerImg, wallImg, grassImg;
let p = 1;
let m = 1;
let follow = 0.5;
let fontRegular, fontItalic, fontBold;
let screen = 0;
let moveSound;

function preload() {
  fontRegular = loadFont("assets/Italic.otf");
  wallImg = loadImage("assets/Grass.png");
  moveSound = loadSound("assets/Steps.ogg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;
  grid[playerY][playerX] = 9;
}

function draw() {
  background(0);

  if(screen === 0) {
    startScreen();
  } if (screen === 1){
    displayGrid();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 0) { //if empty
    grid[y][x] = 1;       //make it a wall
  }
  else if (grid[y][x] === 1) { //if wall
    grid[y][x] = 0;       //make it empty
  }
  if (screen === 0){
    screen = 1;
  }
}

function keyPressed() {
  if (key === "d") {
    movePlayer(playerX+1, playerY, playerX, playerY, "right");
  }
  if (key === "a") {
    movePlayer(playerX-1, playerY, playerX, playerY, "left");
  }
  if (key === "s") {
    movePlayer(playerX, playerY+1, playerX, playerY, "down");
  }
  if (key === "w") {
    movePlayer(playerX, playerY-1, playerX, playerY, "up");
  }
  if (key === "m") {
    grid = someMaze;
  }
}

function movePlayer(x, y, oldX, oldY, direction) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS && grid[y][x] !== 1) {
    grid[y][x] = 9; //new player location
    grid[oldY][oldX] = 0; //remove player from old spot

    if (direction === "right") {
      playerX += 1;
    }
    if (direction === "left") {
      playerX -= 1;
    }
    if (direction === "down") {
      playerY += 1;
    }
    if (direction === "up") {
      playerY -= 1;
    }
  }
}
function displayGrid() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      // eslint-disable-next-line no-empty
      if (grid[y][x] === 0) {
      }
      else if (grid[y][x] === 1) {
        image(wallImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {
        image(grassImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

  



function createEmptyGrid(cols, rows) {
  let empty = [];
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}

function startScreen() {
  let r1 = map(mouseX, 0, width, 0, height);

  fill(255, 255, 255);
  textAlign(CENTER, TOP);
  textSize(50);
  textFont(fontRegular);
  text("Choose a Colour", width / 2, height / 2 - 350);
  text("WELCOME!", width / 2, height / 2 - 400);
  



  let targetX = mouseX;
  let dm = targetX - m;
  m += dm * follow;

  let targetY = mouseY;
  let dp = targetY - p;
  p += dp * follow;

  ellipse(m, p, 66, 66);
  fill(255,255);
}