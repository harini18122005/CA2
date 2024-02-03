const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const scoreDisplay = document.getElementById("scoreDisplay");

// Initialize game variables
let currentWord, correctLetters, wrongGuessCount, score;
const maxGuesses = 6;

// Function to reset the game
const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    // Update the absolute path to the correct location of your images
    hangmanImage.src = "./images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

// Keep track of asked questions
let askedQuestions = [];

const getRandomWord = () => {
    // Filter out questions that have already been asked
    let availableWords = wordList.filter(wordObj => !askedQuestions.includes(wordObj.word));
    
    // If all questions have been asked, reset the list
    if (availableWords.length === 0) {
        availableWords = wordList;
        askedQuestions = []; // Reset askedQuestions array
    }
    
    // Select a random question from the available list
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const { word, hint } = availableWords[randomIndex];
    
    // Remove the selected question from availableWords
    availableWords.splice(randomIndex, 1);
    
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    // Add the current question to askedQuestions
    askedQuestions.push(currentWord);
};

// Function to handle game over
const gameOver = (isVictory) => {
    if (isVictory) {
        score += 10;
        scoreDisplay.innerText = score;
        getRandomWord(); // Move to the next question
        // Check if all questions have been answered correctly
        if (askedQuestions.length === wordList.length) {
            const message = "Congratulations! You answered all questions correctly. 😊";
            gameModal.querySelector("img").src = "images/happy.gif";
            gameModal.querySelector("h4").innerText = "All Questions Answered!";
            gameModal.querySelector("p").innerText = message;
            gameModal.classList.add("show");
            window.location.href = "level.html";
        }
    } else {
        // Deduct points for incorrect guess
        score -= 10; // Adjust the points deducted as needed
        scoreDisplay.innerText = score;
        const message = "Oops! You didn't guess the word correctly. 😔";
        gameModal.querySelector("img").src = "images/lost.gif";
        gameModal.querySelector("h4").innerText = "Game Over!";
        gameModal.querySelector("p").innerText = message;
        gameModal.classList.add("show");
    }
};

// Function to initialize the game
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) gameOver(false);
    if (correctLetters.length === currentWord.length) gameOver(true);
};

// Event listeners for keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Event listener for the "Play Again" button
playAgainBtn.addEventListener("click", getRandomWord);

// Initialize score
score = 0;
scoreDisplay.innerText = score;

// Get initial word
getRandomWord();


const gameAudio = document.getElementById("gameAudio");
const audioToggleBtn = document.getElementById("audioToggle");

// function to play audio
const playAudio=() =>{
    gameAudio.play();
};

// function to toggle play/pause
const toggleAudio=()=>{
    if(gameAudio.paused){
        playAudio();
    }else {
        pauseAudio();
    }
};
// Event listener for when the audio ends, restart it
gameAudio.addEventListener("ended", () => {
    playAudio();
  });

// Event listener for the button to toggle audio
audioToggleBtn.addEventListener("click", () => {
    toggleAudio();
    // Save the audio state to sessionStorage
    sessionStorage.setItem("audioState", gameAudio.paused ? "off" : "on");
  });
  // Event listener for when the page is unloaded 
window.addEventListener("beforeunload", () => {
    // Save the audio playback position to sessionStorage
    sessionStorage.setItem("audioPlaybackPosition", gameAudio.currentTime);
  });

  
  // Start playing the audio when the page loads
if (sessionStorage.getItem("audioState") === "on") {
    playAudio();
  }
  
  // Restore the audio playback position from sessionStorage
  const savedPosition = sessionStorage.getItem("audioPlaybackPosition");
  if (savedPosition) {
    gameAudio.currentTime = parseFloat(savedPosition);
  }

  //Function to pause the audio
  const pauseAudio = () =>{
    if(!audioToggleBtn.classList.contains("audio-off")){
        gameAudio.pause();
        if(!gameAudio.paused){
            gameAudio.currentTime = 0;
        }
    }
  };

  //Stop the audio when the game stops
  StopButton.addEventListener("click", () =>{
    controls.classList.remove("hide");
    StopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
    pauseAudio();//Pause the audio when stopping the game
});


  