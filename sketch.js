// Major Assignment
// Omair
// 2/9/21
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 20;
const COLS = 20;
let grid, cellWidth, cellHeight;
let playerX = 0;
let playerY = 0;
let someMaze;
let playerImg, wallImg, endImg;
let p = 1;
let m = 1;
let follow = 0.5;
let fontRegular, fontItalic, fontBold;
let screen = 0;
let moveSound;
let bgmusic;
let c1,c2;
let n;

function preload() {
  fontRegular = loadFont("assets/Italic.otf");
  bgmusic = loadSound("assets/Soundtrack.ogg");
  fontRegular = loadFont("assets/Italic.otf");
  wallImg = loadImage("assets/Grass.png");
  moveSound = loadSound("assets/Steps.ogg");
  playerImg = loadImage("assets/player1.gif");
  endImg = loadImage("assets/playerPortal_Complete.gif");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgmusic.loop();
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
  c1 = color(63, 191, 191);
  c2 = color(255);
  for(let p=0; p<height; p++) {
    n = map(p,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,p,width, p);
    for (let y=0; y<ROWS; y++) {
      for (let x=0; x<COLS; x++) {
      // eslint-disable-next-line no-empty
        if (grid[y][x] === 0) {
        }
        if (playerX === 19) {
          image(endImg, x*cellWidth, cellWidth, cellHeight);
        } 
        else if (grid[y][x] === 1) {
          image(wallImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        }
        else if (grid[y][x] === 9) {
          image(playerImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        }
        else if (grid[y][x] === 19) {
          image(playerImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
        }
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

  fill(255, 255, 255);
  textAlign(CENTER, TOP);
  textSize(50);
  textFont(fontRegular);
  text("WELCOME!", width / 2, height / 2 - 400);
  text("In This Game, your role is to reach the golden apple and finish each level", width / 2, height / 2 - 100);
  text("Good Luck!", width / 2, height / 2 - 30);
  
  let targetX = mouseX;
  let dm = targetX - m;
  m += dm * follow;

  let targetY = mouseY;
  let dp = targetY - p;
  p += dp * follow;

  ellipse(m, p, 66, 66);
  fill(255,255);
}