/* CONFIGURAÇÕES */
const CONFIG = {
  quantidadeFlores: 38,
  quantidadeInsetos: 3,
  velocidadeVento: 13,
  inicio: new Date(2026, 3, 27, 18, 14),
  cores: [
    ['#f4b6c2', '#f7dc76', '#e8889b'], ['#fff3d0', '#efbd4f', '#f8c95e'],
    ['#c3addf', '#e6d7a9', '#9f83ca'], ['#ed9eaa', '#f8d1b3', '#cf7085'],
    ['#ffaebe', '#ffdf77', '#ed7d9d'], ['#f7d28c', '#9d713f', '#e8b85e']
  ]
};

const CARTAS = [
  ['Seu cabelo', 'Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço.'],
  ['Seus olhos', 'Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra.'],
  ['O seu sorriso', 'O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto.'],
  ['Minha pitucha', 'Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida, não vejo minha rotina sem você.'],
  ['Quando você ri de mim', 'Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar.'],
  ['O jeito que você cuida', 'Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas para muita gente, mas eu vejo e admiro muito em você.'],
  ['Baixo, não guitarra', 'No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso. Até hoje acho engraçado lembrar disso, porque foi uma das nossas primeiras brincadeiras.'],
  ['A cartinha de girassol', 'Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda, mas o que eu mais amo nela é saber que você separou um tempo e carinho para fazer algo pensando em mim, penso da mesma forma para todos os outros presentes que você me deu.'],
  ['As nossas calls', 'Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia. Nesses momentos eu percebo ainda mais o quanto você mesmo cansada, guarda um tempinho para passar o tempo comigo, e isso te torna cada vez mais especial para mim.'],
  ['As minhas piadinhas', 'Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é o meu jeito de brincar com você, de criar aqueles momentos bobos que depois viram lembrança. Nunca é para te deixar mal, me enche o coração depois conseguir tirar um sorriso do seu rosto. Me faz bem te ver sorrir.'],
  ['O nosso caminho', 'A gente ainda é novo e tem muita coisa para viver: dias muito bons, momentos difíceis e muitos sonhos pela frente. Mas eu quero passar por tudo isso com você, apoiando você e sabendo que também vou ter você comigo.']
];

/* ELEMENTOS */
const intro = document.getElementById('intro');
const gardenScreen = document.getElementById('garden-screen');
const garden = document.getElementById('garden');
const flowers = document.getElementById('flowers');
const wind = document.getElementById('wind');
const insects = document.getElementById('insects');
const modal = document.getElementById('letter-modal');
const finalScreen = document.getElementById('final-screen');
const transitionScreen = document.getElementById('transition-screen');
const musicButton = document.getElementById('music-button');
const seenCards = new Set();
let activeFlower = null;
let goldenFlowerBorn = false;
let audioContext = null;
let masterGain = null;
let musicTimer = null;
let musicMuted = false;

/* FUNÇÕES */
function numeroAleatorio(min, max) { return Math.random() * (max - min) + min; }

function desenhoDaFlor(type) {
  if (type === 'tulip') return '<span class="flower-part tulip-petal one"></span><span class="flower-part tulip-petal two"></span><span class="flower-part tulip-petal three"></span><span class="flower-part stem"></span><span class="flower-part leaf left"></span><span class="flower-part leaf right"></span>';
  if (type === 'lavender') return '<span class="flower-part stem"></span><span class="flower-part bud one"></span><span class="flower-part bud two"></span><span class="flower-part bud three"></span><span class="flower-part bud four"></span>';
  if (type === 'rose') return '<span class="flower-part rose-petal one"></span><span class="flower-part rose-petal two"></span><span class="flower-part rose-petal three"></span><span class="flower-part rose-petal four"></span><span class="flower-part rose-core"></span>';
  const petals = type === 'sunflower' ? 12 : type === 'wildflower' ? 6 : 8;
  return `${Array.from({ length: petals }, (_, index) => `<span class="flower-part petal" style="--angle:${index * (360 / petals)}deg"></span>`).join('')}<span class="center"></span>`;
}

