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
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4 
}

function draw() {
  background(0);

  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("up")){
    ghost.velocityY = -3 
  }

  ghost.velocityY = ghost.velocityY+0.5

  if(keyDown("right")){
    ghost.x = ghost.x + 3 
  }

  if(keyDown("left")){
    ghost.x = ghost.x -3 
  }


  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  spawnDoors();
  drawSprites();
  }
  
  if(gameState === "end"){
    fill("yellow")
    textSize(30)
    text("GameOver",230,250)
  }
}

function spawnDoors(){
  if(frameCount % 200 === 0) {
    door = createSprite(Math.round(random(100,500)),0)
    door.addImage(doorImg)
    door.velocityY = 2 
    door.lifetime = 300 
    doorsGroup.add(door)

    climber = createSprite(door.x,50);
    climber.addImage(climberImg);
    climber.velocityY = 2
    climber.lifetime = 300
    climbersGroup.add(climber)

    invisibleBlock = createSprite(door.x,50);
    invisibleBlock.velocityY = 2
    invisibleBlock.lifetime = 300
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 1
    invisibleBlock.debug = true
    }
  }
