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
