console.log("SCRIPT FUNCIONANDO");
/* =====================================================
   O JARDIM ONDE VOCÊ FLORESCE
   Script principal
===================================================== */



/* =====================================================
   CONFIGURAÇÕES
===================================================== */


const FIRST_MESSAGE_DATE = new Date(
    "2026-04-27T18:14:00"
);



const TOTAL_SPECIAL_FLOWERS = 11;



let openedLetters = 0;

let gardenStarted = false;





/* =====================================================
   ELEMENTOS
===================================================== */


const introScreen =
document.getElementById("introScreen");


const transitionScreen =
document.getElementById("petalTransition");


const gardenScreen =
document.getElementById("gardenScreen");



const enterButton =
document.getElementById("enterGarden");



const flowersContainer =
document.getElementById("flowersContainer");



const letterModal =
document.getElementById("letterModal");



const letterTitle =
document.getElementById("letterTitle");



const letterText =
document.getElementById("letterText");



const closeLetter =
document.getElementById("closeLetter");



const counter =
document.getElementById("counter");



const finalSunflower =
document.getElementById("finalSunflower");



const backGarden =
document.getElementById("backGarden");



const musicButton =
document.getElementById("musicButton");



const music =
document.getElementById("backgroundMusic");








/* =====================================================
   CARTAS
===================================================== */


const letters = [


{
title:"Seu cabelo",
text:
"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço."
},



{
title:"Seus olhos",
text:
"Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra."
},



{
title:"O seu sorriso",
text:
"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto."
},



{
title:"Minha pitucha",
text:
"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida."
},



{
title:"Quando você ri de mim",
text:
"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."
},



{
title:"O jeito que você cuida",
text:
"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas, mas eu vejo e admiro muito em você."
},



{
title:"Baixo, não guitarra",
text:
"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso."
},



{
title:"A cartinha de girassol",
text:
"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda, mas o que eu mais amo é saber que você separou tempo pensando em mim."
},



{
title:"As nossas calls",
text:
"Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia."
},



{
title:"As minhas piadinhas",
text:
"Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é o meu jeito de brincar com você e criar momentos bobos."
},



{
title:"O nosso caminho",
text:
"A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você."
}


];







/* =====================================================
   ENTRADA DO JARDIM
===================================================== */


enterButton.addEventListener(
"click",
startGarden
);



function startGarden(){


    if(gardenStarted)
    return;


    gardenStarted = true;



    introScreen.classList.remove("active");



    setTimeout(()=>{


        transitionScreen.classList.add("active");


        startPetal();


    },800);





    setTimeout(()=>{


        transitionScreen.classList.remove("active");


        gardenScreen.classList.add("active");



        createGarden();



    },2500);



}







/* =====================================================
   PÉTALA
===================================================== */


function startPetal(){


const petal =
document.querySelector(".falling-petal");


petal.style.animation =
"petalFall 2s forwards";


}







/* =====================================================
   CRIAÇÃO DO JARDIM
===================================================== */


function createGarden(){


    createFlowers();

    createParticles();


}








/* =====================================================
   FLORES
===================================================== */


function createFlowers(){



    let specialIndexes =
    generateSpecialPositions();



    for(let i=0;i<40;i++){



        const flower =
        document.createElement("div");



        flower.classList.add(
            "flower"
        );



        const isSpecial =
        specialIndexes.includes(i);



        if(isSpecial){

            flower.classList.add(
                "special-flower"
            );

            const letterIndex =
            specialIndexes.indexOf(i);


            flower.dataset.letter =
            letterIndex;


        }



        flower.innerHTML =
        randomFlower();



        const position =
        safePosition();



        flower.style.left =
        position.x+"%";


        flower.style.top =
        position.y+"%";



        flower.style.animationDelay =
        (i*0.08)+"s";



        if(isSpecial){


            flower.addEventListener(
                "click",
                openLetter
            );


        }



        flowersContainer.appendChild(
            flower
        );



    }



}





function randomFlower(){


const flowers=[

"🌹",
"🌷",
"🌸",
"🌼",
"💐"

];


return flowers[
Math.floor(
Math.random()*flowers.length
)
];


}







function safePosition(){


return{


x:
Math.random()*75+10,


y:
Math.random()*70+10


};


}








function generateSpecialPositions(){


let positions=[];


while(
positions.length<TOTAL_SPECIAL_FLOWERS
){


let number =
Math.floor(
Math.random()*40
);



if(
!positions.includes(number)
){

positions.push(number);

}


}


return positions;


}







/* =====================================================
   CARTAS
===================================================== */


function openLetter(){



const index =
Number(this.dataset.letter);



letterTitle.innerText =
letters[index].title;



letterText.innerText =
letters[index].text;



letterModal.classList.remove(
"hidden"
);



if(
!this.dataset.opened
){


this.dataset.opened=true;


openedLetters++;



checkFinal();


}



}






closeLetter.addEventListener(
"click",
()=>{


letterModal.classList.add(
"hidden"
);


}

);









/* =====================================================
   FINAL
===================================================== */


function checkFinal(){


if(
openedLetters === TOTAL_SPECIAL_FLOWERS
){


setTimeout(()=>{


finalSunflower.classList.remove(
"hidden"
);


},500);


}


}






backGarden.addEventListener(
"click",
()=>{


finalSunflower.classList.add(
"hidden"
);


}

);









/* =====================================================
   CONTADOR
===================================================== */


function updateCounter(){



const now =
new Date();



const difference =
now-FIRST_MESSAGE_DATE;



const minutes =
Math.floor(
difference/1000/60
)%60;



const hours =
Math.floor(
difference/1000/60/60
)%24;



const days =
Math.floor(
difference/1000/60/60/24
);




counter.innerText =
`${days} dias, ${hours} horas e ${minutes} minutos desde a primeira mensagem`;



}



setInterval(
updateCounter,
1000
);


updateCounter();








/* =====================================================
   MÚSICA
===================================================== */


let playing=false;



musicButton.addEventListener(
"click",
()=>{


if(!playing){


music.play();


musicButton.innerHTML =
"🔇 Pausar música";


}

else{


music.pause();


musicButton.innerHTML =
"🔊 Música";


}


playing=!playing;



});









/* =====================================================
   PARTÍCULAS
===================================================== */


function createParticles(){


const container =
document.getElementById(
"particlesContainer"
);



for(
let i=0;i<25;i++
){


const particle =
document.createElement("span");


particle.innerHTML="✦";


particle.style.position="absolute";


particle.style.left =
Math.random()*100+"%";


particle.style.top =
Math.random()*100+"%";


particle.style.opacity =
Math.random();



container.appendChild(
particle
);


}


}
