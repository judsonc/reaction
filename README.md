# Reaction

Uma página WEB que tem o objetivo de medir o tempo médio de reação do usuário.

A medição do tempo de reação é feita ao mostrar um quadrado com uma das quatro cores disponíveis durante 1 segundo
em uma posição aleatória da tela e o usuário tem que clicar no botão de mesma cor localizado na parte inferior da página.
O usuário tem 10 tentativas para acertar todas as cores dos quadrados que aparecerem. O score máximo de 10 pontos é atingido se todas as tentativas forem corretas.

O score é calculado a partir da diferença entre acertos e erros.

Ao terminar as 10 tentativas, é calulado o score e o tempo médio de reação e isso é mostrado na tela de resultados.

## Estrutura do código

Inicialmente é criado todas as variáveis que armazenam o estado global da aplicação.

```js
// tempo inicial
let createdTime;
// tentativa atual
let attempts;
// acertos
let correctClick;
// tempo de reação
let reactionTime;
// soma de todos os tempos de reação
let totalReactionTime;
```

Em seguida temos as contantes utilizadas.

```js
// quantidade de tentativas
const MAX_ATTEMPTS = 10;
// cores possíveis
const COLOR_OPTIONS = [
  ["B", "#209cee"],
  ["G", "#92cc41"],
  ["Y", "#f7d51d"],
  ["R", "#e76e55"],
];
// teclas do teclado disponíveis
const KEYBOARD_COLOR_OPTIONS = {
  q: 0,
  w: 1,
  e: 2,
  r: 3,
};
```

É definido todas as funções que são ativadas ao interagir com a aplicação.

```js
// ao apertar as teclas do teclado
document.addEventListener("keypress", pushbtn);
// ao clicar no botão vermelho
document.getElementById("R").onclick = onclick;
// ao clicar no botão verde
document.getElementById("G").onclick = onclick;
// ao clicar no botão azul
document.getElementById("B").onclick = onclick;
// ao clicar no botão amarelo
document.getElementById("Y").onclick = onclick;
// ao clicar no botão de fechar o jogo
document.getElementById("back").onclick = back;
// ao clicar no botão play
document.getElementById("to-play").onclick = play;
```

Ao clicar no botão PLAY é executada a função para iniciar o jogo.

```js
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
```

Inicialmente é reiniciado todas as variáveis que armazenam o estado global.

```js
function reset() {
  attempts = 0;
  correctClick = 0;
  reactionTime = 0;
  totalReactionTime = 0;
}
```

Agora é feito o cálculo para saber o intervalo de coordenadas que o quadrado colorido pode
aparecer na tela. Em seguida é gerado uma cor aleatória que deve ser diferente da cor anterior
e salvo o tempo inicial da jogada. Após um segundo, o quadrado desaparece.

```js
function makelight() {
  // incrementar a tentativa
  addAttempts();
  // gerar cor e posição do quadrado
  setTimeout(() => {
    const lightElement = document.getElementById("light");
    const areaElement = document.getElementById("area");

    const marginTop =
      Math.random() * (areaElement.offsetHeight - lightElement.offsetHeight);
    const marginLeft =
      Math.random() * (areaElement.offsetWidth - lightElement.offsetWidth);

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
  // Esconder quadrado
  setTimeout(() => {
    if (Date.now() - createdTime > 1000)
      document.getElementById("light").style.opacity = 0;
  }, 1200);
}
```

Para gerar uma cor aleatória, é gerado um numéro randômico de 0 a 3 e retornado a cor selecionada.

```js
function getRandomColor() {
  const selectedColorKey = Math.round(
    Math.random() * (COLOR_OPTIONS.length - 1)
  );
  const [key, color] = COLOR_OPTIONS[selectedColorKey];
  return { key, color };
}
```

Em cada tentativa é mostrado o número da vez e o tempo de reação na parte superior da tela.

```js
function addAttempts() {
  attempts++;
  document.getElementById(
    "title"
  ).innerHTML = `<span class="hidden-sm">Tentativa</span> ${attempts}/10 - ${reactionTime}ms`;
}
```

Ao clicar nos botões coloridos, é verificado a cor do botão que foi clicado.

```js
function onclick() {
  return checkKey(this.id);
}
```

Ao apertar as teclas do teclado, é verificado a cor do botão correspondente a tecla selecionada.

```js
function pushbtn(event) {
  if (attempts > MAX_ATTEMPTS) return;

  const pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
  if (KEYBOARD_COLOR_OPTIONS.hasOwnProperty(pressedKey)) {
    const colorKey = KEYBOARD_COLOR_OPTIONS[pressedKey];
    const [key] = COLOR_OPTIONS[colorKey];
    return checkKey(key);
  }
}
```

O identificador da cor selecionada é comparada com a cor do quadrado que foi mostrado.
Se tiver errado, é passado para a próxima tentativa. Se tiver correto, é salvo o tempo de reação
ao subtrair o tempo atual pelo tempo inicial da tentativa.
Caso esteja na última tentativa, é mostrado a tela de resultado.

```js
function checkKey(key) {
  const lightElement = document.getElementById("light");
  if (lightElement.dataset.colorKey !== key) {
    addAttempts();
    return;
  }

  correctClick++;
  reactionTime = Date.now() - createdTime;
  totalReactionTime += reactionTime;

  lightElement.style.opacity = 0;

  if (attempts === MAX_ATTEMPTS) return showResults();

  return makelight();
}
```

Para mostrar o resultado, é calculado o score e o tempo médio de reação.

```js
function showResults() {
  console.log(attempts, correctClick);
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
```

Para reiniciar o jogo, é mostrado a tela inicial.

```js
function back() {
  document.getElementById("controls").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("back").classList.add("hidden");
  document.getElementById("light").classList.add("hidden");
  document.getElementById("play").classList.remove("hidden");
  document.getElementById("welcome").classList.remove("hidden");
  document.getElementById("title").innerHTML = "REACTION";
}
```
