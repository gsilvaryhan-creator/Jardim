/* ==========================
JARDIM ONDE VOCÊ FLORESCE
SCRIPT PRINCIPAL
========================== */


document.addEventListener(
"DOMContentLoaded",
init
);





/* ==========================
ESTADO DO SITE
========================== */


let currentScreen = "INTRO";


let openedLetters = 0;


let gardenStarted = false;


let finalActivated = false;


let musicPlaying = false;





/* ==========================
ELEMENTOS
========================== */


let intro;

let transition;

let garden;

let finalScreen;


let flowersContainer;

let letterModal;


let letterTitle;

let letterText;


let backgroundMusic;






/* ==========================
DADOS DAS CARTAS
========================== */


const letters = [


{

title:"Seu sorriso 🌻",

text:
"Uma das coisas mais bonitas que existem para mim é ver você feliz. Seu sorriso consegue deixar meus dias melhores."

},



{

title:"Seu jeitinho 🌷",

text:
"Cada detalhe seu faz você ser única. O jeito que você fala, pensa e demonstra carinho."

},



{

title:"Nossas conversas 🌸",

text:
"Mesmo de longe, nossos momentos conversando significam muito para mim."

},



{

title:"Sua risada 🌼",

text:
"Eu gosto da forma como sua alegria chega até mim e transforma qualquer momento."

},



{

title:"Meu carinho ❤️",

text:
"Mesmo distante, sempre encontro formas de lembrar o quanto você é importante."

},



{

title:"Pequenos detalhes 🌹",

text:
"São as pequenas coisas que fazem alguém especial permanecer no coração."

},



{

title:"Nossa história 🌻",

text:
"Cada momento que vivemos vai construindo algo bonito entre nós."

},



{

title:"Você 🌷",

text:
"Entre tantas pessoas no mundo, eu encontrei alguém que faz diferença para mim."

},



{

title:"Meu presente 💛",

text:
"Esse jardim é uma pequena demonstração de tudo que sinto."

},



{

title:"Meu cuidado 🌼",

text:
"Quero sempre poder trazer felicidade e carinho para sua vida."

},



{

title:"Para sempre lembrar ❤️",

text:
"Quando voltar aqui, espero que lembre que existe alguém pensando em você."

}


];







/* ==========================
INIT
========================== */


function init(){



intro =
document.getElementById("intro");


transition =
document.getElementById("transition");


garden =
document.getElementById("garden");


finalScreen =
document.getElementById("final");



flowersContainer =
document.getElementById(
"flowers-container"
);



letterModal =
document.getElementById(
"letterModal"
);



letterTitle =
document.getElementById(
"letterTitle"
);



letterText =
document.getElementById(
"letterText"
);



backgroundMusic =
document.getElementById(
"backgroundMusic"
);




bindEvents();


startCounter();

}







/* ==========================
EVENTOS
========================== */


function bindEvents(){



document
.getElementById("enterGarden")
.addEventListener(
"click",
enterGarden
);



document
.getElementById("closeLetter")
.addEventListener(
"click",
closeLetter
);



document
.getElementById("nextLetter")
.addEventListener(
"click",
closeLetter
);



document
.getElementById("musicButton")
.addEventListener(
"click",
toggleMusic
);



document
.getElementById("backGarden")
.addEventListener(
"click",
returnGarden
);



}







/* ==========================
TROCA DE TELAS
========================== */


function changeScreen(screen){


intro.classList.remove("active");

transition.classList.remove("active");

garden.classList.remove("active");

finalScreen.classList.remove("active");



screen.classList.add("active");



}







/* ==========================
ENTRAR NO JARDIM
========================== */


function enterGarden(){


currentScreen="TRANSITION";


changeScreen(transition);



setTimeout(()=>{


currentScreen="GARDEN";


changeScreen(garden);



if(!gardenStarted){


createGarden();


gardenStarted=true;


}


},2000);



}


/* ==========================
CRIAR JARDIM
========================== */


