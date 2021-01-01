var bunny,bunny_img,play,play_img,sample,sample_img,htp,htp_img;
var back,back_img;
var cloudsGroup, cloudImage,coin_img,coinGroup;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle2, obstacle3, obstacle4, obstacle5,obstacle6,obstacle7;

PLAY = 1;
END = 0;
STAR = 0;
HTP = 1;
gameState = "START";
score = 0;

function preload(){

//loading bunny animation
  bunny_img = loadAnimation("download (2).png","download (3).png");

//loading play button image
  play_img = loadImage("play.jpg");
  
//loading how to play button image
  htp_img = loadImage("how to play.png");
  
//loading back button image
  back_img = loadImage("back.png");
  
//loading cloud image
  cloudImage = loadImage("download (4).png");
  
//loading ground image
  groundImage = loadImage("Ground.png");
  
//loading coin image
  coin_img = loadImage("coin.png");
  
//loading obstacles images
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  
//loading sounds
  click = loadSound("mouseclick.mp3");
  click2 = loadSound("mouseclick (2).mp3");
  coin = loadSound("coin.mp3");
  error = loadSound("errror.wav");
  jump = loadSound("jump.mp3");
}


//setup function
function setup() {
  
//creating canvas
  createCanvas(500,400);
  
//creating play button sprite
  play = createSprite(250,200);
  play.addImage(play_img);
  
//creating how to play button sprite
  htp = createSprite(250,350);
  htp.addImage(htp_img);
  htp.scale = 0.5;
//creating sample image of bunny which is to be displayed in start
  sample = createSprite(250,90);
  sample.addAnimation("sample",bunny_img);
  
//creating back button sprite 
  back = createSprite(30,50);
  back.addImage(back_img);
  back.scale=0.4;
  
//creating bunny
  bunny = createSprite(30,330);
  bunny.scale = 0.5;
  bunny.addAnimation("bunny_running",bunny_img);
  
//creating ground
  ground = createSprite(160,350);
  ground.addImage("ground",groundImage);
  
//creating invisible ground for collision of bunny and obstacles
  invisibleGround = createSprite(250,360,500,10);
  invisibleGround.visible = false;
  
//creating another ground
  ground2 = createSprite(480,350);
  ground2.addImage("ground",groundImage);
  
//creating groups
  obstaclesGroup = new Group();
  coinGroup = new Group();
  cloudsGroup = new Group();
}

