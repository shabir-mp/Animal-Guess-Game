const words = [
  'PENGUIN',
  'CROCODILES',
  'KANGAROO',
  'ZEBRA',
  'LION',
  'ELEPHANT',
  'GIRAFFE',
  'HYENA',
  'CHIMPANZEE',
  'GORILLA',
  'MONKEY',
  'LEMUR',
  'KOALA',
  'SLOTH',
  'RACCOON',
  'OTTER',
  'SEAL',
  'WALRUS',
  'BEAR',
  'WOLF',
  'FOX',
  'RABBIT',
  'DEER',
  'MOOSE',
  'REINDEER',
  'TIGER',
  'LEOPARD'
];

let currentWord =words[Math.floor(Math.random() * words.length)];
const wordLength = currentWord.length;
const maxWrongGuesses = 6;
let guessedLetters = [];
let incorrectGuesses = 0;

const wordContainer = document.querySelector('.word');
const guessesContainer = document.querySelector('.guesses');
const messageContainer = document.querySelector('.message');
const lettersContainer = document.querySelector('.letters');

function initGame() {
    guessedLetters = new Array(wordLength).fill('_');
    incorrectGuesses = 0;

    updateWordDisplay();
    updateIncorrectGuessesDisplay();
    generateLetterButtons();
}

function updateWordDisplay() {
    wordContainer.textContent = guessedLetters.join(' ');
}

function updateIncorrectGuessesDisplay() {
    guessesContainer.textContent = `Incorrect guesses: ${incorrectGuesses}`;
}

function generateLetterButtons() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    lettersContainer.innerHTML = '';

    for (const letter of alphabet) {
        const button = document.createElement('button');
        button.classList.add('letter');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        lettersContainer.appendChild(button);
    }
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) {
        return;
    }

    const wordIndex = currentWord.indexOf(letter);
    if (wordIndex !== -1) {
        for (let i = 0; i < wordLength; i++) {
            if (currentWord[i] === letter) {
                guessedLetters[i] = letter;
            }
        }
    } else {
        incorrectGuesses++;
        updateIncorrectGuessesDisplay();
    }

    updateWordDisplay();
    checkWinOrLose();
}

function checkWinOrLose() {
    if (guessedLetters.join('') === currentWord) {
        messageContainer.textContent = 'Congratulations! You won!';
    } else if (incorrectGuesses >= maxWrongGuesses) {
        messageContainer.textContent = 'Game over! The word was ' + currentWord;
    }
}

initGame();
