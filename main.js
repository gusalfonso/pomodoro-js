// Get Elements:
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const timerTime = document.querySelector(".timer-time");
const workDurationInput = 20;
const restDurationInput = 10;
const circle = document.getElementById("timer-fg");
const configBtn = document.querySelector(".config-btn");
const configBtnSet = document.querySelector(".config-btn-settings");
const pomodoroContainer = document.getElementById("pomodoro-container");
const configContainer = document.getElementById("pomodoro-container-settings");

let defaultWorkTime = 20;
let defaultRestTime = 10;
let workDuration = workDurationInput;
let restDuration = restDurationInput;
let remainingTime = workDuration;
let isRunning = false;
let isWorking = true;
let intervalId;

timerTime.innerHTML = formattedTime(remainingTime);

//Formatting time:
function formattedTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  let displayTime;
  if (minutes > 9 && seconds > 9) {
    displayTime = `${minutes}:${seconds}`;
  } else if (seconds <= 9 && minutes > 9) {
    displayTime = `${minutes}:0${seconds}`;
  } else if (seconds > 9 && minutes <= 9) {
    displayTime = `0${minutes}:${seconds}`;
  } else {
    displayTime = `0${minutes}:0${seconds}`;
  }
  return displayTime;
}

function refreshProgress(time) {
  const radius = 45;
  const circ = 2 * Math.PI * radius;
  const totalDuration = isWorking ? workDuration : restDuration;
  const rel = circ * (time / totalDuration);

  circle.style.strokeDashoffset = rel;
  timerTime.innerHTML = formattedTime(time);
}

function play() {
  playBtn.setAttribute("disabled", "");
  pauseBtn.removeAttribute("disabled", "");
  isRunning = true;
  let time = 0;

  if (!intervalId) {
    intervalId = setInterval(() => {
      if (isRunning) {
        remainingTime--;
        if (remainingTime <= 0) {
          isWorking = !isWorking;
          remainingTime = isWorking ? workDuration : restDuration;
        }
        refreshProgress(remainingTime);
      }
    }, 1000);
  }
}

function pause() {
  playBtn.removeAttribute("disabled", "");
  pauseBtn.setAttribute("disabled", "");
  isRunning = false;
}

playBtn.addEventListener("click", () => {
  console.log("Play");
  play();
});
pauseBtn.addEventListener("click", () => {
  console.log("Pausa");
  pause();
});

configBtn.addEventListener("click", () => {
  pomodoroContainer.style.display = "none";
  configContainer.style.display = "block";
});

configBtnSet.addEventListener("click", () => {
  pomodoroContainer.style.display = "block";
  configContainer.style.display = "none";
});
