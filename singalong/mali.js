var r, g, b;
let img; // Declare variable 'img'.
var clicked=false;
r=0;
g=0;
b=0;
var mic;

function setup() {
  createCanvas(1420, 620);


 
 
}



function draw() {
  
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height / 2, img.width / 2, img.height / 2);
  
}




function draw() {
  
  background(255,206,7);
  
  
  if(clicked==true){
  var micLevel = mic.getLevel();
    console.log("hello");
    
  fill(0,0,255);
  noStroke();
    
  fill(0,0,0);
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
    
    fill(0,148,68);
    quad(width/1.41, height/1.32, width/3.4 , height/1.32, width/3.9 +micLevel * 200, height/1, width/1.36 +micLevel * 200, height/1);
    
    fill(239,65,54);
  
   triangle(width/2.1 -micLevel * 1000, height/1.8 , width/1.9 +micLevel * 1000, height/1.8, width/2  , height/1.6 +micLevel * 2000 );
    
    fill(239,65,54);
    translate(580, 160);
  noStroke();
  for (let i = 0; i < 10; i ++) {
    ellipse(0, 30, 20, 80);
    rotate(PI/5 +micLevel * 1);
    
     
  }
    
    
    
    
  }
 
  
  

  
}

function mouseClicked() {
  clicked=true;
  
 mic = new p5.AudioIn();
  mic.start();
  
    getAudioContext().resume()
}
function windowResized() {
  resizeCanvas(800, 800);
}




