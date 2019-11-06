var r, g, b;
let img; // Declare variable 'img'.
var clicked=false;
r=0;
g=0;
b=0;
var mic;

function setup() {
  createCanvas(1420, 620);
  noCursor();


 
 
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
    fill(255,206,0);
    
    
    
     triangle(width/4, height/3.8 , width/4.27, height/3.8, width/4.15  , height/3.1 +micLevel * 2000 );
    
    triangle(width/4, height/3.8 , width/4.27, height/3.8, width/4.15  , height/5 -micLevel * 2000 );
    
    triangle(width/3.7 +micLevel * 2000, height/3.8 , width/4.6 -micLevel * 2000, height/3.8, width/4.15  , height/4  );
    
    triangle(width/3.7 +micLevel * 2000, height/3.8 , width/4.6 -micLevel * 2000, height/3.8, width/4.15  , height/3.6 );
    
    
    
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


 function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
  }

  var mediaConstraints = {
    audio: true
  };
  document.querySelector('#save-recording').onclick = function () {
      this.disabled = true;
      mediaRecorder.save();
      // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
  };
  //Parto con la registrazione audio
  function startRecording(idx) {
    
    $('#start-recording').disabled = true;
    audiosContainer = document.getElementById('audios-container');
    //document.getElementById("clicks").innerHTML = "Recording Started";

    var f = document.getElementById('clicks');
    setInterval(function () {
        f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 1000);

    captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
  };
  //Stoppo la registrazione audio
  function stopRecording() {
      $('#stop-recording').disabled = true;
   
      //document.getElementById("clicks").innerHTML = "Recording Stopped";

      var f = document.getElementById('clicks');
      setInterval(function () {
          f.style.display = (f.style.display == 'none' ? '' : 'none');
      }, 1000);
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
   
   
    $('.start-recording').disabled = false;
  };

  //Falvo Il file
  function saveRecording() {
      mediaRecorder.save();
  };

  var mediaRecorder;

  function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'audio/wav';  
    //mediaRecorder.mimeType = 'audio/webm';  
    mediaRecorder.audioChannels = 1;
    mediaRecorder.ondataavailable = function(blob) {
      $('#record-audio').html("<audio controls=''><source src=" + URL.createObjectURL(blob) + "></source></audio>");
    };

    var timeInterval = 360 * 1000;

    mediaRecorder.start(timeInterval);

    $('#stop-recording').disabled = false;
  }

  function onMediaError(e) {
    console.error('media error', e);
  }

  function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

  function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
  }

  window.onbeforeunload = function() {
    $('#start-recording').disabled = false;
  };


$(document).on('click','input[name="audio_record-icon"]',function(){
  var checked = $('#audio_record-icon').prop('checked'); 
  if(checked == true)
    {
        startRecording();
        console.log('start');
    }
  else
    {
        stopRecording();
        console.log('stop');
    }
});







