/* ==========================================
   CONFIGURAÇÕES
========================================== */


const intro = document.getElementById("intro");
const transition = document.getElementById("transition");
const gardenScreen = document.getElementById("gardenScreen");
const finalScreen = document.getElementById("finalScreen");


const enterButton = document.getElementById("enterGarden");

const garden = document.getElementById("garden");


const modal = document.getElementById("letterModal");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");

const closeLetter = document.getElementById("closeLetter");


const counter = document.getElementById("counter");


const finalButton = document.getElementById("finalButton");

const backGarden = document.getElementById("backGarden");


const musicButton = document.getElementById("musicButton");
const music = document.getElementById("backgroundMusic");





/* ==========================================
   ESTADO DO JOGO
========================================== */


let openedLetters = 0;


let lettersOpened = [];


let musicPlaying = false;





/* ==========================================
   FLORES INICIAIS NASCENDO
========================================== */


window.addEventListener("load",()=>{


    createParticles();


    createGardenFlowers();


});





/* ==========================================
   ENTRAR NO JARDIM
========================================== */


enterButton.addEventListener("click",()=>{


    intro.classList.remove("active");


    setTimeout(()=>{


        transition.classList.add("active");


    },600);



    setTimeout(()=>{


        transition.classList.remove("active");


        gardenScreen.classList.add("active");


    },3000);



});





/* ==========================================
   CRIAR FLORES DO JARDIM
========================================== */


function createGardenFlowers(){


const normalFlowers=[

"🌷",
"🌹",
"🌸",
"🌺",
"💮",
"🌼"

];


for(let i=0;i<40;i++){


    const flower=document.createElement("div");


    flower.classList.add("flower");


    flower.innerHTML=
    normalFlowers[
        Math.floor(
            Math.random()*normalFlowers.length
        )
    ];



    /*
    Mantém dentro do jardim
    com margem para celular
    */


    const x=Math.random()*75+10;

    const y=Math.random()*75+10;



    flower.style.left=x+"%";

    flower.style.top=y+"%";



    flower.style.animationDelay=
    (i*0.08)+"s";



    garden.appendChild(flower);



}



createSpecialFlowers();


}





/* ==========================================
   FLORES COM CARTAS
========================================== */


function createSpecialFlowers(){



flowerMemories.forEach((memory,index)=>{


const flower=document.createElement("div");


flower.classList.add(
"flower",
"special-flower"
);



flower.innerHTML="🌹";



/*

Posições limitadas para
não sair do jardim

*/


const x=Math.random()*70+12;

const y=Math.random()*70+12;



flower.style.left=x+"%";

flower.style.top=y+"%";



flower.style.animationDelay=
(index+3)*0.2+"s";



flower.dataset.index=index;



flower.addEventListener(
"click",
()=>{


openLetter(index);


}
);



garden.appendChild(flower);



});


}





/* ==========================================
   ABRIR CARTA
========================================== */


function openLetter(index){


if(!lettersOpened.includes(index)){


lettersOpened.push(index);

openedLetters++;


}



const memory=
flowerMemories[index];



letterTitle.innerText=
memory.title;


letterText.innerText=
memory.text;



modal.classList.add("show");



checkFinal();


}





closeLetter.addEventListener(
"click",
()=>{


modal.classList.remove("show");


});





/* ==========================================
   LIBERAR GIRASSOL FINAL
========================================== */


function checkFinal(){


if(openedLetters>=flowerMemories.length){


finalButton.classList.remove("hidden");


}



}





finalButton.addEventListener(
"click",
()=>{


gardenScreen.classList.remove("active");


finalScreen.classList.add("active");



});







/* ==========================================
   VOLTAR AO JARDIM
========================================== */


backGarden.addEventListener(
"click",
()=>{


finalScreen.classList.remove("active");


gardenScreen.classList.add("active");


});







/* ==========================================
   CONTADOR DESDE PRIMEIRA MENSAGEM
========================================== */



function updateCounter(){


const start=
new Date(
"2026-04-27T18:14:00"
);



const now=new Date();



const difference=
now-start;



const seconds=
Math.floor(
difference/1000
);



const days=
Math.floor(
seconds/(60*60*24)
);



const hours=
Math.floor(
(seconds%(60*60*24))
/(60*60)
);



const minutes=
Math.floor(
(seconds%(60*60))
/60
);



counter.innerHTML=

`${days} dias, ${hours} horas e ${minutes} minutos desde a primeira mensagem 💛`;



}



setInterval(
updateCounter,
1000
);


updateCounter();







/* ==========================================
   PARTÍCULAS DE LUZ
========================================== */


function createParticles(){



const container=
document.getElementById(
"particles"
);



for(let i=0;i<25;i++){


const particle=
document.createElement("div");



particle.classList.add(
"particle"
);



particle.style.left=
Math.random()*100+"%";



particle.style.top=
Math.random()*100+"%";



particle.style.animationDelay=
Math.random()*5+"s";



container.appendChild(
particle
);



}



}





/* ==========================================
   MÚSICA OPCIONAL
========================================== */


musicButton.addEventListener(
"click",
()=>{


if(!musicPlaying){


music.play();


musicButton.innerHTML="🔇";


musicPlaying=true;


}

else{


music.pause();


musicButton.innerHTML="🔊";


musicPlaying=false;


}



});
