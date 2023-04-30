var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// detecting keypress for the first time 
$(document).keypress(function() {
    if (!started) { 
 // This line of code indicates that the level changes when a keypress happens 
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

// $(document).on("keypress", function () {
//     let randomChosenColors = nextsequence()
//     let newValue ="#"+randomChosenColors
//     console.log(newValue)
//     $(newValue).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

//     switch (newValue) {
//         case "#green":
//             var buttonSound1 = new Audio("sounds/green.mp3");
//             buttonSound1.play();
//             break;
        
    
//         case "#red":
//             var buttonSound2 = new Audio("sounds/red.mp3");
//             buttonSound2.play();
//             break;
        
    
//         case "#yellow":
//             var buttonSound3 = new Audio("sounds/yellow.mp3");
//             buttonSound3.play();
//             break;
    
    
//         case "#blue":
//             var buttonSound4 = new Audio("sounds/blue.mp3");
//             buttonSound4.play();
//             break;
    
//         default: console.log();
       
//     }

    // The Swith code writtern above is an alternative to the playsound function.

// });

$(".btn").on("click", function (event) {
     let  userChosenColour = $(this).attr('id');
    //  console.log(userChosenColour);
     userClickedPattern.push (userChosenColour);
    //  console.log (userClickedPattern);

    playSound(userChosenColour)
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer,
    //  passing in the index (remember in programming you start counting 
    //  from 0, hence why there is a subtraction of 1 from the actual
    //  number) of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

})


// Adding a blink effect to each button with the next lines of code from lines 99-115, starts with assigning
// a variable that gets the string of the id of which button is clicked then it passes it as a parameter into the 
// function created, the function cretaed takes the input from the parameter then concatenate it with # to get the id 
// of the button clicked on and then adds class to whatever button is clicked on 
// then the function is called 



function checkAnswer(currentLevel) {

    // Write an if statement inside checkAnswer() to check if the most recent user answer
    //  is the same as the game pattern. If so then log "success", otherwise log "wrong". (From steps on the Solution
    //  provided by Angela.)
    
    // this line of code is an if statement checking the gamePattern array to the userclickedpattern array 
    // from the input where the function checkanswer is called 

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
      console.log("success");
  
       //If the user got the most recent answer right, then check that they have finished
        //  their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextsequence();
        }, 1000);
      }
  
    } else {
  
      console.log("wrong");
      playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function () {
            $("body").removeClass("game-over");
             }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // call function startover to restart the game
        startover();
  
  }
  }


// The Wrong-Right Code
//   function checkAnswer(currentLevel) {
//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
//       console.log("success");
  
//       if (userClickedPattern.length === gamePattern.length){
//         setTimeout(function () {
//           nextsequence();
//         }, 1000);
//       }
  
//       else {
          
//           console.log("wrong");
//            }
      
      
//           }
//     }


function nextsequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //  Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;  

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor); 
}



function animatePress(currentcolor) {

    $("#" + currentcolor ). addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
      }, 100);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function startover() {
    level=0;
    gamePattern=[];
    started=false;

    
  }