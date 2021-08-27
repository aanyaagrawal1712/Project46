var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg, invisibleGround;
var boyAnimation, boy;
var bulletImg, bulletGroup;

var gameOverImg, gameOver;
var restart, restartImg;
var life1Img, life2Img, life3Img ,life1, life2, life3;

var monster1, monster2, monsterGroup;
var score= 0, life=3;


function preload(){
  bulletImg= loadImage("images/bullet.png");
  bgImg= loadImage("images/mountain.jpg");
  boyAnimation= loadAnimation("images/boy1.png");

  monster1= loadImage("images/monster1.png");
  monster2= loadImage("images/monster2.png");

  gameOverImg= loadImage("images/gameOver.png");
  restartImg= loadImage("images/restart.png");

  life1Img= loadImage("images/life1.png");
  life2Img= loadImage("images/life2.png");
  life3Img= loadImage("images/life3.png");

  //groundImg= loadImage("images/land.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  boy= createSprite(displayWidth/8,430);
  boy.addAnimation("animation",boyAnimation);
  boy.scale= 0.45;

  invisibleGround= createSprite(750,600,displayWidth,20);
  invisibleGround.visible= false;

  gameOver= createSprite(displayWidth/2, displayHeight/3-40, 10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible= false;

  restart= createSprite(displayWidth/2, displayHeight/2,10,10);
  restart.addImage(restartImg);
  restart.scale= 0.07;
  restart.visible= false;

  life1= createSprite(100,60,10,10);
  life1.addImage(life1Img);
  life1.scale= 0.05;
  life1.visible= true;

  life2= createSprite(180,60,10,10);
  life2.addImage(life2Img);
  life2.scale=0.05;
  life2.visible= true;

  life3= createSprite(260,60,10,10);
  life3.addImage(life3Img);
  life3.scale=0.05;
  life3.visible= true;


  monsterGroup = new Group();
  bulletGroup = new Group();

}


function draw() {
  background(bgImg);
  fill("black");
  textSize(30);
  text("Score:"+ score, displayWidth-200,50,100);

  if(gameState===PLAY){

    if(life===3){
      life3.visible= true;
      life2.visible= true;
      life1.visible= true;
    }
    if(life===2){
      life3.visible= true;
      life2.visible= true;
      life1.visible= false;
    }
    if(life===1){
      life3.visible= true;
      life2.visible= false;
      life1.visible= false;
    }
    if(life===0){
      life3.visible= false;
      life2.visible= false;
      life1.visible= false;
      gameState= END;
    }

    
    if(keyDown("space")){
      var bullet= bullets();
      bullet.addImage(bulletImg);
     }

     spawnMonsters();

     if(bulletGroup.isTouching(monsterGroup)){
       bulletGroup.destroyEach();
       monsterGroup.destroyEach();
       score= score+1;
     }

     if(monsterGroup.isTouching(boy)){
       for(var i=0; i<monsterGroup.length; i++){
         if(monsterGroup[i].isTouching(boy)){
           monsterGroup[i].destroy();
         }
         life= life-1;
       }
     }

  }
   else if(gameState===END){
     gameOver.visible= true;
     restart.visible= true;
     boy.visible= false;
     monsterGroup.destroyEach();
     bulletGroup.destroyEach();
   }

  boy.collide(invisibleGround);
  monsterGroup.collide(invisibleGround);
  
  if(mousePressedOver(restart)){
    reset();
  }


  //console.log(displayHeight);
  drawSprites();

}


function bullets(){
  bullet= createSprite(185,387,20,10);
  bullet.scale= 0.8;
  bullet.velocityX= 12;
  bulletGroup.add(bullet);
  return bullet;
   
}

function spawnMonsters(){
  if (frameCount % 80 === 0){
    var monster = createSprite(displayWidth,480,10,40);
    monster.velocityX = -(10 + score/5);

     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: monster.addImage(monster1);
               break;
       case 2: monster.addImage(monster2);
               break;
       default: break;
     }         
     monster.scale = 0.25;
     monster.lifetime = 300;

     monsterGroup.add(monster);
  }
 }


 function reset(){
   gameState=PLAY;
   gameOver.visible= false;
   restart.visible= false;

   boy.visible= true;
   life= 3;

   monsterGroup.destroyEach();
   bulletGroup.destroyEach();

   score=0;
 }