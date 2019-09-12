/*****************

JavaScript Self-portrait (Exercise0)
Frederick Labbe

This code applies the concepts seen in class to do a simple self-portrait
made of ellipses and retangles.

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// This function creates a canva and draws the shapes on it

function setup() {

  //http://127.0.0.1:8080/
  createCanvas(1000,1000)
  //console.log("The for loop is on");
  //var x = 0;
  //for(let i=0;i<500;i++){
  //  stroke(x);
  //  line(i,0,i,500);
  //  x++;
  // }
  // ellipse(CENTER);
  // fill(255,0,0);

  //This for loop creates a gradiant from black to white in the background
  var x = 0;
  var y=0;
  var color=0;
  //rect(0,0,500,500);
  noStroke();
  for(let i=1000;i>0;i--){

    rectMode(CENTER);
    rect(500,500,i,i);
    fill(color);
    //x++;
    //y++;
    color++;
  }
  //console.log("The for loop is on");
  //var x = 0;
  //for(let i=0;i<500;i++){
  //  stroke(x);
  //  line(i,0,i,500);
  //  x++;
  // }
  // ellipse(CENTER);
  // fill(255,0,0);

  var color=0;
  //rect(0,0,500,500);
  noStroke();
  for(let i=1000;i>0;i--){

    rectMode(CENTER);
    rect(500,500,i,i);
    fill(color);
    //x++;
    //y++;
    color++;
  }
  //Body
  fill(191, 33, 67);
  rect(500,450,25, 200);
  fill(0);
  rect(500,525,25, 50);

  //Head
  fill(250, 225, 205);
  ellipse(500,250,210,250);
  //Eyes
  stroke(0);
  fill(250);
  ellipse(450,230,70,80);
  ellipse(550,230,70,80);
  noStroke();
  //Iris
  fill(33, 128, 63);
  ellipse(550,240,50,50);
  ellipse(455,240,50,50);
  fill(0);
  ellipse(457,240,25,25);
  ellipse(548,240,25,25);

  //mouth
  fill(250, 225, 205);
  stroke(0);
  ellipse(500,310,150,50);
  noStroke();
  ellipse(500,290,150,50);

  //Nose
  fill(250, 225, 205);
  stroke(0);
  ellipse(500,290,40,50);
  noStroke();
  ellipse(500,280,55,55);


  //line(0,0,500,500);
  //line(0,500,500,0);
  //


}


// draw()
//
// Description of draw()

function draw() {

}
