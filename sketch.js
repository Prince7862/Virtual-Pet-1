//Create variables here
var dog,happyDog,database,foodS,foodStock,dogHappy
function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  dogHappy = loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  console.log(database)


  dog = createSprite(250,250,50,50);
  dog.addImage(happyDog);
  dog.scale = 0.2

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    dogHappy.scale = 0.2
  }

  drawSprites();
  //add styles here

  fill("Black")
  textSize(20)
  text("Food Remaining: " +foodS,175,150);
  text("Note: Press the Up Arrow Key to feed Miku Milk" ,60,100)

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}



