let createdTime, attempts, correctClick, reactionTime, totalReactionTime;
const MAX_ATTEMPTS = 10;
const COLOR_OPTIONS = [
	['B', '#209cee'],	['G', '#92cc41'],	['Y', '#f7d51d'],	['R', '#e76e55'],
];

const KEYBOARD_COLOR_OPTIONS = {
  'q': 0, 'w': 1, 'e': 2, 'r': 3,
};

function reset() {
  attempts = 0;
  correctClick = 0;
  reactionTime = 0;
  totalReactionTime = 0;
}

function getRandomColor() {
  const selectedColorKey = Math.round(Math.random() * (COLOR_OPTIONS.length - 1));
  const [key, color] = COLOR_OPTIONS[selectedColorKey];
  return { key, color };
}

function addAttempts() {
  attempts++;
  document.getElementById('title').innerHTML = 
    `<span class="hidden-sm">Tentativa</span> ${attempts}/10 - ${reactionTime}ms`
}

function makelight() {
  addAttempts()

  setTimeout(() => {
    const lightElement = document.getElementById('light');
    const areaElement = document.getElementById('area');
    
    const marginTop = Math.random() * (areaElement.offsetHeight - lightElement.offsetHeight);
    const marginLeft = Math.random() * (areaElement.offsetWidth - lightElement.offsetWidth);
    
    let randomColor = getRandomColor();
    while (lightElement.dataset.colorKey === randomColor.key) {
      randomColor = getRandomColor();
    }
    
    lightElement.style.marginTop = `${marginTop}px`;
    lightElement.style.marginLeft = `${marginLeft}px`;
    lightElement.style.backgroundColor = randomColor.color;
    lightElement.dataset.colorKey = randomColor.key;
    lightElement.style.opacity = 1;

    createdTime = Date.now();
  }, 200);

  setTimeout(() => {
    if (Date.now() - createdTime > 1000)
      document.getElementById('light').style.opacity = 0;
  }, 1250);
}

function onclick() {
  return checkKey(this.id);
};

function pushbtn(event) {
  if (attempts > MAX_ATTEMPTS)
    return;

  const pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
  if (KEYBOARD_COLOR_OPTIONS.hasOwnProperty(pressedKey)) {
    const colorKey = KEYBOARD_COLOR_OPTIONS[pressedKey]
    const [key] = COLOR_OPTIONS[colorKey];
    return checkKey(key);
  }
}

function checkKey(key) {
  const lightElement = document.getElementById('light');
  if (lightElement.dataset.colorKey !== key){
    addAttempts()
    return;
  }

  correctClick++;
  reactionTime = Date.now() - createdTime;
  totalReactionTime += reactionTime
  
  lightElement.style.opacity = 0;
  
  if (attempts === MAX_ATTEMPTS)
    return showResults()

  return makelight();
};

function showResults(){
  console.log(attempts, correctClick);
  const score = (2*correctClick) - attempts
  const avgReactionTime = totalReactionTime/correctClick
  
  document.getElementById('result-score').innerHTML = score
  document.getElementById('result-time').innerHTML = avgReactionTime.toFixed(0)
  document.getElementById('title').innerHTML = 'Resultado'

  document.getElementById('play').classList.remove('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('light').classList.add('hidden');
  document.getElementById('controls').classList.add('hidden');
}

function back() {
  document.getElementById('controls').classList.add('hidden');
  document.getElementById('result').classList.add('hidden');
  document.getElementById('back').classList.add('hidden');
  document.getElementById('light').classList.add('hidden');
  document.getElementById('play').classList.remove('hidden');
  document.getElementById('welcome').classList.remove('hidden');
  document.getElementById('title').innerHTML = 'REACTION'
}

function play() {
  document.getElementById('play').classList.add('hidden');
  document.getElementById('result').classList.add('hidden');
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('back').classList.remove('hidden');
  document.getElementById('light').classList.remove('hidden');
  document.getElementById('controls').classList.remove('hidden');

  reset();
  makelight();
}

document.addEventListener('keypress', pushbtn);
document.getElementById('R').onclick = onclick;
document.getElementById('G').onclick = onclick;
document.getElementById('B').onclick = onclick;
document.getElementById('Y').onclick = onclick;
document.getElementById('back').onclick = back;
document.getElementById('to-play').onclick = play;
