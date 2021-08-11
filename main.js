status="";
objects=[];
function preload(){
}
function setup(){
    //770,480
    canvas=createCanvas(770,480);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(770,480);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelLoaded(){
    console.log("CocoSSD is go!!");
    status=true;
}
function gotResults(error,results){
    if(error){
console.error(error);
    }
    else{
console.log(results);
objects=results;
    }
}
function draw(){
    image(video,0,0,770,480);
    if(status!=""){
        objectDetector.detect(video,gotResults);
      for (i= 0; i < objects.length; i++) {
          if(objects[i].label=="person"){
            document.getElementById("status").innerHTML="Staus:Object Detected!";
            percent= Math.floor(objects[i].confidence*100);
            fill('#FF0000')
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
          }
          else{
          document.getElementById("status").innerHTML="BABY IS NOT THERE!";
          }
      }
    }
}