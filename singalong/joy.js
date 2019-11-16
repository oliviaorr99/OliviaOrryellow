var r, g, b;
let img; // Declare variable 'img'.
var clicked=false;
r=0;
g=0;
b=0;
var mic;
var x = 0;

function setup() {
  createCanvas(1420, 620);
  noCursor();
  img = loadImage('https.globe.png');


 
 
}
function draw() {
  //background with transparancy
  background(0,0,35,25); 
  
  //blinking stars
  var galaxy = { 
  locationX : random(width),
  locationY : random(height),
  size : random(1,6)
}
  ellipse(mouseX ,mouseY, galaxy.size, galaxy.size);
  ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);


}





function draw() {
  
  background(11,19,122);

  
  
  
  if(clicked==true){
  var micLevel = mic.getLevel();
    console.log("hello");
    
  fill(0,0,0);
  noStroke();
    fill(0,148,68);
    

  fill(0,0,0);
    push();
    x+= 0.015;
  translate (width/2, height/2);
  rotate(x);
	rect(0, 0, 100, 100);
    imageMode(CENTER);
    
    image(img, width/ 400, height / 1000, img.width / 3.5, img.height / 3.5);
     pop();
    fill(0,0,0);
  triangle(width/5 -micLevel * 2000, height/1.2 , width/1.9, height/1.9, width/3, height/3.1 );
  
  triangle(width/1.3 +micLevel * 2000, height/1.2, width/1.9, height/1.9, width/1.5, height/3.1 );
  
  ellipse(width/2, height/1.5, 600, 750, Math.PI * .25, 30, Math.PI, true);
   fill(255,255,255);
  
  ellipse(width/2, height/1.5, 500, 650, Math.PI * .25, 30, Math.PI, true);
  fill(154,110,68);
  
  fill(237,28,26);
  noStroke();
 
  fill(248,175,181);
  ellipse(width/2.45,height/2.2,60 );
  ellipse(width/1.66,height/2.2,60 );
  fill(0,0,0);
  ellipse(width/2.2,height/2.4,60);
  ellipse(width/1.8,height/2.4,60);
    
    fill(239,65,54);
  
   triangle(width/2.1 -micLevel * 1000, height/1.8 , width/1.9 +micLevel * 1000, height/1.8, width/2  , height/1.6 +micLevel * 2000 );
    
    
   
    
    
    
  }
  
 
  
  

  
}

function mouseClicked() {
  clicked=true;
  
 mic = new p5.AudioIn();
  mic.start();
  
    getAudioContext().resume()
        fill(255);
   
  }



function windowResized() {
  resizeCanvas(800, 800);
}









