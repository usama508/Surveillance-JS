// 
let convert = document.querySelector(".convert");
let speech = new SpeechSynthesisUtterance();
let textarea = document.getElementById("mybox");
let volume = document.querySelector(".volume");
let pitch = document.querySelector(".pitch");
let rate = document.querySelector(".rate");

function convertText(){

speech.text = textarea.value;
speech.pitch = 10;
speech.volume = 50;
speech.lang = "en-US";
speech.rate = 0.6;

speechSynthesis.speak(speech);
}

// convert.addEventListener("click", ()=>{
//   convertText();
// });


document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('myVideo');
  const video1 = document.getElementById('myVideo1');
     video.play();
     video1.play();

  let hasRun = false;

  video.addEventListener('timeupdate', function() {
    const currentTime = video.currentTime;
    const targetTime = 28; // 2 minutes in seconds

    if (currentTime >= targetTime && !hasRun) {
      convertText();
      hasRun = true;
      // You can also pause the video at this point
      // video.pause();
    } else if (currentTime < targetTime) {
      // Reset the flag if the video time is less than the target time (i.e., the video has restarted)
      hasRun = false;
    }
  });

  // Play the video when the page has completely loaded
  video.addEventListener('canplaythrough', function() {
    video.play();
  });
 
    // Show loaders container
const loadersContainer = document.querySelector(".loaders-container");
// const logo_click = document.getElementById("logo_click");
//     logo_click.click();

  loadersContainer.style.display = "none";


  
});