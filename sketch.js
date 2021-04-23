var backgroundImg,bg,bg2
var zombiegroup,zombie1,zombie2,zombie3,zombie4,zombie5
var obstacleGroup,obstacle1,obstacle2

var  soldier,soldier1,soldier2, soldier_firing,soldier_running,soldier_fall
var level=1
var score
var bullet,bullets
var zombieDeathCount=0
var lifeCount=3

function preload(){
  soldier_running=loadAnimation("soldier.1.png","soldier.2.png","soldier.3.png","soldier.4.png","soldier.5.png","soldier.6.png")
  backgroundImg=loadImage("backfround.png")
  soldier_fall=loadAnimation("die.1.png","die.2.png","die.3.png","die.4.png")
  soldier_firing=loadImage("soldier.7.png")
  zombie1=loadImage("zombie1.png")
   zombie2=loadImage("zombie2.png")
   zombie3=loadImage("zombie3.png")
   zombie4=loadImage("zombie4.png")
   zombie5=loadImage("zombie5.png")
  bullet=loadImage("bullet.png")
  obstacle1=loadImage("log.png")
  obstacle2=loadImage("car.png")
  bg2=loadImage("bg2.png")
  
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(0,0,width,height)
  bg.scale=4
  bg.x=width/2
  bg.y=height/2
  
  bullets=createSprite(170,height-255,100,500)
  bullets.addImage(bullet)
  bullets.scale=0.1
  
  soldier=createSprite(130,height-200,100,500)
  
  soldier.addAnimation("running",soldier_running)
  soldier.addAnimation("fall",soldier_fall)
  soldier.addAnimation("firing",soldier_firing)
  soldier.scale=1
  
  zombieGroup=createGroup()
  obstacleGroup=createGroup()
  score=0
  
}

function draw() {
  background(backgroundImg);
  bg.velocityX=-3


  if(bg.x<650){
    bg.x=width/2
  }
 
  if (zombieGroup.isTouching(soldier)){
  soldier.changeAnimation("fall",soldier_fall)
  soldier.destroy()
  zombieGroup.destroy()
  bullets.destroy()
  }
  
  
  if (keyDown ("a")){
    bullets.velocityX=+10
    soldier.changeImage("firing",soldier_firing)
  }
  if (bullets.isTouching(zombieGroup)){
  score=score+100
    zombieGroup.destroyEach()
    zombieDeathCount= zombieDeathCount+1
  }if (bullets.isTouching(zombieGroup)){
    score=score+100
      zombieGroup.destroyEach()
      zombieDeathCount= zombieDeathCount+1
    }
  if(zombieDeathCount===6 && level===1){
    background(bg2)
     level=2

     zombieDeathCount=0
  }
  if(zombieDeathCount===10 && level===2){
    level=3
    zombieDeathCount=0
 }
 if(zombieDeathCount===15 && level===3){
  level=3
  zombieDeathCount=0
}
  
  if(bullets.x>1000){
    bullets.x=170
    bullets.velocityX=0
  }

  var rand=Math.round(random(1,2))
  switch(rand){
    case 1:spawnObstacles()
    break;
    case 2:spawnZombies()
    break;
    default:break;
    
  }
   spawnZombies()
   spawnObstacles()
  drawSprites()
   fill("red")
  textSize(20)
  text ("Score:"+score,100,900)
   

}
function spawnObstacles(){
  if(frameCount%100 === 0){
    var obstacle=createSprite(1200,height-200,10,40)
    obstacle.velocityX=-3
    var rand=Math.round(random(1,2))
    switch(rand) {
      
      case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
      default:break;
    }

//adding obstacle to obstacleGroup

      obstacle.lifeTime=300
      obstacleGroup.add(obstacle)
  }
 
}

function spawnZombies(){
  if (frameCount % 100 === 0){
   var zombie = createSprite(1200,height-200,10,40);
   zombie.velocityX = -3
   
   
    //generate random obstacles
   
    if(level===1){
      
       zombie.addImage(zombie2);
       zombie.scale=1 
      
         console.log(zombie.scale)
      }
     
    
    if(level===2){
       var rand = Math.round(random(1,3));
      switch(rand) {
      
     case 1: zombie.addImage(zombie3);
              break;
      case 2: zombie.addImage(zombie4);
              break;
      
    
      default: break;
      }
    }
    if(level===3){
      zombie.addImage(zombie5)
      zombie.scale=1
    }
    
   
    //assign scale and lifetime to the obstacle           
    zombie.scale = 0.5;
    zombie.lifetime = 300;
   
   //add each obstacle to the group
    zombieGroup.add(zombie);
 }
}
