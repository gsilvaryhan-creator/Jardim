/* ==========================================
   CONFIGURAÇÕES INICIAIS
========================================== */


document.addEventListener("DOMContentLoaded", () => {



/* ==========================================
   ELEMENTOS PRINCIPAIS
========================================== */


const intro = document.getElementById("intro");

const enterGarden = document.getElementById("enterGarden");

const transition = document.getElementById("transition");

const garden = document.getElementById("garden");

const flowersContainer = document.getElementById("flowersContainer");

const counter = document.getElementById("counter");

const letterModal = document.getElementById("letterModal");

const letterTitle = document.getElementById("letterTitle");

const letterMessage = document.getElementById("letterMessage");

const closeLetter = document.getElementById("closeLetter");

const finalPage = document.getElementById("finalPage");

const returnGarden = document.getElementById("returnGarden");

const finalFlower = document.getElementById("finalFlower");



/*
Proteção contra elementos inexistentes
*/

if(!intro || !garden){

    console.error(
        "Elementos principais não encontrados."
    );

    return;

}



/* ==========================================
   CARTAS
========================================== */


const letters = [

{
title:"Seu cabelo",
message:
"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço."
},

{
title:"Seus olhos",
message:
"Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra."
},

{
title:"O seu sorriso",
message:
"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto."
},

{
title:"Minha pitucha",
message:
"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida, não vejo minha rotina sem você."
},

{
title:"Quando você ri de mim",
message:
"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."
},

{
title:"O jeito que você cuida",
message:
"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas para muita gente, mas eu vejo e admiro muito em você."
},

{
title:"Baixo, não guitarra",
message:
"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso. Até hoje acho engraçado lembrar disso, porque foi uma das nossas primeiras brincadeiras."
},

{
title:"A cartinha de girassol",
message:
"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda, mas o que eu mais amo nela é saber que você separou um tempo e carinho para fazer algo pensando em mim."
},

{
title:"As nossas calls",
message:
"Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia."
},

{
title:"As minhas piadinhas",
message:
"Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é o meu jeito de brincar com você e criar momentos bobos."
},

{
title:"O nosso caminho",
message:
"A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você."
}

];





let openedLetters = 0;





/* ==========================================
   ENTRAR NO JARDIM
========================================== */


if(enterGarden){


enterGarden.addEventListener(
"click",
()=>{


intro.style.opacity="0";


setTimeout(()=>{


intro.classList.add("hidden");


transition.classList.remove("hidden");



setTimeout(()=>{


transition.classList.add("hidden");

garden.classList.remove("hidden");


createFlowers();

createParticles();



},3000);



},1000);



});


}





/* ==========================================
   CRIAÇÃO DAS FLORES
========================================== */


function createFlowers(){


if(!flowersContainer)return;



const flowerTypes=[

"🌹",
"🌷",
"🌸",
"🌼",
"💐",
"🌺"

];



let specialPositions=[

2,6,10,13,17,20,
24,28,31,35,38

];



for(let i=0;i<40;i++){


const flower=document.createElement("div");


flower.classList.add("flower");



let randomFlower =
flowerTypes[
Math.floor(Math.random()*flowerTypes.length)
];


flower.innerHTML=randomFlower;



flower.style.left =
(10 + Math.random()*75)+"%";


flower.style.top =
(10 + Math.random()*75)+"%";



flower.style.animationDelay =
(i*80)+"ms";



if(
specialPositions.includes(i)
){


flower.classList.add(
"special-flower"
);


let letterIndex =
specialPositions.indexOf(i);



flower.dataset.letter =
letterIndex;



flower.addEventListener(
"click",
()=>{

openLetter(letterIndex);

}

);


}



flowersContainer.appendChild(flower);



}


}








/* ==========================================
   ABRIR CARTA
========================================== */


function openLetter(index){


if(!letters[index])return;



letterTitle.textContent =
letters[index].title;


letterMessage.textContent =
letters[index].message;



letterModal.classList.remove(
"hidden"
);



openedLetters++;



if(openedLetters>=letters.length){

setTimeout(showFinal,1500);

}



}






if(closeLetter){


closeLetter.addEventListener(
"click",
()=>{

letterModal.classList.add(
"hidden"
);

}

);


}







/* ==========================================
   FINAL
========================================== */


function showFinal(){


garden.classList.add(
"hidden"
);


finalPage.classList.remove(
"hidden"
);



if(finalFlower){

finalFlower.style.animation =
"finalBloom 2s infinite alternate";

}


}






if(returnGarden){


returnGarden.addEventListener(
"click",
()=>{


finalPage.classList.add(
"hidden"
);


garden.classList.remove(
"hidden"
);



}

);


}







/* ==========================================
   CONTADOR
========================================== */


function updateCounter(){


const start =
new Date(
"2026-04-27T18:14:00"
);



const now =
new Date();



const diff =
now-start;



if(diff<0)return;



const seconds =
Math.floor(diff/1000);



const days =
Math.floor(seconds/(60*60*24));


const hours =
Math.floor(
(seconds%(60*60*24))/(60*60)
);


const minutes =
Math.floor(
(seconds%(60*60))/60
);



counter.innerHTML =

`${days} dias, ${hours} horas e ${minutes} minutos desde a primeira mensagem ❤️`;



}



updateCounter();


setInterval(
updateCounter,
60000
);








/* ==========================================
   PARTÍCULAS
========================================== */


function createParticles(){


const area =
document.getElementById(
"particles"
);


if(!area)return;



for(let i=0;i<25;i++){


let p=document.createElement(
"span"
);


p.classList.add(
"particle"
);



p.style.left =
Math.random()*100+"%";


p.style.animationDelay =
Math.random()*5+"s";



area.appendChild(p);


}


}






});
