var r, g, b;
let img; // Declare variable 'img'.
var clicked=false;
r=0;
g=0;
b=0;
var mic;
let recorder, soundFile;

let state = 0; // mousePress will increment from Record, to Stop, to Play
function setup() {
  createCanvas(1420, 600);
  text('Enable mic and click the mouse to begin recording', 200, 200);
 
 
}



function draw() {
  
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height / 2, img.width / 2, img.height / 2);
  
}




function draw() {
  
  background(226,226,226);
  
  
  if(clicked==true){
  var micLevel = mic.getLevel();
    console.log("hello");
    
  fill(0,0,0);
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
    
    fill(239,65,54);
  
   triangle(width/2.1 -micLevel * 1000, height/1.8 , width/1.9 +micLevel * 1000, height/1.8, width/2  , height/1.6 +micLevel * 2000 );
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




  

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();


function mousePressed() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(255, 0, 0);
    text('Recording now! Click to stop.', 200, 200);
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile

    background(0, 255, 0);
    text('Recording stopped. Click to play & save', 20, 20);
    state++;
  } else if (state === 2) {
    soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
    state++;
  }
}

