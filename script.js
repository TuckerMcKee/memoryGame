const gameContainer = document.getElementById("game");
let card1Color = "";
let card2Color = "";
let card1Targ = null;
let card2Targ = null;
let numCardsFlipped = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // preventing duplicate clicks on same card
  if (card1Targ === event.target) {
    return;
  }
  ++numCardsFlipped;
  //preventing more than 2 card flips
  if (numCardsFlipped > 2) {
    numCardsFlipped = 2;
    return;
  }
  //flipping the card(displaying color)
  let cardFlipped = event.target.classList[0];
  event.target.style.backgroundColor = cardFlipped;
  //handling first card choice
  if (numCardsFlipped === 1) {
    card1Color = cardFlipped;
    card1Targ = event.target;
  } 
  //handling 2nd card, comparing values
  else if (numCardsFlipped === 2) {
    card2Color = cardFlipped;
    card2Targ = event.target;
    if (card1Color !== card2Color) {
      setTimeout(function () {
        card1Targ.style.backgroundColor = "white";
        event.target.style.backgroundColor = "white";
        card1Targ = null;
        numCardsFlipped = 0;
      }, 1000);
    } 
    //removing event listeners on matches
    else {
      card1Targ.removeEventListener("click", handleCardClick);
      card2Targ.removeEventListener("click", handleCardClick);
      card1Targ = null;
      numCardsFlipped = 0;
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
