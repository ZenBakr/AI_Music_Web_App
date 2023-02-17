song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreL=0;
scoreR=0;
status1="";
status2="";

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " , leftWristY = " + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rigthWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " , rightWristY = " + rightWristY);
        scoreL=results[0].pose.keypoints[9].score;
        console.log("Score of left wrist : " + scoreL);
        scoreR=results[0].pose.keypoints[10].score;
        console.log("Score of right wrist : " + scoreR);
    }
}
function modelLoaded()
{
    console.log("PoseNet is initialized");
}
function draw()
{
    image(video,0,0,600,500);
    status1=song1.isPlaying();
    status2=song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreL>0.2)
    {
    circle(leftWristX,leftWristY,20);
    song2.stop();
    if(status1==false)
    {
        song1.play();
        document.getElementById("song_name").innerHTML="Song 1 is playing.";
    }
    }
    if(scoreR>0.2)
    {
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(status2==false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML="Song 2 is playing.";
        }
    }

}