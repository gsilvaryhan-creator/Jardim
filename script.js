/* =====================================
   CONFIGURAÇÕES
===================================== */


const CONFIG = {

    startDate: new Date("2026-04-27T18:14:00"),

    normalFlowers: 40,

    specialFlowers: 11

};





/* =====================================
   ELEMENTOS
===================================== */


const intro = document.getElementById("intro");

const transition = document.getElementById("transition");

const garden = document.getElementById("garden");


const enterButton = document.getElementById("enterGarden");


const gardenArea = document.getElementById("gardenArea");


const specialContainer = document.getElementById("specialFlowers");


const particles = document.getElementById("particles");

const leaves = document.getElementById("leaves");



const letterOverlay =
document.getElementById("letterOverlay");


const letterTitle =
document.getElementById("letterTitle");


const letterMessage =
document.getElementById("letterMessage");


const closeLetter =
document.getElementById("closeLetter");



const musicButton =
document.getElementById("musicButton");


const music =
document.getElementById("backgroundMusic");



const finalMessage =
document.getElementById("finalMessage");


const backGarden =
document.getElementById("backGarden");





/* =====================================
   DADOS DAS CARTAS
===================================== */


const letters = [

{
title:"O seu sorriso 🌻",
message:
"Uma das coisas que mais gosto em você é o seu sorriso. Ele consegue deixar meus dias mais leves."
},


{
title:"Seu jeitinho 💛",
message:
"Eu gosto de cada detalhe seu, até aqueles pequenos que talvez você nem perceba."
},


{
title:"Nossa primeira mensagem 💌",
message:
"Foi ali que começou uma história que eu nunca imaginei que seria tão especial."
},


{
title:"Minha pequena 🌹",
message:
"Mesmo de longe, você consegue ser uma das pessoas mais importantes para mim."
},


{
title:"Seu carinho 🌷",
message:
"Seu jeito de cuidar, conversar e estar comigo significa muito."
},


{
title:"Momentos simples ✨",
message:
"Às vezes são as pequenas conversas que se tornam as maiores lembranças."
},


{
title:"Você é especial 🌻",
message:
"Entre tantas pessoas no mundo, eu fico feliz por ter encontrado você."
},


{
title:"Minha felicidade 💕",
message:
"Você consegue trazer alegria até nos dias mais comuns."
},


{
title:"Nosso jardim 🌱",
message:
"Esse jardim representa cada momento que estamos construindo juntos."
},


{
title:"Meu carinho por você ❤️",
message:
"Cada flor aqui representa um pedacinho do carinho que tenho por você."
},


{
title:"Obrigado por existir 🌹",
message:
"Obrigado por ser você e por fazer parte da minha vida."
}


];





/* =====================================
   ESTADO DO SITE
===================================== */


let openedLetters = 0;

let openedIndexes = [];





/* =====================================
   BOTÃO DE ENTRADA
===================================== */


enterButton.addEventListener("click",()=>{


    intro.style.opacity="0";


    setTimeout(()=>{


        intro.classList.add("hidden");


        transition.classList.remove("hidden");


        setTimeout(()=>{


            transition.classList.add("hidden");


            garden.classList.remove("hidden");


            createGarden();


        },3000);



    },800);



});






/* =====================================
   CRIAÇÃO DO JARDIM
===================================== */


function createGarden(){


    createNormalFlowers();


    createSpecialFlowers();


    createParticles();


    createLeaves();


}





/* =====================================
   FLORES NORMAIS
===================================== */


function createNormalFlowers(){


    const flowers = [

        "🌹",
        "🌷",
        "🌼",
        "💐",
        "🌿"

    ];



    for(let i=0;i<CONFIG.normalFlowers;i++){


        const flower =
        document.createElement("div");


        flower.className="flower";


        flower.innerHTML =
        flowers[
        Math.floor(Math.random()*flowers.length)
        ];



        const pos =
        safePosition();



        flower.style.left =
        pos.x+"%";


        flower.style.top =
        pos.y+"%";



        flower.style.animationDelay =
        (i*0.08)+"s";



        gardenArea.appendChild(flower);



    }


}





/* =====================================
   FLORES ESPECIAIS
===================================== */


function createSpecialFlowers(){


    for(let i=0;i<CONFIG.specialFlowers;i++){


        const flower =
        document.createElement("div");


        flower.className=
        "flower special-flower";


        flower.innerHTML="🌻";



        const pos =
        safePosition();



        flower.style.left =
        pos.x+"%";


        flower.style.top =
        pos.y+"%";



        flower.style.animationDelay =
        (i*0.2)+"s";



        flower.dataset.index=i;



        flower.addEventListener(
        "click",
        ()=>openLetter(i)
        );



        specialContainer.appendChild(flower);



    }



}






/* =====================================
   POSIÇÃO SEGURA
===================================== */


function safePosition(){


    return {


        x:
        Math.floor(
        Math.random()*75+10
        ),



        y:
        Math.floor(
        Math.random()*75+10
        )


    };


}






/* =====================================
   CARTAS
===================================== */


function openLetter(index){



    if(openedIndexes.includes(index))
    return;



    openedIndexes.push(index);



    letterTitle.innerText =
    letters[index].title;



    letterMessage.innerText =
    letters[index].message;



    letterOverlay.classList.remove("hidden");



}





closeLetter.addEventListener(
"click",
()=>{


    letterOverlay.classList.add("hidden");


    openedLetters++;



    if(openedLetters===CONFIG.specialFlowers){


        showFinal();


    }



});







/* =====================================
   CONTADOR
===================================== */


function updateCounter(){



    const now =
    new Date();



    const difference =
    now-CONFIG.startDate;



    const days =
    Math.floor(
    difference/
    (1000*60*60*24)
    );


    const hours =
    Math.floor(
    difference/
    (1000*60*60)
    )%24;



    const minutes =
    Math.floor(
    difference/
    (1000*60)
    )%60;



    document.getElementById("days")
    .innerText=days;


    document.getElementById("hours")
    .innerText=hours;


    document.getElementById("minutes")
    .innerText=minutes;


}



setInterval(updateCounter,1000);

updateCounter();






/* =====================================
   PARTÍCULAS
===================================== */


function createParticles(){


    for(let i=0;i<15;i++){


        const p =
        document.createElement("span");


        p.innerHTML="✨";


        p.style.position="absolute";


        p.style.left=
        Math.random()*90+"%";


        p.style.top=
        Math.random()*90+"%";


        p.style.animation=
        "sparkle 3s infinite";


        p.style.animationDelay=
        Math.random()*3+"s";



        particles.appendChild(p);


    }


}





/* =====================================
   FOLHAS
===================================== */


function createLeaves(){


    for(let i=0;i<8;i++){


        const leaf =
        document.createElement("span");


        leaf.innerHTML="🍃";


        leaf.style.position="absolute";


        leaf.style.left=
        Math.random()*100+"%";


        leaf.style.top=
        Math.random()*100+"%";


        leaf.style.animation=
        "floatingFlower 5s infinite";


        leaves.appendChild(leaf);


    }


}






/* =====================================
   MÚSICA
===================================== */


let playing=false;



musicButton.addEventListener("click",()=>{


    if(!playing){


        music.play();


        musicButton.innerHTML=
        "🔇 Pausar música";


    }else{


        music.pause();


        musicButton.innerHTML=
        "🔊 Música";


    }



    playing=!playing;


});






/* =====================================
   FINAL DO JARDIM
===================================== */


function showFinal(){


    finalMessage.classList.remove("hidden");


}





backGarden.addEventListener("click",()=>{


    finalMessage.classList.add("hidden");


});