function criarFlor({ special = false, cardIndex = null, x, y }) {
  const flower = document.createElement(special ? 'button' : 'div');
  const types = ['daisy', 'tulip', 'rose', 'lavender', 'sunflower', 'wildflower'];
  const type = types[Math.floor(Math.random() * types.length)];
  const [petal, center, accent] = CONFIG.cores[Math.floor(Math.random() * CONFIG.cores.length)];
  const size = special ? numeroAleatorio(43, 50) : numeroAleatorio(25, 38);
  flower.className = `flower ${type}${special ? ' special' : ''}`;
  flower.style.cssText = `--size:${size}px;--petal:${petal};--center:${center};--accent:${accent};--rotation:${numeroAleatorio(-12, 12)}deg;left:${x}%;top:${y}%;`;
  flower.innerHTML = desenhoDaFlor(type);
  if (special) {
    flower.type = 'button';
    flower.setAttribute('aria-label', `Abrir carta: ${CARTAS[cardIndex][0]}`);
    flower.addEventListener('click', () => abrirCarta(cardIndex, flower));
  }
  flowers.appendChild(flower);

setTimeout(() => {
  flower.classList.add('born');
}, Math.random() * 1200);
}

function abrirCarta(index, flower) {
  activeFlower = flower;
  flower.classList.add('is-open');
  document.getElementById('letter-title').textContent = CARTAS[index][0];
  document.getElementById('letter-text').textContent = CARTAS[index][1];
  document.getElementById('letter-progress').textContent = `Flor ${seenCards.size + (seenCards.has(index) ? 0 : 1)} de ${CARTAS.length}`;
  seenCards.add(index);
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('close-letter').focus();
  if (seenCards.size === CARTAS.length) nascerFlorDourada();
}

function fecharCarta() {
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  if (activeFlower) activeFlower.classList.remove('is-open');
  activeFlower = null;
}

function atualizarContador() {
  const diff = Math.max(0, Date.now() - CONFIG.inicio.getTime());
  const dias = Math.floor(diff / 86400000);
  const horas = Math.floor((diff / 3600000) % 24);
  const minutos = Math.floor((diff / 60000) % 60);
  document.getElementById('counter').textContent = `${dias} dias, ${horas} horas e ${minutos} minutos desde a primeira mensagem`;
}

function nascerFlorDourada() {
  if (goldenFlowerBorn) return;
  goldenFlowerBorn = true;
  document.getElementById('hint').textContent = 'A última lembrança floresceu... 🌻'; 
  const flower = document.createElement('button');
  flower.type = 'button';
  flower.className = 'flower sunflower golden-final';
 flower.style.cssText = `
--petal:#f7cb55;
--center:#815c32;
--accent:#e8b85e;
left:45%;
top:78%;
`;
  flower.setAttribute('aria-label', 'Abrir a última flor dourada');
  flower.innerHTML = desenhoDaFlor('sunflower');
  flower.addEventListener('click', () => { gardenScreen.hidden = true; finalScreen.hidden = false; window.scrollTo(0, 0); });
  flowers.appendChild(flower);
}

function tocarNota(frequencia, inicio, duracao, tipo = 'sine', volumeMaximo = .018) {
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  oscillator.type = tipo;
  oscillator.frequency.value = frequencia;
  volume.gain.setValueAtTime(0.0001, inicio);
  volume.gain.exponentialRampToValueAtTime(volumeMaximo, inicio + .12);
  volume.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);
  oscillator.connect(volume).connect(masterGain);
  oscillator.start(inicio);
  oscillator.stop(inicio + duracao + .04);
}

function tocarMelodia() {
  const notas = [220, 261.63, 329.63, 440, 392, 329.63, 261.63, 246.94, 220, 261.63, 329.63, 392, 349.23, 293.66, 329.63, 440];
  const agora = audioContext.currentTime + .05;
  notas.forEach((nota, index) => {
    const instante = agora + index * .76;
    tocarNota(nota, instante, 1.35, 'sine', .019);
    if (index % 4 === 0) tocarNota(nota / 2, instante, 2.45, 'triangle', .009);
  });
}

function iniciarMusica() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.value = .8;
    masterGain.connect(audioContext.destination);
  }
  audioContext.resume();
  if (musicTimer) return;
  tocarMelodia();
  musicTimer = setInterval(tocarMelodia, 14000);
}

