var dionysus="";
var makeItRight="";
var leftWristX="";
var leftWristY="";
var rightWristX="";
var rightWristY="";
var noseX="";
var noseY="";

function setup(){
    canvas=createCanvas(600,400);
    canvas.position(665,300);
    video=createCapture(VIDEO);
    video.hide();
    model=ml5.poseNet(video,modelLoaded);
    model.on("pose",getResults);
}

function preload(){
    dionysus=loadSound("dionysus.mp3");
    makeItRight=loadSound("makeItRight.mp3")
}

function draw(){
    image(video,0,0,600,400);
    stroke("red");
    fill("red");
    line(300,0,300,400);
    stroke("white");
    fill("white");
    text("DIONYSUS (BTS)",50,350)
    text("MAKE IT RIGHT (BTS)",350,350)
    stroke("blue");
    fill("blue");
    circle(leftWristX,leftWristY,20);
    circle(rightWristX,rightWristY,20);
    circle(noseX,noseY,20);
}

function modelLoaded(){
    console.log("Model loaded.")
}

function getResults(results){
    if (results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWristX.x;
        rightWristY=results[0].pose.rightWristY.y;
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
    }
}