function createGarden(){


const flowers = [

"🌷",
"🌹",
"🌼",
"🌸",
"🪻"

];



let positions=[];



for(let i = 0; i < 24; i++){



let position = getSafePosition(
positions
);



positions.push(position);



let flower =
document.createElement(
"div"
);



flower.className =
"flower";



if(i >= 13){

flower.classList.add(
"special"
);

flower.dataset.letter =
i - 13;

}



flower.innerHTML =
flowers[
Math.floor(
Math.random() *
flowers.length
)
];



flower.style.left =
position.x + "%";



flower.style.top =
position.y + "%";



flower.style.animationDelay =
(i * 120) + "ms";





if(i >= 13){


flower.addEventListener(
"click",
()=>{

openLetter(
Number(
flower.dataset.letter
)
);

}

);


flower.addEventListener(
"touchstart",
()=>{

openLetter(
Number(
flower.dataset.letter
)
);

}

);


}



flowersContainer.appendChild(
flower
);



}



createParticles();


createLeaves();



}







/* ==========================
POSIÇÃO SEGURA
========================== */


function getSafePosition(existing){



let tries = 0;



while(tries < 100){



let x =
Math.random()*80 + 10;



let y =
Math.random()*76 + 12;



let valid = true;



for(let pos of existing){



let distance =
Math.sqrt(

Math.pow(
x-pos.x,
2
)

+

Math.pow(
y-pos.y,
2
)

);



if(distance < 8){


valid=false;


break;


}


}



if(valid){


return {
x,
y
};


}



tries++;



}



return {


x:50,

y:50


};



}








/* ==========================
CARTAS
========================== */


function openLetter(index){



if(!letters[index]){

return;

}



letterTitle.innerText =
letters[index].title;



letterText.innerText =
letters[index].text;



letterModal.classList.add(
"show"
);



openedLetters++;



if(openedLetters >= 11){


setTimeout(()=>{


activateFinal();


},800);



}



}







function closeLetter(){


letterModal.classList.remove(
"show"
);



}







/* ==========================
PARTÍCULAS LEVES
========================== */


function createParticles(){



let container =
document.getElementById(
"particles-container"
);



for(let i=0;i<20;i++){



let particle =
document.createElement(
"span"
);



particle.className =
"particle";



particle.style.left =
Math.random()*100 + "%";



particle.style.top =
Math.random()*100 + "%";



particle.style.animationDelay =
Math.random()*5+"s";



container.appendChild(
particle
);



}



}







/* ==========================
FOLHAS
========================== */


function createLeaves(){



let container =
document.getElementById(
"leaves-container"
);



let leaves=[

"🍃",
"🍂"

];



for(let i=0;i<8;i++){



let leaf =
document.createElement(
"span"
);



leaf.className =
"leaf";



leaf.innerHTML =
leaves[
Math.floor(
Math.random()*
leaves.length
)
];



leaf.style.left =
Math.random()*100+"%";



leaf.style.top =
Math.random()*100+"%";



leaf.style.animationDelay =
Math.random()*4+"s";



container.appendChild(
leaf
);



}



}


/* ==========================
CONTADOR
DESDE 27/04/2026 18:14
========================== */


function startCounter(){


const startDate =
new Date(
"2026-04-27T18:14:00"
);



function updateCounter(){



const now =
new Date();



const difference =
now - startDate;



if(difference < 0){

return;

}



const totalSeconds =
Math.floor(
difference / 1000
);



const days =
Math.floor(
totalSeconds / 86400
);



const hours =
Math.floor(
(totalSeconds % 86400)
/3600
);



const minutes =
Math.floor(
(totalSeconds %3600)
/60
);



document.getElementById(
"days"
).innerText =
days;



document.getElementById(
"hours"
).innerText =
hours;



document.getElementById(
"minutes"
).innerText =
minutes;



}



updateCounter();



setInterval(
updateCounter,
1000
);



}








/* ==========================
MÚSICA
========================== */


function toggleMusic(){



if(!backgroundMusic){

return;

}



if(
!musicPlaying
){


backgroundMusic.play()
.then(()=>{


musicPlaying=true;



document.getElementById(
"musicButton"
).innerText =
"🔇 Pausar Música";



})
.catch(()=>{});



}

else{


backgroundMusic.pause();



musicPlaying=false;



document.getElementById(
"musicButton"
).innerText =
"🔊 Música";


}



}








/* ==========================
FINAL
APÓS 11 CARTAS
========================== */


function activateFinal(){



if(finalActivated){

return;

}



finalActivated=true;



const sunflower =
document.getElementById(
"sunflowerTransition"
);



sunflower.classList.add(
"active"
);



setTimeout(()=>{


changeScreen(
finalScreen
);



sunflower.classList.remove(
"active"
);



},3000);



}








/* ==========================
VOLTAR AO JARDIM
========================== */


function returnGarden(){



changeScreen(
garden
);



currentScreen =
"GARDEN";



}
