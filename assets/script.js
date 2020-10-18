let createdTime, attempts, correctClick, reactionTime, totalReactionTime;
const NEW_COLOR_PERIOD = 1250; //ms
const MAX_ATTEMPTS = 10;
const COLOR_OPTIONS = {
  q: "#209cee",
  w: "#92cc41",
  e: "#f7d51d",
  r: "#e76e55",
};

function reset() {
  attempts = 0;
  correctClick = 0;
  reactionTime = 0;
  totalReactionTime = 0;
}

function getRandomColor() {
  const keys = Object.keys(COLOR_OPTIONS);
  const key = keys[Math.round(Math.random() * (keys.length - 1))];
  const color = COLOR_OPTIONS[key];
  return color;
}

function addAttempts() {
  attempts++;
  document.getElementById(
    "title"
  ).innerHTML = `<span class="hidden-sm">Tentativa</span> ${attempts}/10 - ${reactionTime}ms`;
}

function makelight() {
  setTimeout(() => {
    const lightElement = document.getElementById("light");
    const areaElement = document.getElementById("area");

    const marginTop =
      Math.random() * (areaElement.offsetHeight - lightElement.offsetHeight);
    const marginLeft =
      Math.random() * (areaElement.offsetWidth - lightElement.offsetWidth);

    let randomColor = getRandomColor();
    while (lightElement.dataset.color === randomColor)
      randomColor = getRandomColor();

    lightElement.style.marginTop = `${marginTop}px`;
    lightElement.style.marginLeft = `${marginLeft}px`;
    lightElement.style.backgroundColor = randomColor;
    lightElement.dataset.color = randomColor;
    lightElement.style.opacity = 1;

    createdTime = Date.now();
  }, 200);

  setTimeout(() => {
    if (Date.now() - createdTime > 1000)
      document.getElementById("light").style.opacity = 0;
  }, NEW_COLOR_PERIOD);
}

function onclick() {
  return checkKey(this.id);
}

function pushbtn(event) {
  const pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
  if (!!COLOR_OPTIONS[pressedKey]) {
    return checkKey(pressedKey);
  }
}

function checkKey(pressedKey) {
  if (attempts >= MAX_ATTEMPTS) return;
  const lightElement = document.getElementById("light");
  addAttempts();
  if (lightElement.dataset.color === COLOR_OPTIONS[pressedKey]) {
    correctClick++;
    reactionTime = Date.now() - createdTime;
    totalReactionTime += reactionTime;
    lightElement.style.opacity = 0;
  }
  if (attempts >= MAX_ATTEMPTS) return showResults();

  return makelight();
}

function showResults() {
  const score = 2 * correctClick - attempts;
  const avgReactionTime = totalReactionTime / correctClick;

  document.getElementById("result-score").innerHTML = score;
  document.getElementById("result-time").innerHTML = avgReactionTime.toFixed(0);
  document.getElementById("title").innerHTML = "Resultado";

  document.getElementById("play").classList.remove("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("light").classList.add("hidden");
  document.getElementById("controls").classList.add("hidden");
}

function back() {
  document.getElementById("controls").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("back").classList.add("hidden");
  document.getElementById("light").classList.add("hidden");
  document.getElementById("play").classList.remove("hidden");
  document.getElementById("welcome").classList.remove("hidden");
  document.getElementById("title").innerHTML = "REACTION";
}

function play() {
  document.getElementById("play").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("back").classList.remove("hidden");
  document.getElementById("light").classList.remove("hidden");
  document.getElementById("controls").classList.remove("hidden");

  reset();
  makelight();
}

document.addEventListener("keypress", pushbtn);
Object.keys(COLOR_OPTIONS).forEach((key) => {
  document.getElementById(key).onclick = onclick;
});
document.getElementById("back").onclick = back;
document.getElementById("to-play").onclick = play;
