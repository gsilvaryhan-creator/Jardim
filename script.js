alert("TESTE JS");
/* CONFIGURAÇÕES */
const CONFIG = {
  quantidadeFlores: 38,
  quantidadeInsetos: 3,
  velocidadeVento: 13,
  inicio: new Date(2026, 3, 27, 18, 14),
  cores: [
    ['#f4b6c2', '#f7dc76', '#e8889b'],
    ['#fff3d0', '#efbd4f', '#f8c95e'],
    ['#c3addf', '#e6d7a9', '#9f83ca'],
    ['#ed9eaa', '#f8d1b3', '#cf7085'],
    ['#ffaebe', '#ffdf77', '#ed7d9d'],
    ['#f7d28c', '#9d713f', '#e8b85e']
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
  ['A cartinha de girassol', 'Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda, mas o que eu mais amo nela é saber que você separou um tempo e carinho para fazer algo pensando em mim.'],
  ['As nossas calls', 'Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia.'],
  ['As minhas piadinhas', 'Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é o meu jeito de brincar com você e criar momentos bobos.'],
  ['O nosso caminho', 'A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você.']
];


/* ELEMENTOS */

const intro = document.getElementById('intro');
const gardenScreen = document.getElementById('garden-screen');
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



/* UTILIDADES */

function numeroAleatorio(min, max) {
  return Math.random() * (max - min) + min;
}



/* DESENHO DAS FLORES */

function desenhoDaFlor(type) {

  if(type === 'rose') {
    return `
      <span class="flower-part rose-petal one"></span>
      <span class="flower-part rose-petal two"></span>
      <span class="flower-part rose-petal three"></span>
      <span class="flower-part rose-petal four"></span>
      <span class="flower-part rose-core"></span>
    `;
  }


  if(type === 'tulip') {
    return `
      <span class="flower-part tulip-petal one"></span>
      <span class="flower-part tulip-petal two"></span>
      <span class="flower-part tulip-petal three"></span>
      <span class="flower-part stem"></span>
      <span class="flower-part leaf left"></span>
      <span class="flower-part leaf right"></span>
    `;
  }


  if(type === 'lavender') {
    return `
      <span class="flower-part stem"></span>
      <span class="flower-part bud one"></span>
      <span class="flower-part bud two"></span>
      <span class="flower-part bud three"></span>
      <span class="flower-part bud four"></span>
    `;
  }


  const petals =
    type === 'sunflower' ? 12 :
    type === 'wildflower' ? 6 : 8;


  return `
    ${Array.from({length:petals},(_,i)=>
      `<span class="flower-part petal" style="--angle:${i*(360/petals)}deg"></span>`
    ).join('')}

    <span class="center"></span>
  `;
}



/* CRIAÇÃO DAS FLORES */

function criarFlor({special=false, cardIndex=null, x, y, delay=0}) {


  const flower = document.createElement(
    special ? 'button' : 'div'
  );


  const tipos = [
    'daisy',
    'tulip',
    'rose',
    'lavender',
    'sunflower',
    'wildflower'
  ];


  const type = tipos[
    Math.floor(Math.random()*tipos.length)
  ];


  const cores =
    CONFIG.cores[
      Math.floor(Math.random()*CONFIG.cores.length)
    ];


  const size = special
    ? numeroAleatorio(43,50)
    : numeroAleatorio(25,38);



  flower.className =
    `flower ${type} ${special ? 'special':''}`;



  flower.style.cssText = `
    --size:${size}px;
    --petal:${cores[0]};
    --center:${cores[1]};
    --accent:${cores[2]};
    --rotation:${numeroAleatorio(-12,12)}deg;
    left:${x}%;
    top:${y}%;
  `;



  flower.innerHTML =
    desenhoDaFlor(type);



  if(special){

    flower.type="button";

    flower.setAttribute(
      'aria-label',
      `Abrir carta: ${CARTAS[cardIndex][0]}`
    );


    flower.addEventListener(
      'click',
      ()=>abrirCarta(cardIndex,flower)
    );

  }



  flowers.appendChild(flower);



  setTimeout(()=>{

    flower.classList.add('born');

  },delay);
/* CARTAS */

function abrirCarta(index, flower){

  activeFlower = flower;

  flower.classList.add('is-open');


  document.getElementById('letter-title').textContent =
    CARTAS[index][0];


  document.getElementById('letter-text').textContent =
    CARTAS[index][1];


  document.getElementById('letter-progress').textContent =
    `Flor ${seenCards.size + (seenCards.has(index)?0:1)} de ${CARTAS.length}`;


  seenCards.add(index);


  modal.hidden = false;
  modal.setAttribute('aria-hidden','false');


  document.getElementById('close-letter').focus();


  if(seenCards.size === CARTAS.length){
    nascerFlorDourada();
  }

}



function fecharCarta(){

  modal.hidden = true;

  modal.setAttribute('aria-hidden','true');


  if(activeFlower){
    activeFlower.classList.remove('is-open');
  }


  activeFlower = null;

}





/* PRIMEIRA ROSA NASCENDO */

function criarFlorInicial(){

  const flower = document.createElement('div');


  flower.className =
    'flower first-flower rose';


  flower.style.cssText = `
    --size:55px;
    --petal:#e98c9e;
    --center:#f3ca60;
    --accent:#cf7085;
    left:calc(50% - 27px);
    top:calc(50% - 27px);
  `;


  flower.innerHTML =
    desenhoDaFlor('rose');


  flowers.appendChild(flower);


  setTimeout(()=>{

    flower.classList.add('born');

  },100);


}





/* GIRASSOL FINAL */

function nascerFlorDourada(){

  if(goldenFlowerBorn) return;

  goldenFlowerBorn=true;


  document.getElementById('hint').textContent =
    'A última lembrança floresceu... 🌻';



  const flower =
    document.createElement('button');


  flower.type='button';


  flower.className =
    'flower sunflower golden-final';



  flower.style.cssText=`

    --size:90px;
    --petal:#f7cb55;
    --center:#815c32;
    --accent:#e8b85e;

    left:calc(50% - 45px);
    top:calc(50% - 45px);

  `;


  flower.innerHTML =
    desenhoDaFlor('sunflower');



  flower.addEventListener(
    'click',
    ()=>{

      gardenScreen.hidden=true;
      finalScreen.hidden=false;
      window.scrollTo(0,0);

    }
  );


  flowers.appendChild(flower);


  setTimeout(()=>{
    flower.classList.add('born');
  },100);

}





/* CONTADOR */

function atualizarContador(){

  const diff =
    Math.max(0,Date.now()-CONFIG.inicio.getTime());


  const dias =
    Math.floor(diff/86400000);


  const horas =
    Math.floor((diff/3600000)%24);


  const minutos =
    Math.floor((diff/60000)%60);



  document.getElementById('counter').textContent =
    `${dias} dias, ${horas} horas e ${minutos} minutos desde a primeira mensagem`;

}




/* GERAR JARDIM */

function gerarJardim(){


 const positions=[];


 for(let row=0;row<8;row++){

   for(let column=0;column<7;column++){

    positions.push({

      x:11 + column*11.5 + numeroAleatorio(-.8,.8),

      y:10 + row*9.7 + numeroAleatorio(-.7,.7)

    });

   }

 }


 positions.sort(()=>Math.random()-0.5);



 CARTAS.forEach((_,index)=>{

   criarFlor({

    special:true,

    cardIndex:index,

    ...positions.pop(),

    delay:index*120

   });

 });



 for(let i=0;i<CONFIG.quantidadeFlores;i++){

   criarFlor({

    ...positions.pop(),

    delay:1300+i*50

   });

 }




 /* partículas */

 for(let i=0;i<14;i++){

  const p=document.createElement('span');

  p.className='particle';


  p.style.cssText=`

    left:${numeroAleatorio(-10,85)}%;

    top:${numeroAleatorio(15,95)}%;

    --duration:${numeroAleatorio(7,12)}s;

    --delay:${numeroAleatorio(-12,0)}s;

  `;


  wind.appendChild(p);

 }




 const criaturas=['🦋','🐞','🐝','🦋'];


 for(let i=0;i<CONFIG.quantidadeInsetos;i++){

  const inseto=document.createElement('span');

  inseto.className='insect';

  inseto.textContent=criaturas[i];


  inseto.style.cssText=`

    left:${numeroAleatorio(8,80)}%;

    top:${numeroAleatorio(10,80)}%;

    --duration:${numeroAleatorio(4,8)}s;

    --delay:${numeroAleatorio(-6,0)}s;

  `;


  insects.appendChild(inseto);

 }


}







/* EVENTOS */


document
.getElementById('enter-button')
.addEventListener('click',()=>{

  alert("cliquei");

 iniciarMusica?.();


 intro.classList.add('is-leaving');



 setTimeout(()=>{


   intro.hidden=true;


   transitionScreen.hidden=false;



   setTimeout(()=>{


     transitionScreen.hidden=true;


     gardenScreen.hidden=false;



     window.scrollTo(0,0);



     criarFlorInicial();



     gerarJardim();



     gardenScreen.classList.add('is-entering');



   },900);



 },650);



});




document
.getElementById('close-letter')
.addEventListener('click',fecharCarta);



document
.querySelector('.modal-backdrop')
.addEventListener('click',fecharCarta);



document.addEventListener('keydown',event=>{

 if(event.key==='Escape' && !modal.hidden){

  fecharCarta();

 }

});




musicButton.addEventListener(
'click',
alternarMusica
);



document
.getElementById('restart-button')
.addEventListener('click',()=>{

 finalScreen.hidden=true;

 gardenScreen.hidden=false;

});






/* INICIALIZAÇÃO */


atualizarContador();


setInterval(
 atualizarContador,
 60000
);
}

alert("JS carregou");
