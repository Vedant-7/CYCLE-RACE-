  var path,mainCyclist,cycleBell,pinkCG,yellowCG,redCG,bellSound,gameOver,red1,yellow,pink,obs1,obs2,obs3,obs1G,obs2G,obs3G;
  var pathImg,mainRacerImg1,mainRacerImg2,obstacle1,obstacle2,obstacle3,gameOverImage,pinkOpponentIMG1,pinkOpponentIMG2,yellowOpponentIMG1,yellowOpponentIMG2,redOpponentIMG1,redOpponentIMG2;

  var END =0;
  var PLAY =1;
  var gameState = PLAY;

  var distance;

function preload(){
  
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkOpponentIMG1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  pinkOpponentIMG2 = loadAnimation("images/opponent3.png");
  yellowOpponentIMG1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  yellowOpponentIMG2 = loadAnimation("images/opponent6.png");
  redOpponentIMG1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  redOpponentIMG2 = loadAnimation("images/opponent9.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  gameOverImage = loadImage("images/gameOver.png");
  
  bellSound = loadSound("sound/bell.mp3");
}

function setup(){
  
  createCanvas(800,300);
  
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("fellDown",mainRacerImg2);
  mainCyclist.scale=0.07;
  mainCyclist.debug = true;
 
      
  gameOver = createSprite(420,150);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.8;
  
  gameOver.visible = false;
  
  obs1G = createGroup();
  obs2G = createGroup();
  obs3G = createGroup();
  pinkCG = createGroup();
  yellowCG = createGroup();
  redCG = createGroup();
 
  mainCyclist.setCollider("rectangle",0,0,1100,1500);
  
  distance = 0;
}

function draw() {
  background ("grey");
  
  drawSprites();
  
if(gameState === PLAY){
  
  mainCyclist.y = World.mouseY;
  
  distance = distance+Math.round(getFrameRate()/53);
    
  path.velocityX = -(4 + 2*distance/150);
  
  edges = createEdgeSprites();
  mainCyclist.collide(edges);
  
  //code to reset the background
if(path.x < 0 ){
  path.x = width/2;
}
    
if (mainCyclist.isTouching(pinkCG)){
  gameState = END;
  pink.changeAnimation("fellDown1");
}
  
if (mainCyclist.isTouching(redCG)){
  gameState = END;
  red1.changeAnimation("fellDown21");
}
  
if (mainCyclist.isTouching(yellowCG)){
  gameState = END;
  yellow.changeAnimation("fellDown3");
}
    
if (mainCyclist.isTouching(obs1G)){
  gameState = END;
}
  
if (mainCyclist.isTouching(obs2G)){
  gameState = END;
}
  
if (mainCyclist.isTouching(obs3G)){
  gameState = END;
}
    
    
var select_players = Math.round(random(1,6));
  
if (frameCount % 150 === 0) {
    
if (select_players === 1) {
  pinkCyclist(); 
}
  
if (select_players === 2) {
  redCyclist(); 
}
  
if (select_players === 3) {
  yellowCyclist(); 
}
  
if (select_players === 4){
  Obstacle1(); 
}
  
if (select_players === 5){
  Obstacle2(); 
}
  
if (select_players === 6){
  Obstacle3(); 
}
      
}
    
if (keyDown("space")){
  bellSound.play();
}
  
}

else if (gameState === END){
    
  gameOver.visible = true;
    
  text("Press Up Arrow to Restart the Game",315,200);
  textSize(20);
    
  path.velocityX = 0;
  mainCyclist.velocityX = 0;
     
  mainCyclist.changeAnimation("fellDown");  
  
if (keyDown("UP_ARROW")) {
  reset();
}
    
  obs1G.setLifetimeEach(-1);
  obs1G.setVelocityXEach(0);
  obs2G.setLifetimeEach(-1);
  obs2G.setVelocityXEach(0);
  obs3G.setLifetimeEach(-1);
  obs3G.setVelocityXEach(0);
  
  pinkCG.setLifetimeEach(-1);
  pinkCG.setVelocityXEach (0);
  yellowCG.setLifetimeEach(-1);
  yellowCG.setVelocityXEach(0) ;
  redCG.setLifetimeEach(-1);
  redCG.setVelocityXEach(0);
}
  
  textSize(20);
  fill(355);
  text("Distance: "+ distance,650,30);
}

function pinkCyclist(){
  
  pink = createSprite(750,Math.round(random(50,250),10,10));
  pink.scale = 0.06;
  pink.addAnimation("Player1",pinkOpponentIMG1);
  pink.addAnimation("fellDown1",pinkOpponentIMG2);
  pink.setLifetime = 1;
  pink.velocityX = -1;
  pink.velocityX = -(2 + 2*distance/150);
  pinkCG.add(pink);
}

function redCyclist(){
  
  red1 = createSprite(750,Math.round(random(50,250),10,10));
  red1.scale = 0.06;
  red1.addAnimation("Player2",redOpponentIMG1);
  red1.addAnimation("fellDown21",redOpponentIMG2);
  red1.setLifetime = 1;
  red1.velocityX = -1;
  red1.velocityX = -(2 + 2*distance/150);
  redCG.add(red1);
}

function yellowCyclist(){
  
  yellow = createSprite(750,Math.round(random(50,250),10,10));
  yellow.scale = 0.06;
  yellow.addAnimation("Player3",yellowOpponentIMG1);
  yellow.addAnimation("fellDown3",yellowOpponentIMG2);
  yellow.setLifetime = 1;
  yellow.velocityX =  -1;
  yellow.velocityX = -(2 + 2*distance/150);
  yellowCG.add(yellow);
}

function Obstacle1(){
  
  obs1 = createSprite(750,Math.round(random(50,250),10,10));
  obs1.scale = 0.1;
  obs1.addImage(obstacle1);
  obs1.setLifetime = 1;
  obs1.velocityX = -1;
  obs1.velocityX = -(2 + 2*distance/150);
  obs1G.add(obs1);
}

function Obstacle2(){
  
  obs2 = createSprite(750,Math.round(random(50,250),10,10));
  obs2.scale = 0.1;
  obs2.addImage(obstacle2);
  obs2.setLifetime = 1;
  obs2.velocityX = -1;
  obs2.velocityX = -(2 + 2*distance/150);
  obs2G.add(obs2);
}
  
function Obstacle3(){  
  
  obs3 = createSprite(750,Math.round(random(50,250),10,10));
  obs3.scale = 0.1;
  obs3.addImage(obstacle3);
  obs3.setLifetime = 1;
  obs3.velocityX = -1;
  obs3.velocityX = -(2 + 2*distance/150);
  obs3G.add(obs3);
}


function reset(){
  
  gameState = PLAY;
  mainCyclist.changeAnimation("SahilRunning");
  gameOver.visible = false;
  obs1G.destroyEach();
  obs2G.destroyEach();
  obs3G.destroyEach();
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}
