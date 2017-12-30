//Declare variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const keyboardButtons = qwerty.getElementsByTagName('button');
const startButton = document.getElementsByClassName('btn__reset')[0];
const gameTitle = document.getElementsByClassName('title')[0];
const phrases = ['Hello World', 'JavaScript is fun', 'Not all those who wander is lost', 'Smile and be happy', 'Work hard Play hard'];
// const phraseArray = getRandomPhraseAsArray(phrases);

let missed = 0;

//Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', function (event) {
  // overlay.setAttribute('class', 'hidden');
  // startButton.setAttribute('class', 'hidden');
  // gameTitle.setAttribute('class', 'hidden');
  overlay.parentNode.removeChild(overlay);
  startButton.parentNode.removeChild(startButton);
  gameTitle.parentNode.removeChild(gameTitle);

  getRandomPhraseAsArray(phrases);

});

function getRandomPhraseAsArray(array){

  let phrase = phrases[Math.floor(Math.random()*phrases.length)]; //get random phrase
  const phraseArray = phrase.split('');  //split sentence into characters

  // return characterArray;
  console.log(phraseArray);
  addPhraseToDisplay(phraseArray);

}

function addPhraseToDisplay(array){

  const phraseDiv = document.getElementById('phrase');
  const ul = phraseDiv.getElementsByTagName('ul')[0];

  for (character of array){
    const li = document.createElement('li');

    if(character !== ' '){
      li.className += 'letter';
    }
    else{
      li.className += 'space';
    }

    li.innerHTML = character;
    ul.appendChild(li);

  }
}

function checkLetter(buttonClicked){

  const letters = document.getElementsByClassName('letter'); //Get all letters in phrase
  const guessedLetter = buttonClicked.innerHTML.toLowerCase(); //Guessed letter
  let match = false;

  //Loop through letters in Phrase to find match with guessed letter
  for (let i = 0; i < letters.length; i++){
    const letter = letters[i].innerHTML.toLowerCase(); //Letter in Phrase

    if (letter === guessedLetter){
      letters[i].classList.add('show');
      match = true;
    }
  }

  //Return result. If letter matched return letter. Else return null.
  if (match){
    return guessedLetter;
  }
  else {
    return null;
  }

}

//Event listener for Keyboard Buttons
for (button of keyboardButtons){
  console.log(button);
  button.addEventListener('click', function(event){
    const clickedButton = this; //Rename "this" to make code more readable
    //Disable clicked button
    //Check if letter can be found in phrase
    //If not add guess to missed guesses
    console.log(clickedButton);
    clickedButton.disabled = true;
    const letterFound = checkLetter(clickedButton);
    if (letterFound === null){
      missed++;
      console.log(missed);
    }
    checkWin();
  });
}

function checkWin(){
  //check if the number of letters with class “show” is equal to the number of
  //letters with class “letters”.
  const shownLetters = document.getElementsByClassName('show');
  const letters = document.getElementsByClassName('letter');

  // const mainContainerChildNodes = mainContainer.querySelectorAll('div');
  //If they’re equal, show the overlay screen with the “win” class and
  //appropriate text.
  if (shownLetters.length === letters.length){

    setOverlay('win', 'You won! :)');
    missed = 0;


    // startButton.parentNode.removeChild(startButton);
    // gameTitle.parentNode.removeChild(gameTitle);

  }
  //Otherwise, if the number of misses is equal to or greater than 5,
  //show the overlay screen with the “lose” class and appropriate text.
  if (missed >= 5){

    setOverlay('lose', 'You lost! :(');
    missed = 0;
  }
}

const setOverlay = function(result, message){

  const mainContainer = document.getElementsByClassName('main-container')[0];
  // const overlay = document.createElement('div');
  // const h2 = document.createElement('h2');
  // const playButton = document.createElement('a');
  gameTitle.innerHTML = "Start New Game";
  // h2.innerHTML = message; //Message to player with result
  // playButton.innerHTML = 'Start New Game';
  // playButton.classList.add('btn__reset');

  overlay.setAttribute('id', 'overlay');
  overlay.classList.add(result);
  overlay.appendChild(gameTitle);
  overlay.appendChild(startButton);

  mainContainer.insertBefore(overlay, mainContainer.firstChild);
}
