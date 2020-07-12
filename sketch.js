var backImage,backgr;
var player, player_running;
var ground,ground_img;

var foodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  
  background(255);
  
      if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
score=score+2;
    }
    
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
  
    
  
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     }
  
  drawSprites();
  text("score:"+score,300,50);
  switch(score){
    case 10:player.scale=0.12;
      break;
      case 20:player.scale=0.14;
      break;
      case 30:player.scale=0.16;
  break;
  default:break;
  }

  
}

function spawnFood() {
  //write code here to spawn the food
  ran=random(100,500);
  if (frameCount % 80 === 0) {
    var banana = createSprite(ran,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = - 3;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  ran=random(300,400);
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,ran,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = -1;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
