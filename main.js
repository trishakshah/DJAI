var dionysus="";
var makeItRight="";

function preload(){
    dionysus=loadSound("dionysus.mp3");
    makeItRight=loadSound("makeItRight.mp3")
}

var leftWristX=0;
var leftWristY=0;
var rightWristX=0;
var rightWristY=0;
var noseX=0;
var noseY=0;
var leftWristC=0;
var rightWristC=0;

function setup(){
    canvas=createCanvas(600,400);
    canvas.position(665,300);
    video=createCapture(VIDEO);
    video.hide();
    model=ml5.poseNet(video,modelLoaded);
    model.on("pose",getResults);
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
        rightWristC=results[0].pose.keypoints[10].score;
        leftWristC=results[0].pose.keypoints[9].score;
    }
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
    if (rightWristC>0.2){
        circle(rightWristX,rightWristY,20);
        if (rightWristY>0 && rightWristY<=80){
            dionysus.setVolume(0.2);
            makeItRight.setVolume(0.2);
            document.getElementById("volumeOutput").innerHTML="0.2";
        }
        else if (rightWristY>80 && rightWristY<=160){
            dionysus.setVolume(0.4);
            makeItRight.setVolume(0.4);
            document.getElementById("volumeOutput").innerHTML="0.4"
        }
        else if (rightWristY>160 && rightWristY<=240){
            dionysus.setVolume(0.6);
            makeItRight.setVolume(0.6);
            document.getElementById("volumeOutput").innerHTML="0.6"
        }
        else if (rightWristY>240 && rightWristY<=320){
            dionysus.setVolume(0.8);
            makeItRight.setVolume(0.8);
            document.getElementById("volumeOutput").innerHTML="0.8"
        }
        else if (rightWristY>320 && rightWristY<=400){
            dionysus.setVolume(1);
            makeItRight.setVolume(1);
            document.getElementById("volumeOutput").innerHTML="1.0"
        }
    }
    if (leftWristC>0.2){
        circle(leftWristX,leftWristY,20);
        if (leftWristY>0 && leftWristY<=100){
            dionysus.rate(0.5);
            makeItRight.rate(0.5);
            document.getElementById("speedOutput").innerHTML="0.5x"
        }
        if (leftWristY>100 && leftWristY<=200){
            dionysus.rate(1);
            makeItRight.rate(1);
            document.getElementById("speedOutput").innerHTML="1.0x"
        }
        if (leftWristY>200 && leftWristY<=300){
            dionysus.rate(1.5);
            makeItRight.rate(1.5);
            document.getElementById("speedOutput").innerHTML="1.5x"
        }
        if (leftWristY>300 && leftWristY<=400){
            dionysus.rate(2);
            makeItRight.rate(2);
            document.getElementById("speedOutput").innerHTML="2.0x"
        }
    }
    circle(noseX,noseY,20);
}

function playMusic(){
    if (noseX<=300){
        makeItRight.stop();
        dionysus.play();
        dionysus.setVolume(1);
        dionysus.rate(1);
    }
    if (noseX>300){
        dionysus.stop();
        makeItRight.play();
        makeItRight.setVolume(1);
        makeItRight.rate(1);
    }
}

function stopMusic(){
    dionysus.stop();
    makeItRight.stop();
}