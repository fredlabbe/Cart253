"use strict";

/******************************************************

Game - Chaser
Frederick Labbe

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
//Created another variable for the speed of the player when it sprints
let playerSpeed = 2;
let playerSprintSpeed = 5;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
//increased the ennemy speed to 8
let preyMaxSpeed = 8;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
//Noise variables
let preyTX;
let preyTY;
//initial state of the game
let state = "Menu";
//images
let playerLeftImg;
let playerRightImg;
let playerImg;
let preyImg;

//preload the images and sounds
function preload(){

  //images
  playerLeftImg = loadImage("assets/images/leftShark.png");
  playerRightImg = loadImage("assets/images/rightShark.png");
  preyImg = loadImage("assets/images/fish.png");
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  noStroke();
  //initiating the player image to the left shark
  playerImg = playerLeftImg;
  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  preyTX = random(0, 1000);
  preyTY = random(0, 1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100, 100, 200);

  if (state === "Menu") {
    textSize(24);
    text("Click to play", (width / 2), (height / 2));
  }
  else if(state === "Narrative"){

    text("You are a shark \nlooking for your dinner.\n You are so hungry!", (width / 2), height / 2);
  }
  else if (state === "Game") {
    handleInput();
    movePlayer();
    movePrey();
    updateHealth();
    checkEating();
    drawPrey();
    drawPlayer();
  } else if (state === "GameOver") {
    showGameOver();
    setupPrey();
    setupPlayer();
  }
  // if (!gameOver) {
  //   handleInput();
  //
  //   movePlayer();
  //   movePrey();
  //
  //   updateHealth();
  //   checkEating();
  //
  //   drawPrey();
  //   drawPlayer();
  // }
  // else {
  //   showGameOver();
  // }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerSpeed;
    playerImg = playerLeftImg;
    //sprint(playerVX,(-1));
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerSpeed;
    playerImg = playerRightImg;
    //  sprint(playerVX,(1));
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerSpeed;
    //sprint(playerVY,(-1));
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerSpeed;
    //sprint(playerVY,(1));
  } else {
    playerVY = 0;
  }
  //If the player presses shift(16), its speed is set to sprint speed. Else, put
  // it back to normal.
  if (keyIsDown(16)) {
    console.log("works");
    playerSpeed = playerSprintSpeed;
    playerHealth -= 3;
  } else {
    playerSpeed = 2;
  }

}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    state = "GameOver";
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      //Make the prey go faster
      preyMaxSpeed += 1.25;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  // if (random() < 0.05) {
  //   // Set velocity based on random values to get a new direction
  //   // and speed of movement
  //   //
  //   // Use map() to convert from the 0-1 range of the random() function
  //   // to the appropriate range of velocities for the prey
  //   preyVX = map(random(), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  //   preyVY = map(random(), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  // }
  //Added noise instead of random, so the movement is a lot cleaner
  preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);


  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;
  //Changing the tx & ty
  preyTX += 0.01;
  preyTY += 0.01;


  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
//  fill(preyFill, preyHealth);
  //ellipse(preyX, preyY, preyRadius * 2);
  image(preyImg,preyX,preyY,preyRadius*2,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  //fill(playerFill, playerHealth);
  //ellipse(playerX, playerY, playerRadius * 2);
  image(playerImg,playerX,playerY,playerRadius*3,playerRadius*3);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died. \nClick to restart."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

function mousePressed() {

  if (state === "Menu") {
    state = "Narrative";
  }
  else if(state === "Narrative"){
    state = "Game";
  }
  else if (state === "Game") {
    state = "GameOver";
  } else if (state === "GameOver") {
    state = "Menu";
    //Should reset all the values to beginning values
  }
}
// function sprint(playerVelocity, sign){
//   let velocity = playerVelocity;
//   let direction = sign;
//   if(keyIsDown(16)){
//     console.log("works");
//     velocity = direction*playerMaxSpeed *2;
//     playerHealth -= 2;
//   }
// }
