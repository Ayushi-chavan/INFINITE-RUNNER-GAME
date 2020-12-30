var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jerry,jerryImage
var bg,bgImage
var hp,hpImage
var car,carImage
var cheese,cheeseImage
var ig
var gameOverImg,restartImg
var score=0;

function preload(){
  
  jerryImage = loadImage("jerry.png") 
  bgImage = loadImage("bb-1.jpg")
  hpImage =  loadImage("hp.png")  
  carImage =  loadImage("car.png")  
  cheeseImage =  loadImage("cheese.png")
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  }

function setup(){
  createCanvas(650,500)
  
  bg=createSprite(230,350) 
  bg.addAnimation("bg",bgImage);  
  bg.scale=3.6
  bg.velocityX = -3
  
  jerry=createSprite(100,400)  
  jerry.addAnimation("jerry",jerryImage); 
  jerry.scale=0.1  
  jerry.velocityY=3
  
  gameOver = createSprite(320,200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(320,350);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.8;
    
  ig = createSprite(325,492,650,20);  
  ig.visible = false;
  
  obstaclesGroup = createGroup();
  cheeseGroup = createGroup();
  }

function draw(){
  camera.position.x = width/2
  camera.position.y = jerry.y
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
  if(bg.x < -420) {    
  bg.x = bg.width/2
  }
    
  if(keyDown("space")&& jerry.y >= 100) {
       jerry.velocityY = -10;
  }
 
 jerry.velocityY = jerry.velocityY + 0.8
  
 jerry.collide(ig);
  
  
  if(jerry.isTouching(cheeseGroup)){
    cheeseGroup.destroyEach()
     score = score+10
     }
      
    spawnObstacles()
    spawnCheese()
    
     if(obstaclesGroup.isTouching(jerry)){
        gameState = END;
     }
  }
  
  else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      bg.velocityX = 0;
      jerry.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cheeseGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cheeseGroup.setVelocityXEach(0);   
    
    if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  drawSprites()
  
  stroke("black");
   textSize(20);
   fill ("black");
   text("Score: " + score,500,50);
  
}

function reset(){
  gameState=PLAY
  bg.velocityX = -3
  obstaclesGroup.destroyEach()
  cheeseGroup.destroyEach()
  score=0

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,410,10,40);
   obstacle.velocityX = -6
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(carImage);
              break;
      case 2: obstacle.addImage(hpImage);
              break;
           default: break;
    }
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 
 }
}

function spawnCheese() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cheese = createSprite(600,160,40,10);
    cheese.y = Math.round(random(80,120));
    cheese.addImage(cheeseImage);
    cheese.scale = 0.1;
    cheese.velocityX = -3;
    
     //assign lifetime to the variable
   cheese.lifetime = 200;
    
    //adjust the depth
   cheese.depth = jerry.depth;
    jerry.depth = jerry.depth + 1;
    
    //add each cloud to the group
    cheeseGroup.add(cheese);
  }
}