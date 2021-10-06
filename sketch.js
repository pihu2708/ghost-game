var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.4

  doorG=createGroup()
  climberG=createGroup()
  blockG=createGroup()
}

function draw() {
  background(0);
  if(gameState==="play"){
  
  if(tower.y > 400){
      tower.y = 300
    }
   if(keyDown("space")){
     ghost.velocityY= -6
   }
   ghost.velocityY= ghost.velocityY+0.4
   ghost.velocityX = 0
   if(keyDown("left")){
    ghost.velocityX= -2
  }
  if(keyDown("right")){
    ghost.velocityX= 2
  }
  doors()
  ghost.collide(climberG)

  if(ghost.isTouching(blockG)||ghost.y>600 ){
    gameState="end"
  }
}

if(gameState==="end"){
  ghost.destroy()
blockG.destroyEach()
climberG.destroyEach()
doorG.destroyEach()
  tower.destroy()
  textSize(45)
  textFont("jokerman")
  fill("purple")
  text("GAME OVER LOSER",100,300)
  
}
    drawSprites();
}

function doors(){
  if(frameCount%150===0){
door = createSprite(random(100,500),-45)
door.velocityY = 1;
door.addImage(doorImg);

ghost.depth=door.depth+2

climber = createSprite(door.x,5)
climber.velocityY = 1;
climber.addImage(climberImg);

block = createSprite(door.x,20,47,10)
block.velocityY = 1;
block.visible=false

doorG.add(door)
climberG.add(climber)
blockG.add(block)
  }
}
