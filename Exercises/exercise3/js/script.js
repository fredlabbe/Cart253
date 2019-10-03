"use strict";

/******************************************************************************
Where's Sausage Dog?
by Frederick Labbe

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals of different sizes and random positions.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
//Variables for Perlin Noise fot trajectory of dog
let tx;
let ty;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target by calling reset
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  //Calls the reset function
  reset();
}

// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  if (gameOver) {

    background("#ffff00");
    // Prepare our typography
    textFont("Helvetica");
    textSize(100);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU WON! CLICK TO RESTART",width/2,height/2);

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);

    //Calls the function move() to make the dog move
    move();
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  if(gameOver === true){
    background("#ffff00");
    imageMode(CENTER);
    //Calls the reset to be able to play again
    reset();
  }


  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }

}
//Makes the dog move according to the Perlin Noise
function move(){


  targetX = width * noise(tx);
  targetY = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
  image(targetImage,targetX,targetY);
}
//Sets up or resets the game so it goes back to how it was before playing
function reset(){

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);

    // moves the image if it's under the rectangle
    if(x>(width-350) && y<(170)){
      x = 100 + random(0, 100);
      y = 200 + random(0, 100);
    }

    //random size of images
    let randSize = random(70,200);

    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y,randSize,randSize);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,randSize,randSize);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,randSize,randSize);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,randSize,randSize);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,randSize,randSize);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,randSize,randSize);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,randSize,randSize);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,randSize,randSize);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,randSize,randSize);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,randSize,randSize);
    }
  }

  //sets up the rectangle
  rectMode(CORNER);
  fill(255);
  noStroke();
  rect(windowWidth-300,0,300,150);
  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // moves the target dog if it's under/top of the rectangle
  if(targetX>(width-350) && targetY<(170)){
    targetX = 100 + random(0, 200);
    targetY = 200 + random(0, 200);
  }

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY);
  image(targetImage,(width -160),50);


  //Displaying text
  fill(0);
  textAlign(LEFT);
  textFont("Helvetica");
  textSize(30);
  text("Chien Perdu",(width-250), 120);

  //random movement of dog
  tx = random(0,100);
  ty = random(0,100);

  //sets back the boolean gameOver to false because the game is restarting
  gameOver = false;
}
