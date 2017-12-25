//Declare variables
const qwerty = document.getElementById('qwerty');
const keyboardButtons = qwerty.getElementsByTagName('button');
const startButton = document.getElementsByClassName('btn__reset')[0];
const gameTitle = document.getElementsByClassName('title')[0];
const phrases = ['Hello World', 'JavaScript is fun', 'Not all those who wander is lost', 'Smile and be happy', 'Work hard Play hard'];
// const phraseArray = getRandomPhraseAsArray(phrases);

let missed = 0;

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
  const phraseArray = phrase.split('');  //split sentence into characters

  // return characterArray;

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
    li.innerHTML = character;
    ul.appendChild(li);

  }
}

function checkLetter(buttonClicked){
  const letters = document.getElementsByClassName('letter').innerHTML();
  for (letter of letters){
    if (letter === buttonClicked){
      letter.className += 'show';
      return letter;
    }
    else{
      return null;
    }
  }
}


//WHY CAN'T I ADD EVENT LISTENER TO BUTTONS?!?!??!
for (button of keyboardButtons){
  console.log(button);
  button.addEventListener('click', function(event){
    console.log('click');
    const letterFound = checkLetter(button);
    button.addAttribute('disabled', 'true');
  });
}

for (let i = 0; i < keyboardButtons.length; i++){
  const keyboardButton = keyboardButtons[i];
  keyboardButton.addEventListener('click', function(event){
    console.log('click');
    const letterFound = checkLetter(button);
    keyboardButton.addAttribute('disabled', 'true');
  });
}
