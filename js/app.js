//Declare variables
const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const keyboardButtons = qwerty.getElementsByTagName('button');
const startButton = document.getElementsByClassName('btn__reset')[0];
const gameTitle = document.getElementsByClassName('title')[0];
const phrases = ['Hello World', 'JavaScript is fun', 'Not all those who wander is lost', 'Smile and be happy', 'Work hard Play hard'];
const scoreboard =  document.getElementById('scoreboard');
const hearts = scoreboard.getElementsByTagName('li');
let heartToChange = 5;  //Keep track of lives
let missed = 0;         //Keep track of wrong guesses

//Hide overlay div on game start and get random phrase to start the game
startButton.addEventListener('click', function (event) {

  overlay.parentNode.removeChild(overlay);
  startButton.parentNode.removeChild(startButton);
  gameTitle.parentNode.removeChild(gameTitle);

  getRandomPhraseAsArray(phrases);

});

//Get random phrase from the array with phrases
function getRandomPhraseAsArray(array){

  let phrase = phrases[Math.floor(Math.random()*phrases.length)]; //get random phrase
  const phraseArray = phrase.split('');  //split sentence into characters

  addPhraseToDisplay(phraseArray);

}

//Display the random phrase on the screen
function addPhraseToDisplay(array){

  const phraseDiv = document.getElementById('phrase');
  const ul = phraseDiv.getElementsByTagName('ul')[0];

  //Create and display the mysterious phrase with letter boxes and spaces
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

/* CHECK IF GUESSED LETTER IS IN PHRASE
** If match is found return the letter guessed
** Else return null
*/
function checkLetter(buttonClicked){

  const letters = document.getElementsByClassName('letter'); //Get all letters in phrase
  const guessedLetter = buttonClicked.innerHTML.toLowerCase(); //Guessed letter
  let match = false;

  //Loop through letters in phrase to search for a match
  for (let i = 0; i < letters.length; i++){
    const letter = letters[i].innerHTML.toLowerCase(); //Letter in Phrase

    if (letter === guessedLetter){
      letters[i].style.transition = '.7s';
      letters[i].classList.add('show');
      match = true;
    }
  }

  if (match){
    return guessedLetter;
  }
  else {
    return null;
  }

}

/* EVENT LISTENER FOR KEYBOARD BUTTONS
** Each button can only be clicked once
** If bad guess increase the "missed" variable by 1 and make 1 heart turn grey
** Check if player won or lost each time a button is clicked
*/
for (button of keyboardButtons){
  button.setAttribute('style', 'cursor: pointer;');

  button.addEventListener('click', function(event){

    const clickedButton = this; //Rename "this" to make code more readable
    const letterFound = checkLetter(clickedButton);

    clickedButton.disabled = true;
    clickedButton.setAttribute('style', 'cursor: arrow;');
    clickedButton.style.color = 'grey';

    if (letterFound === null){
      missed++;

      heartToChange = heartToChange-1;
      hearts[heartToChange].querySelector('img').src = 'images/lostHeart.png';
    }
    checkWin();
  });
}

function checkWin(){
  const shownLetters = document.getElementsByClassName('show');
  const letters = document.getElementsByClassName('letter');

  /* If the number of letters with class “show” is equal to
  ** the number of letters with class “letters”
  ** show the overlay screen with the “win” class and appropriate text.
  */
  if (shownLetters.length === letters.length){
    gameOver('win', 'You won! :)');
  }
  /* If the number of misses is equal to or greater than 5,
  ** show the overlay screen with the “lose” class and appropriate text.
  */
  if (missed >= 5){

    gameOver('lose', 'You lost! :(');

  }
}

function gameOver(result, message){

  // DISPLAY RESULT
  const mainContainer = document.getElementsByClassName('main-container')[0];
  const letters = document.getElementsByClassName('letter'); //Get all letters in phrase
  const phraseList = document.getElementById('phrase').getElementsByTagName('ul')[0];

  gameTitle.innerHTML = message;
  startButton.innerHTML = 'Start New Game';

  overlay.setAttribute('id', 'overlay');
  overlay.className = '';
  overlay.classList.add(result);
  overlay.appendChild(gameTitle);
  overlay.appendChild(startButton);

  mainContainer.insertBefore(overlay, mainContainer.firstChild);

  // RESET GAME
  for (let i = 0; i < letters.length; i++){
    letters[i].classList.remove('show');
  }

  while (phraseList.firstChild) {
      phraseList.removeChild(phraseList.firstChild);
  }

  for (button of keyboardButtons){
    button.disabled = false;
  }

  missed = 0;
  heartToChange = 5;

  for (let i = 0; i < hearts.length; i++){
    hearts[i].querySelector('img').src = 'images/liveHeart.png';
  }

  for (button of keyboardButtons){
    button.setAttribute('style', 'cursor: pointer;');
    button.style.color = 'black';
  }
}
