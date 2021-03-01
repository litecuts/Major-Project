// Major Assignment
// Omair
// 2/9/21
//Bunch of Variables named and Included
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
// let bgmusic;
let screen = 0;
let moveSound;
let c1,c2;
let n;
let anothermaze;
let Lvl2;
let steps = 0;
let text1;
let bouncers = [];
let maxBouncers;
let initAmt = 5;
let initSpeed = 1;
let anotherone;


// Added Fonts, Images and Music
function preload() {
  fontRegular = loadFont("assets/Italic.otf");
  fontRegular = loadFont("assets/Italic.otf");
  // bgmusic = loadSound("assets/Soundtrack.ogg");
  fontRegular = loadFont("assets/Italic.otf");
  wallImg = loadImage("assets/Torch_Gif.gif");
  moveSound = loadSound("assets/Steps.ogg");
  playerImg = loadImage("assets/Player.png");
  endImg = loadImage("assets/Golden Apple.gif");
  anothermaze = loadJSON("assets/Lvl 1.json");
  Lvl2 = loadJSON("assets/untitled.json");
  text1 = loadImage("assets/text.gif");
  anotherone = loadJSON("assets/untitled2.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  // bgmusic.loop();
  noStroke();
  rectMode(CENTER);
  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;
  grid[playerY][playerX] = 9;
  createBouncerArray(initAmt, initSpeed);

}
// Function in order so that the Bubbles multiply after each level and spawn at random locations
function createBouncerArray(level, multiplier) {
  maxBouncers = level;
  for (let i = 0; i < maxBouncers; i++) {
    let x = random(width);
    let y = random(height);
    let speedX = random(-0.5, 0.5) * multiplier;
    let speedY = random(-0.5, 0.5) * multiplier;
    let radius = random(10, 25);

    let b = new Bouncer(x, y, speedX, speedY, radius);
    bouncers.push(b);
  }
}


function draw() {
  background(0);

  if(screen === 0) {
    startScreen();
  } if (screen === 1){
    displayGrid();
  }

  let i = 0;

  for (let bounce of bouncers) {
    bounce.show();
    bounce.move();
    bounce.bounce();

    if (mouseIsPressed && dist(mouseX, mouseY, bounce.x, bounce.y) < bounce.radius) { // The addition of the score when the mouse clicks a ubble 
      bouncers.splice(i, 1);
      steps++;
    }
    i++;
  }
  textSize(40);
  fill(255);
  if (steps === maxBouncers) {
    grid = Lvl2;
    grid = anotherone;
    text("Press Space for next Level", width / 2, height / 2 - 300);
    if (key === " " && keyIsPressed) {
      initAmt *= 2;
      initSpeed *= 3;

      createBouncerArray(initAmt, initSpeed);
      steps = 0;
    }
  }
  let galaxy = { // For the Background full of twinkling stars
    locationX : random(width),
    locationY : random(height),
    size : random(1,6)
  };
  ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
  ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);
}

// A constructor for showing, Moving and Bouncing of the Balls
class Bouncer {
  constructor(tempX, tempY, tempSpeedX, tempSpeedY, tempRadius) {
    this.x = tempX;
    this.y = tempY;
    this.speedX = tempSpeedX;
    this.speedY = tempSpeedY;
    this.radius = tempRadius;
    this.color = random(360);
  }

  show() {
    fill(this.color, 60, 100);
    ellipse(this.x, this.y, this.radius * 2);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  bounce() {
    if (this.x < 0 || this.x > width) {
      this.speedX = -this.speedX;
    }

    if (this.y < 0 || this.y > height) {
      this.speedY = -this.speedY;
    }
  }

}


function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 1) { //if wall
    grid[y][x] = 0;       //make it empty
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
    grid = anothermaze;
    screen = 1;
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
// To Display the Grid
function displayGrid() {
  text("Score:" + steps, 800, 1200/width + 700);
  image(text1, 0, 1100/width + 600);
  
  background(0,0,35,25);
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      // eslint-disable-next-line no-empty
      if (grid[y][x] === 0) {
      }
      else if (grid[y][x] === 1) {
        image(wallImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {
        image(playerImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 8) {
        image(endImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
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

// The Texts that Fit In The Start Screen
function startScreen() {

  fill(255, 255, 255);
  textAlign(CENTER, TOP);
  textSize(50);
  textFont(fontRegular);
  text("WELCOME!", width / 2, height / 2 - 300);
  text("In This Game, your role is to eat the Golden Apple and pop all baloons", width / 2, height / 2 - 100);
  text("Press 'M' To Begin!", width / 2, height / 2 - 30);
  
  let targetX = mouseX;
  let dm = targetX - m;
  m += dm * follow;

  let targetY = mouseY;
  let dp = targetY - p;
  p += dp * follow;

  ellipse(m, p, 66, 66);
  fill(255,0,0);
}

