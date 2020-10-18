# Reaction

Uma aplicação WEB que tem o objetivo de medir o tempo médio de reação do usuário.

A medição do tempo de reação é feita ao mostrar um quadrado com uma das quatro cores disponíveis durante 1 segundo
em uma posição aleatória da tela e o usuário tem que clicar no botão de mesma cor localizado na parte inferior da página.
O usuário tem 10 tentativas para acertar todas as cores dos quadrados que aparecerem. O score máximo de 10 pontos é atingido se todas as tentativas forem corretas.

O score é calculado a partir da diferença entre acertos e erros.

Ao terminar as 10 tentativas, é calulado o score e o tempo médio de reação e isso é mostrado na tela de resultados.

## Demonstração

Acesse a aplicação em [https://judsonc.github.io/reaction](https://judsonc.github.io/reaction)

## Desenvolvimento

Para executar a aplicação localmente, use os comandos. Acesse a aplicação em [http://localhost:8000](http://localhost:8000)

```sh
# instalar dependências
$ yarn
# iniciar aplicação
$ yarn start
```

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
// tempo para o quadrado desaparecer da tela
const NEW_COLOR_PERIOD = 1250; // ms
// quantidade de tentativas
const MAX_ATTEMPTS = 10;
// cores possíveis
const COLOR_OPTIONS = {
  q: "#209cee",
  w: "#92cc41",
  e: "#f7d51d",
  r: "#e76e55",
};
```

É definido todas as funções que são ativadas ao interagir com a aplicação.

```js
// ao apertar as teclas do teclado
document.addEventListener("keypress", pushbtn);
// ao clicar nos botões com as quatro cores
Object.keys(COLOR_OPTIONS).forEach((key) => {
  document.getElementById(key).onclick = onclick;
});
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
  addAttempts();
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
  // gerar cor e posição do quadrado
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
  // Esconder quadrado
  setTimeout(() => {
    if (Date.now() - createdTime > 1000)
      document.getElementById("light").style.opacity = 0;
  }, NEW_COLOR_PERIOD);
}
```

Para gerar uma cor aleatória, é gerado um numéro randômico de 0 a 3 e retornado a cor selecionada.

```js
function getRandomColor() {
  const keys = Object.keys(COLOR_OPTIONS);
  const key = keys[Math.round(Math.random() * (keys.length - 1))];
  const color = COLOR_OPTIONS[key];
  return color;
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
  const pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
  if (!!COLOR_OPTIONS[pressedKey]) {
    return checkKey(pressedKey);
  }
}
```

O identificador da cor selecionada é comparada com a cor do quadrado que foi mostrado.
Se tiver errado, é passado para a próxima tentativa. Se tiver correto, é salvo o tempo de reação
ao subtrair o tempo atual pelo tempo inicial da tentativa.
Caso esteja na última tentativa, é mostrado a tela de resultado.

```js
function checkKey(pressedKey) {
  if (attempts > MAX_ATTEMPTS) return;

  const lightElement = document.getElementById("light");
  addAttempts();
  if (lightElement.dataset.color === COLOR_OPTIONS[pressedKey]) {
    correctClick++;
    reactionTime = Date.now() - createdTime;
    totalReactionTime += reactionTime;
    lightElement.style.opacity = 0;
  }
  if (attempts > MAX_ATTEMPTS) return showResults();

  return makelight();
}
```

Para mostrar o resultado, é calculado o score e o tempo médio de reação.

```js
function showResults() {
  // calcula o score (é o mesmo que score = acertos - erros)
  const score = 2 * correctClick - MAX_ATTEMPTS;
  // calcula o tempo médio de reação
  const avgReactionTime = totalReactionTime / (correctClick || 1);
  // insere na tela os valores calculados
  document.getElementById("result-score").innerHTML = score;
  document.getElementById("result-time").innerHTML = avgReactionTime.toFixed(0);
  document.getElementById("title").innerHTML = "Resultado";
  // mostra a tela com os resultados
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
