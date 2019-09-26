/******************************************************

Game - The Asteroid Dodger
Frederick Labbe

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;
let avatarWidth = avatarSize/2;
let avatarHeight = avatarSize/2;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

//The images used
let avatarImg;
let ennemyImg;
let spaceImg;

//Music
let song;

//This is the rate of 10% the speed and size will increase
let rate = 1.1;

//sound when ship is propulsing
let propulsor;

//position of laser
// let laserY = 0;
// let laserX = 0;
//
// let laserSize = 1;
//
// let isLaser = false;


function preload(){
//preloads the images and put it in variables
  avatarImg = loadImage("assets/images/falcon.png");
  ennemyImg = loadImage("assets/images/asteroid.png");
  spaceImg = loadImage("assets/images/space.jpg");

  //prealoads the music
  song = loadSound('assets/starwarsMusic.mp3');

  //preloads propulsing sound
  propulsor = loadSound('assets/propulsor.wav');
}

//

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(60,height);

  // No stroke so it looks cleaner
  noStroke();
//sets up the menu bar
  rect(0,0,500,60);

  // laserX = avatarX;
  // laserY = avatarY;

}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A space background
  //background(255,220,220);
  image(spaceImg,0,60,width,height);

  //Setting up the menu bar showing the dodges
  stroke(201, 83, 128);
  //strokeWidth(5);
  fill(55, 52, 138);
  rect(0,0,500,60);
  noStroke();
  fill(154, 224, 74);
  textFont("Verdana");
  textSize(64);
  text(dodges, 10, 50);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;



  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;

  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
    //Plays the music
    song.play();
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

// Boosts the speed of the spaceship when the spacebar is pressed but
// puts it back to normal when it is not anymore
  if(keyIsDown(32)){
    fill(255,0,0);
    //laserSize = 10;
    console.log("works");
    //isLaser = true;
    avatarSpeed = 20;
    //laserX = laserX -10;
    //laserX-=10;
    //plays the sound effect
    propulsor.play();
  }

  else{
    avatarSpeed = 10;
    //stops the sound of propuslor
    propulsor.stop();
  }
  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;


  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  //update the laser position
// if(isLaser === true){
//
//   ellipse(laserX,laserY,laserSize,laserSize);
//   isLaser = false;
//
// }

//  laserX = laserX - 10;
  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost

    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(60,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;

    lose();
    enemySize = 50;


  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    lose();
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);

    //Increasing ennemySize
    enemySize = enemySize + dodges;

    // Augmenting the speed of enemySpeed by 25%
      enemyVX = enemySpeed + rate*dodges; }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // Draw the player as an image of the Millenium Falcon
  image(avatarImg,avatarX,avatarY,avatarSize,avatarSize);

  // Draw the enemy as an image
  //ellipse(enemyX,enemyY,enemySize,enemySize);
  image(ennemyImg, enemyX,enemyY,enemySize, enemySize);


}
// Pauses the game and displays a loosing message
function lose(){
  fill(255,0,0);
  textSize(15);
  textAlign(LEFT);
  text("YOU LOSE! Click to restart",200,30);
  noLoop();
  enemySpeed = 5;
  enemySize = 50;

}

//restarts the game
function mousePressed(){
  loop();
}
