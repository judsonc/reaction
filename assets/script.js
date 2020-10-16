let createdTime, totalClick = 0, correctClick = 0, reactionTime = 0;

const COLOR_OPTIONS = [
	['B', '#209cee'],
	['G', '#92cc41'],
	['Y', '#f7d51d'],
	['R', '#e76e55'],
];

function getRandomColor() {
  const selectedColorKey = Math.round(Math.random() * (COLOR_OPTIONS.length - 1));
  const [key, color] = COLOR_OPTIONS[selectedColorKey];
  return { key, color };
}

function makelight() {  
  setTimeout(() => {
    const lightElement = document.getElementById('light');
    const areaElement = document.getElementById('area');
    
    const marginTop = Math.random() * (areaElement.offsetHeight - lightElement.offsetHeight);
    const marginLeft = Math.random() * (areaElement.offsetWidth - lightElement.offsetWidth);
    
    const randomColor = getRandomColor()
    
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
  const pressedKey = String.fromCharCode(event.keyCode);
  if (pressedKey > 0 && pressedKey < 5) {
    const [key] = COLOR_OPTIONS[pressedKey - 1];
    return checkKey(key);
  }
}

function checkKey(key) {
  totalClick++;

  const lightElement = document.getElementById('light');  
  if (lightElement.dataset.colorKey === key){
    correctClick++; 
    reactionTime = (Date.now() - createdTime);
    lightElement.style.opacity = 0;
    makelight();
  }
  document.getElementById('title').innerHTML = `${totalClick}/${correctClick} - ${reactionTime}ms`
};

function play() {
  document.getElementById('play').classList.add("hidden");
  document.getElementById('controls').classList.remove("hidden");

  makelight();
}

document.addEventListener('keypress', pushbtn);
document.getElementById('R').onclick = onclick;
document.getElementById('G').onclick = onclick;
document.getElementById('B').onclick = onclick;
document.getElementById('Y').onclick = onclick;
document.getElementById('to-play').onclick = play;