//draw function
function draw() {

//background
  background("white");

//adding scores
  if (bunny.isTouching(coinGroup))
    {
      coin.play();
      score = score + 1 ;
      coinGroup.destroyEach();
   }
  
//debugging bunny
  bunny.debug = true;
  bunny.setCollider("rectangle",0,0,bunny.width,bunny.height);
//chnging gameState when bunny touches the obstacles
  if (bunny.isTouching(obstaclesGroup))
    {
      error.play();
      gameState = "START";
    }
  
//gameState PLAY
  if (gameState === "PLAY")
    {
      
//creating back button
      back.visible = true;
      back.scale = 0.2;
      back.x = 18;
      back.y = 18;
      
//when the player touches the space and up key bunny should jump
      if(keyDown("space")&& bunny.y >= 320 || touches.length < 0) {
        jump.play();
        bunny.velocityY = -12;
    }
      
      if(keyDown(UP_ARROW)&& bunny.y >= 320) {
        jump.play();
        bunny.velocityY = -12;
    }
      if(keyDown(DOWN_ARROW)) 
    {
        bunny.velocityY = 12;
    }
      
//giving function to back button when player presses on it
      if (mousePressedOver(back) || touches.length > 0)
        {
          click.play();
          gameState = "START";
          cloudsGroup.destroyEach();
        }
    
//adding gravity so that bunny can come down when space is presed
      bunny.velocityY = bunny.velocityY + 0.8;
      
//visibilites
      ground2.visible = true;
      ground.visible  = true;
      bunny.visible   = true;
      sample.visible  = false;
      htp.visible     = false;
      
//background for gameState PLAY
      background("black");
      
//creating clouds  
    if (frameCount % 60 === 0) {
    var cloud = createSprite(500,120,40,10);
    cloud.y = Math.round(random(50,200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = bunny.depth;
    bunny.depth = bunny.depth + 1;
    cloudsGroup.add(cloud);
  }
//calling obstacles and coins function
      spawnobstacles();
      coins();
}
  
//gameState HTP(how to play)
  if (gameState === "HTP")
    {
//visibilities
      ground2.visible = false;
      ground.visible  = false;
      bunny.visible   = false;
      sample.visible  = true;
      htp.visible     = false;
      back.visible    = true;
      
//giving background
      background("black")
      
//function to happen when player presses back button
      if (mousePressedOver(back) || touches.length > 0)
        {
          click.play();
          gameState = "START";
        }
      
//sample image x
      sample.x = 400;
      
//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Enjoy the Game🙂🙂",150,300);

//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Press *DOWN ARROW* key to bring the bunny down",10,220);

//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Press *SPACE* to jump the Bunny...",10,145);
      
//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Collect a lot of Points to enjoy the game",10,170);
      
//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Note that velocity of the obstacle  will increase ",10,195);
}
  
//gameState START
  if (gameState === "START")
    {
//destroying groups so that they dont come in the START screen
      coinGroup.destroyEach();
      cloudsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      
//visibilities
      ground2.visible = false;
      sample.visible  = true;
      ground.visible  = false;
      bunny.visible   = false;
      htp.visible     = true;
      play.visible    = true;
      back.visible    = false;
      sample.x = 250;
      
//play  button function 
      if (mousePressedOver(play) || touches.length > 0)
        {
          click2.play();
          play.visible  = false;
          score = 0;
          gameState = "PLAY";
        }
      
//htp button function
      if (mousePressedOver(htp) || touches.length > 0)
        {
          click.play();
          play.visible  = false;
          gameState = "HTP";
        }
      
//giving text
      stroke("magenta");
      textSize(18);
      fill("black");
      text("Press on how to Play button to Konw more..........",60,315);

//giving text
      stroke("red");
      textSize(18);
      fill("black");
      text("Credit :- freesound.org",310,395);
      
//giving text
      stroke("pink");
      textSize(18);
      fill("black");
      text("Night Runner Game",170,30);

//giving text
      stroke("purple");
      textSize(18);
      fill("black");
      text("Score: " + score,10,30);
  
//giving text
      stroke("magenta");
      textSize(18);
      fill("black");
      text("Press on the Play to Play the Nigh Runner game",60,290);
    }
 
//collision 
   bunny.collide(invisibleGround);
  
//calling drawsprites
   drawSprites();
  
//giving text
  if (gameState === "PLAY")
    {
     stroke("magenta");
      textSize(15);
      fill("white");
      text("Score: " + score,420,20)
}
}

//spawnobstacles function
function spawnobstacles()
{
  if (frameCount % 70 === 0)
{
      var obstacle  = createSprite(500,350,110,20);
      obstacle.scale=0.5;
      r = Math.round(random(1,2));
      
  
    if (r === 1 ){
        obstacle.addImage(obstacle2);
        }
    else if (r === 2) {
      obstacle.scale = 0.3;
    obstacle.addImage(obstacle3);
  }
    else if (r === 3) {
    obstacle.addImage(obstacle4);
  } 
    else if (r === 4) {
    obstacle.addImage(obstacle5);
      
  }
  
  obstacle.collide(invisibleGround);
  obstacle.velocityX = -(8 + score/100);
  obstacle.setLifetime=100;
  obstaclesGroup.add(obstacle);
} 
}

//coins function
function coins()
{
  if (frameCount % 80 === 0)
{
     var coin  = createSprite(500,200);
      coin.scale= -0.02;
      r = Math.round(random(1,2));
      
  
    if (r === 1 ){
        coin.addImage(coin_img);
        }
  else {
    coin.addImage(coin_img);
  }
  
  coin.y =Math.round(random(200,250));
  coin.collide(invisibleGround);
  coin.velocityX=-7;
  coin.setLifetime=100;
  coinGroup.add(coin);
} 
}