function alternarMusica() {
  iniciarMusica();
  musicMuted = !musicMuted;
  masterGain.gain.setTargetAtTime(musicMuted ? 0 : .8, audioContext.currentTime, .03);
  musicButton.textContent = musicMuted ? '🔇 Música' : '🔊 Música';
  musicButton.setAttribute('aria-pressed', String(!musicMuted));
}

function atualizarBotaoDeMusica() {
  musicMuted = false;
  musicButton.textContent = '🔊 Música';
  musicButton.setAttribute('aria-pressed', 'true');
}

/* GERAÇÃO DO JARDIM */
function gerarJardim() {
  const positions = [];
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 7; column++) {
      // Margens largas para respeitar o contorno arredondado do jardim.
      positions.push({ x: 11 + column * 11.5 + numeroAleatorio(-.8, .8), y: 10 + row * 9.7 + numeroAleatorio(-.7, .7) });
    }
  }
  positions.sort(() => Math.random() - .5);
  CARTAS.forEach((_, index) => criarFlor({ special: true, cardIndex: index, ...positions.pop() }));

for (let index = 0; index < CONFIG.quantidadeFlores; index++) {
  criarFlor({ ...positions.pop() });
}
  for (let index = 0; index < 14; index++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.cssText = `left:${numeroAleatorio(-10, 85)}%;top:${numeroAleatorio(15, 95)}%;--duration:${numeroAleatorio(7, 12)}s;--delay:${numeroAleatorio(-12, 0)}s;`;
    wind.appendChild(particle);
  }
  for (let index = 0; index < 8; index++) {
    const leaf = document.createElement('span');
    leaf.className = 'breeze-leaf';
    leaf.style.cssText = `left:${numeroAleatorio(-15, 85)}%;top:${numeroAleatorio(18, 98)}%;--duration:${numeroAleatorio(9, 14)}s;--delay:${numeroAleatorio(-14, 0)}s;`;
    wind.appendChild(leaf);
  }
  const creatures = ['🦋', '🐞', '🐝', '🦋'];
  for (let index = 0; index < CONFIG.quantidadeInsetos; index++) {
    const insect = document.createElement('span');
    insect.className = 'insect';
    insect.textContent = creatures[index];
    insect.style.cssText = `left:${numeroAleatorio(8, 80)}%;top:${numeroAleatorio(10, 80)}%;--duration:${numeroAleatorio(4, 8)}s;--delay:${numeroAleatorio(-6, 0)}s;`;
    insects.appendChild(insect);
  }
}

/* EVENTOS */
document.getElementById('enter-button').addEventListener('click', () => {
  iniciarMusica();
  console.log("1");
  atualizarBotaoDeMusica();
  console.log("2");
  intro.classList.add('is-leaving');
console.log("3");
  
setTimeout(() => {

  intro.hidden = true;
  console.log("4");

  transitionScreen.hidden = false;
  console.log("5");

 setTimeout(() => {

    transitionScreen.hidden = true;

    gardenScreen.hidden = false;

   criarFlorInicial();

    gardenScreen.classList.add('is-entering');

    atualizarContador();

    setTimeout(() => {

      gardenScreen.classList.remove('is-entering');

    }, 900);

  }, 900);

}, 650);
});
document.getElementById('close-letter').addEventListener('click', fecharCarta);
document.querySelector('.modal-backdrop').addEventListener('click', fecharCarta);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) fecharCarta(); });
musicButton.addEventListener('click', alternarMusica);
document.getElementById('restart-button').addEventListener('click', () => { finalScreen.hidden = true; gardenScreen.hidden = false; });

/* INICIALIZAÇÃO */
function criarFlorInicial() {

  const flower = document.createElement('div');

  flower.className = 'flower first-flower rose';

  flower.style.cssText = `
    --size:70px;
    --petal:#e98c9e;
    --center:#f3ca60;
    --accent:#cf7085;
    left:calc(50% - 35px);
    top:calc(50% - 35px);
  `;

  flower.innerHTML = desenhoDaFlor('rose');

  flowers.appendChild(flower);

  setTimeout(() => {
    flower.classList.add('born');
  },100);

}
gerarJardim();
atualizarContador();
setInterval(atualizarContador, 60000);
