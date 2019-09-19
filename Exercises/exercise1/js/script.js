// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;
let knightImg;
let monsterImg;
let birdImg;
let knightX = 0;
let knightY = 500;
let monsterX = 0;
let monsterY = 0;
let birdX = 5;
let birdY = 5;
let period = 10;

// preload()
//
// Nothing here

function preload() {

  knightImg = loadImage("assets/images/Knight.gif");
  monsterImg = loadImage("assets/images/bat.gif");
  birdImg = loadImage("assets/images/bird.jpg");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

  image(knightImg, knightX, knightY, 80,80);
  image(monsterImg, monsterX, monsterY, 80,80);
  image(birdImg, birdX, birdY, 80,80);
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect
  background(255);
  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //Making the knight move horizontally from left to right
  knightX+=1;
  image(knightImg, knightX, knightY, 80,80);

  //Making an image move along with the mouse and acts as a brush tool
  monsterX = mouseX;
  monsterY = mouseY;
  image(monsterImg, monsterX, monsterY, 80,80);

  // Making a bird move in sinusoidal function
  birdX+= 0.1;
  birdY = 100*sin(birdX + (2*3.1416)/period) + 250;
  image(birdImg, birdX, birdY, 80,80);



}
