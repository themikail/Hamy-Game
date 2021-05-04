const hamy = document.querySelectorAll(".hamy");
const startBtn = document.getElementById("start");
const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time");

let firstHamy;
let fullTime = false;
let score = 0;
let time = 15;

startBtn.addEventListener("click", startGame);
hamy.forEach((hamy) => hamy.addEventListener("click", vur));

function randomHamy() {
  const desk = Math.floor(Math.random() * hamy.length);
  const secilen = hamy[desk];
  if (firstHamy === secilen) {
    return randomHamy();
  } else {
    firstHamy = secilen;
  }
  return secilen;
}

function randomTime(min, max) {
  const time = Math.round(Math.random() * (max - min)) + min;
  return time;
}

function up() {
  const hamy = randomHamy();
  const hamyTime = randomTime(750, 1250);
  hamy.classList.add("secilen");
  setTimeout(() => {
    hamy.classList.remove("secilen");
    if (!fullTime) up();
  }, hamyTime);
}

function süreyiBaslat() {
  if (!fullTime) {
    time--;
    timeText.textContent = time;
  } else {
    timeText.textContent = "Time is up";
  }
}

function startGame() {
  time = 15;
  score = 0;
  fullTime = false;
  const interval = setInterval(() => {
    süreyiBaslat();
    if (fullTime) clearInterval(interval);
  }, 1000);
  up();
  setTimeout(() => {
    fullTime = true;
  }, time * 1000);
}

function vur(e) {
  if (e.target.classList.contains("secilen")) {
    score++;
    e.target.classList.remove("secilen");
  }
  scoreText.textContent = score;
}