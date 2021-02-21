var dog,sadDog,happyDog,database,foods,foodStock,fedTime,lastFed,feed,addFood,food;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  food=new Food()
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}

function draw() {
  background(46,139,87);
  food.display()
  fedTime=database.ref("feedTime")
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill("white")
  textSize(15)
  if (lastFed>=12){
    text("Last Fed"+lastFed%12+"PM",350,30)
  }else if(lastFed==0){
text("LastFed:12 AM",350,50)
  }else{
    text("LastFed"+lastFed+"AM",350,30)
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val()
  food.updateFoodStock(foods)
}

//function to update food stock and last fed time
function addFoods(){
  foods++
  database.ref('/').update({food:foods})
}

//function to add food in stock
function feedDog(){
  dog.addImage(happyDog)
  if (food.getFoodStock()<=0){food.updateFoodStock(food.getFoodStock()*0)}else{
    food.updateFoodStock(food.getFoodStock()-1)
  }database.ref('/').update({
    food:food.getFoodStock(),
    feedTime:hour()
  })
}