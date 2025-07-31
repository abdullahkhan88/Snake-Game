// variable declerations
var setBtn = document.querySelector(".setting-btn");
var setBox = document.querySelector(".setting-box");
var container = document.querySelector(".container");
var gameBoard = document.querySelector(".game-board");
var scoreEl = document.querySelector(".score");
var highScoreEl = document.querySelector(".High-Score");
var controls = document.querySelectorAll(".controls i");
var set_Btn = document.querySelector("#set-btn");
var defaultEl = document.querySelector("#default");
var detailEl = document.querySelector("#details-color");
var boardEl = document.querySelector("#board-color");
var speedEl = document.querySelector("#speed");
var snakeEl = document.querySelector("#snake-color");
var foodEl = document.querySelector("#food-color");

// setting Code
setBtn.onclick = function(){
  setBox.classList.toggle("active");
};

// Creating food and snake 
let i ;
let gameOver = false;
let snakeBody = [];
let foodX = 13 ,  foodY = 10 ;
let snakeX = 5 ,  snakeY = 10 ;
let velocityX = 0 ,  velocityY = 0 ;
let setIntervalId;
let score = 0;
let speed = 125;

if(localStorage.getItem("details") !=null)
{
  const all_details = JSON.parse(localStorage.getItem("details"));
  boardEl.value = all_details.board_color;
  detailEl.value = all_details.detail_color;
  snakeEl.value = all_details.snake_color;
  foodEl.value = all_details.food_color;
  speedEl.value = all_details.speed;
  if(all_details.active == false){
    defaultEl.checked = true;
  }
  else
  {
    defaultEl.checked = false;
  }

  container.style.backgroundColor = detailEl.value;
  gameBoard.style.backgroundColor = boardEl.value;
  speed = all_details.speed;
}



let highScore = localStorage.getItem("high-score") || 0;
highScoreEl.innerHTML = `High Score Is : ${highScore}`;

const direction =(e)=>{
   if(e.key == "ArrowUp" && velocityY !=1)
   {
      velocityX = 0;
      velocityY = -1;
   }
   else if(e.key == "ArrowDown" && velocityY !=-1)
   {
    velocityX = 0;
    velocityY = 1;
   }
   else if(e.key == "ArrowLeft"&& velocityX !=1)
   {
    velocityX = -1;
    velocityY = 0;
   }
   else if(e.key == "ArrowRight" && velocityX != -1)
   {
    velocityX = 1;
    velocityY = 0;
   }
}

const updateFoodPosition = () =>{
    foodX = Math.floor(Math.random()*30+1);
    foodY = Math.floor(Math.random()*30+1);
    
}
const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over ");
    location.reload();
}

controls.forEach((key) =>{
    key.addEventListener("click",()=>direction({key :key.dataset.key}) );
})

const snakegame = () =>{
    if(gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area :${foodY}/${foodX} "></div>`;
  if(snakeX == foodX && snakeY == foodY)
  {
    updateFoodPosition();
    snakeBody.push([foodX,foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score",highScore);
    scoreEl.innerHTML = `Score Is : ${score} `;
    highScoreEl.innerHTML = `High Score Is : ${highScore}`;
    
  }
 
  for(i=snakeBody.length-1;i>0;i--)
  {
    snakeBody[i] = snakeBody[i-1];
  }

  snakeBody[0] = [snakeX,snakeY];

  snakeX += velocityX;
  snakeY += velocityY;
  
  if(snakeX <=0 || snakeX>30 || snakeY<=0 || snakeY>30)
  {
    gameOver = true;
  }

  for(i=0;i<snakeBody.length;i++)
  {
    html += `<div class="head" style="grid-area :${snakeBody[i][1]}/${snakeBody[i][0]} "></div>`;
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] )
    {
        gameOver =true;
    }
  }

 
   gameBoard.innerHTML = html;
   if(localStorage.getItem("details") != null)
   {
    document.querySelector(".food").style.backgroundColor = foodEl.value;
    document.querySelector(".head").style.backgroundColor = snakeEl.value;
   }
}


updateFoodPosition();
setIntervalId = setInterval(snakegame,speed);
document.addEventListener("keydown",direction);



// Start setting Coading

set_Btn.onclick = function(){
  
  if(defaultEl.checked == true)
  {
    const set_data = {
      detail_color : "#1a64e2ff",
      board_color : "#0d4bd1ff",
      food_color : "#ff003d",
      snake_color:'#002fffff',
      speed : 125,
      active : false

    }
    localStorage.setItem("details",JSON.stringify(set_data));
  }
  else
  {
    const set_data = {
      detail_color : detailEl.value,
      board_color : boardEl.value,
      food_color :foodEl.value ,
      snake_color : snakeEl.value,
      speed : speedEl.value,
      active : true

    }
    localStorage.setItem("details",JSON.stringify(set_data));
  }
  setBtn.click();
  location.reload();
}
