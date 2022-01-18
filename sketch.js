const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var ground
var background, backroundImg
var tower, towerImg
var cannonImg
var cannonBaseImg
var angle
var cannonball
var balls=[]
var boats=[]
function preload() {
 
  backgroundImg=loadImage("assets/background.gif")
 towerImg=loadImage("assets/tower.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  var  options={
    isStatic:true

  }
  angleMode(DEGREES)
  angle=15

  ground=Bodies.rectangle(0,height-1,width*2,1,options)
  World.add(world,ground)
  tower=Bodies.rectangle(160,350,160,310,options)
  World.add(world,tower)
  cannon=new Cannon(180,110,130,100,angle)
  cannonball=new Cannonball(cannon.x,cannon.y)
  boat=new Boat(width-79,height-60,170,170,-80)
 
}

function draw() {
  background(189);
  image(backgroundImg,0,0,1200,600)
  
 
  Engine.update(engine);
  rectMode(CENTER)
  rect(ground.position.x,ground.position.y,width*2,1)
  
   Engine.update(engine)
   push()
   imageMode(CENTER)
   image(towerImg,tower.position.x, tower.position.y,160,310)
   pop()
   showboats()
for(var i=0;i<balls.length;i++){
  showcannonballs(balls[i],i)
  collisionwithboats(i)
}
   
   cannon.display()
   for(var i=0;i<boats.length;i++){
     if(boats[i]){
      Matter.Body.setVelocity(boats[i].body,{x:-0.7,y:0})
      boats[i].display()
     }
   }
  


  
}
function keyReleased(){
  if(keyCode==DOWN_ARROW){
    balls[balls.length-1].shoot()
  }
}

function keyPressed(){
  if(keyCode==DOWN_ARROW){
    var cannonball=new Cannonball(cannon.x,cannon.y)
    balls.push(cannonball)
  }
}

function showcannonballs(balls,array){
  if(balls){
    balls.display()
  }
}

function showboats(){
  if(boats.length>0){
if(boats[boats.length-1]==undefined||boats[boats.length-1].body.position.x<width-300){
  var positions=[-40,-60,-70,-20]
  var position=random(positions)
  var boat=new Boat(width,height-100,170,170,position)
  boats.push(boat)
}
for(var i=0;i<boats.length;i++){
  if(boats[i]){
   Matter.Body.setVelocity(boats[i].body,{x:-0.7,y:0})
   boats[i].display()
  }
}

  }
  else{
    var boat=new Boat(width,height-60,170,170,-60)
    boats.push(boat)
  }
}

function collisionwithboats(index){
  for(var i=0;i<boats.length;i++){
    if(balls[index]!==undefined&&boats[i]!==undefined){
      var collision=Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided){
        boats[i].remove(i)
        Matter.World.remove(world,balls[index].body)
        delete balls[index]
      }
      }

    }
  }
