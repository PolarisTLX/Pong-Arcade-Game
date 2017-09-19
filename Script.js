var canvas;
var canvasContext;

var ballX = 400;
var ballY = 300;
//var ballX = canvas.width/2;
//var ballY = canvas.height/2;

var ballSpeedX = 5;
var ballSpeedY = 5;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleThick = 10;
const paddleHeight = 100;

function MousePosition(event){
  //event fires everytime the mouse moves, and is going to give the mouse co-ordinates
  var rect = canvas.getBoundingClientRect();
  //this is the area in our browser that is the black rectangle
  var root = document.documentElement;
  //we get a handle on the document, which is the HTML page?
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;
  //we need to account for: where is the canvas sitting in the browser?
  //is it scrolled vertically or to one side
  //so that top left corner of black rectangle is always 0,0
  return{
    x:mouseX,
    y:mouseY
  };
}


//window.onload means do NOT run this script until the page has finished loading
window.onload = function() {
  //console.log("Hello World!");
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  //to be abke to see the movement, must reduce speed of these draw function occurences:
  var framesPerSecond = 60;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond );

  //detect mouse movement to move the paddle:
  canvas.addEventListener('mousemove',  function(event){
      var mousePos = MousePosition(event);
      //paddle1Y = mousePos.y;
      //to make the paddle's middle be ligned up with the mouse:
      paddle1Y = mousePos.y - (paddleHeight/2);
      //this grabs the y:mouseY from the object returned from function MousePosition()
    });
}


function ballReset(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -(ballSpeedX);
  ballSpeedY = -(ballSpeedY);
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + (paddleHeight/2);
  //if ball is above paddle, mode paddle up, and vice-versa
  //-35 is to reduce jerky movement
  if(paddle2YCenter < ballY-35) {
    paddle2Y += 3;
  }else if (paddle2YCenter > ballY+35){
    paddle2Y -= 3;
  }
}

function moveEverything(){

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  //bounce off the walls horizontally:
  if(ballX < 0)            {
    //does ball hit Paddle 1?
    if(ballY > paddle1Y && ballY < (paddle1Y+paddleHeight)){
      ballSpeedX = -(ballSpeedX);

      //affect the vertical speed of the ball:
      var deltaY = ballY - (paddle1Y+paddleHeight/2);
      //how far off of the center does the ball hit?
      ballSpeedY = deltaY * 0.35;
      //the further from the center, the larger the change (delta) to the Y speed

    }else {
      ballReset();
      player2Score += 1;
      //could also do: player2Score++;
    }

  }
  if(ballX > canvas.width) {
    //does it hit Paddle 2?
    if(ballY > paddle2Y && ballY < (paddle2Y+paddleHeight)){
      ballSpeedX = -(ballSpeedX);

      //affect the vertical speed of the ball:
      var deltaY = ballY - (paddle2Y+paddleHeight/2);
      //how far off of the center does the ball hit?
      ballSpeedY = deltaY * 0.35;
      //the further from the center, the larger the change (delta) to the Y speed

    }else {
      ballReset();
      player1Score += 1;
      //could also do: player1Score++;
    }
  }

  //bounce off the walls vertically:
  if(ballY > canvas.height) {    ballSpeedY = -(ballSpeedY);  }
  if(ballY < 0)             {    ballSpeedY = -(ballSpeedY);  }
}

function drawEverything(){
  //background
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  //paddle 1
  colorRect(0, paddle1Y, paddleThick, paddleHeight, 'white');
  //paddle 2
  colorRect(canvas.width-paddleThick, paddle2Y, paddleThick, paddleHeight, 'white');
  //ball in a circle shape:
  colorCircle(ballX, ballY, 10, 'red');


  //Scores:
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width-100, 100);

}

//instead of writting out everytime for a circle:
//canvasContext.arc(ballX, 100, 10, 0, Math.PI*2, true);
//canvasContext.arc(center-X, center-Y, radius, arc start (0 is 3 o-clock?), arc finish, true);
function colorCircle(centerX, centerY, radius, drawColor){
  canvasContext.fillStyle = drawColor;
  //NOTE, there is no fillArc  like there is for fillRect
  //so at the end we have to call canvasContext.fill();
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

//instead of writting out everytime:
//canvasContext.fillStyle = 'white';
//canvasContext.fillRect(0,200,10,100)
function colorRect(leftX, topY, width, height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect (leftX, topY, width, height);
  //fillRect = fillRectangle
}
