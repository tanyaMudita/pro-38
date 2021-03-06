var PLAY = 1;
var END = 0;
var gameState = PLAY;
var distance = 0;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//var score=0;

//var gameOver, restart;

//localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 500);
  
  trex = createSprite(80,450,20,50);  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.8;
  
  ground = createSprite(200,440,2600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(600,160);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(600,280);
  restart.addImage(restartImg);
  
  gameOver.scale = 1.0;
  restart.scale = 1.0;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(1300,460,2500,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
 // score = 0;
}

function draw() {
  //trex.debug = true;
 // textSize(35)
  background("lightgray");

  trex.collide(invisibleGround);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(keyIsDown(RIGHT_ARROW)){
    trex.x=trex.x+ 10;
    trex.distance+=10;
  }

  
  if((keyDown("SPACE")) && trex.y  >= height-120) {
    trex.velocityY = -12;   
  }
  trex.velocityY = trex.velocityY + 0.8;

  camera.position.x = trex.x +410;
  camera.position.y = 250;

  console.log("distance");

  spawnClouds();
  spawnObstacles();
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(Math.round(random(900,2300)),220,40,10);
    cloud.y = Math.round(random(80,220));
    cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(Math.round(random(900,2300)),425,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



  
  