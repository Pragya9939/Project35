var balloon,balloonImage1,balloonImage2;
var database; 
var position; 

function preload(){
   bg =loadImage("cityImage.png");

   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(750,250,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.7;


   var balloonPosition=database.ref('balloon/height');
   balloonPosition.on("value",readPosition,showError);
  
  textSize(20); 
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){

    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
        updatePosition(-5,0);
  }

  else if(keyDown(RIGHT_ARROW)){
  
  
    balloon.addAnimation("hotAirBalloon",balloonImage2);
       updatePosition(5,0);
  }
  
  else if(keyDown(UP_ARROW)){

    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
      updatePosition(0,-5);
  }

  else if(keyDown(DOWN_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,5);
  }

  drawSprites();
  fill("green");
  stroke("lightgreen");
  textSize(22);
  text( " To move the hot air ballon use the arrow keys ! ",10,35);
}

function readPosition(data)
{
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;

  console.log(position.x);
  console.log(position.y);
}

function updatePosition(x,y)
{
    database.ref('balloon/height').set({
  'x':position.x + x,
  'y':position.y + y
});

}

function showError()
{
console.log("Eroor in writing to the database"); 
}
