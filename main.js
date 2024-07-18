// Get Elements:
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const timerTime = document.querySelector(".timer-time");
const circle = document.getElementById("timer-fg");
const configBtn = document.querySelector(".config-btn");
const configBtnSet = document.querySelector(".config-btn-settings");
const pomodoroContainer = document.getElementById("pomodoro-container");
const configContainer = document.getElementById("pomodoro-container-settings");
const laps = document.getElementById("laps");
const body = document.querySelector("body");

const workDurationInput = document.getElementById("work-input");
const restDurationInput = document.getElementById("rest-input");

let workDuration = workDurationInput.value * 60;
let restDuration = restDurationInput.value * 60;

workDurationInput.addEventListener("change", () => {
  workDuration = parseInt(workDurationInput.value * 60);
  if (isWorking) {
    remainingTime = workDuration;
    refreshProgress(remainingTime);
  }
});

restDurationInput.addEventListener("change", () => {
  restDuration = parseInt(restDurationInput.value * 60);
  if (!isWorking) {
    remainingTime = restDuration;
    refreshProgress(remainingTime);
  }
});

let remainingTime = workDuration;
let isRunning = false;
let isWorking = true;
let intervalId;
let lap = 0;

timerTime.innerHTML = formattedTime(remainingTime);
laps.innerHTML = lap;

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

  const workAudio = new Audio("/sound1.wav");
  const restAudio = new Audio("/sound2.wav");
  let playSound;

  if (!intervalId) {
    intervalId = setInterval(() => {
      if (isRunning) {
        remainingTime--;
        if (remainingTime <= 0) {
          isWorking = !isWorking;
          remainingTime = isWorking ? workDuration : restDuration;
          if (!isWorking) {
            lap++;
            laps.innerHTML = lap;
            body.classList.add("rest-time");
            restAudio.play();
          } else {
            body.classList.remove("rest-time");
            workAudio.play();
          }
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
  lap = 0;
  isRunning = false;
  body.classList.remove("rest-time");
  playBtn.removeAttribute("disabled", "");
  pauseBtn.setAttribute("disabled", "");
});

configBtnSet.addEventListener("click", () => {
  pomodoroContainer.style.display = "block";
  configContainer.style.display = "none";
  lap = 0;
});
