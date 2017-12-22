//Declare variables
const qwerty = document.getElementById('qwerty');
const keyboardButtons = qwerty.getElementsByTagName('button');
console.log(keyboardButtons[1]);
// const phraseDiv = document.getElementById('phrase');
const startButton = document.getElementsByClassName('btn__reset')[0];
const gameTitle = document.getElementsByClassName('title')[0];
const phrases = ['Hello World', 'JavaScript is fun', 'Not all those who wander is lost', 'Smile and be happy', 'Work hard Play hard'];
let missedGuesses = 0;

//Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', function (event) {
  const overlay = document.getElementById('overlay');
  overlay.setAttribute('class', 'hidden');
  startButton.setAttribute('class', 'hidden');
  gameTitle.setAttribute('class', 'hidden');
  getRandomPhraseAsArray(phrases);
});

function getRandomPhraseAsArray(array){
  let phrase = phrases[Math.floor(Math.random()*phrases.length)]; //get random phrase
  phrase = phrase.split('');  //split sentence into characters
  addPhraseToDisplay(phrase);
}

function addPhraseToDisplay(array){
  const phraseDiv = document.getElementById('phrase');
  const ul = phraseDiv.getElementsByTagName('ul');
  for (character of phrase){
    const li = document.createElement('li');
    if(!character === ' '){
      li.addClassName('letter');
    }
    ul.appendChild(li);
    li.appendChild(character);
  }
}

function checkLetter(buttonClicked){
  const letters = document.getElementsByClassName('letter').innerHTML();
  for (letter of letters){
    if (letter === buttonClicked){
      letter.addClassName('show');
      return letter;
    }
    else{
      return null;
    }
  }
}

for (button of keyboardButtons){
  console.log(button);
  button.addEventListener('click', function(event){
    console.log('click');
    this.addAttribute('disabled', 'true');
    checkLetter(button);
  });
}
