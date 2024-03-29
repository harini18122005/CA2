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
  // Stop the audio when the game stops
stopButton.addEventListener("click", () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
    pauseAudio();
  });
  




