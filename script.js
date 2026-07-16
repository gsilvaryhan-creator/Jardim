/* =====================================
   CONFIGURAÇÕES
===================================== */


const startDate = new Date("2026-04-27T18:14:00");


let openedLetters = new Set();

let gardenStarted = false;






/* =====================================
   ELEMENTOS
===================================== */


const intro = document.getElementById("intro");

const transition = document.getElementById("transition");

const gardenScreen = document.getElementById("gardenScreen");


const enterButton = document.getElementById("enterGarden");


const garden = document.getElementById("garden");


const modal = document.getElementById("letterModal");

const letterTitle = document.getElementById("letterTitle");

const letterText = document.getElementById("letterText");

const closeLetter = document.getElementById("closeLetter");


const counter = document.getElementById("counter");


const finalSunflower = document.getElementById("finalSunflower");

const finalMessage = document.getElementById("finalMessage");


const backGarden = document.getElementById("backGarden");






/* =====================================
   CARTAS
===================================== */


const letters = [


{
title:"Seu cabelo",
text:"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço."
},


{
title:"Seus olhos",
text:"Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra."
},


{
title:"O seu sorriso",
text:"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto."
},


{
title:"Minha pitucha",
text:"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida."
},


{
title:"Quando você ri de mim",
text:"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."
},


{
title:"O jeito que você cuida",
text:"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas, mas eu vejo e admiro muito em você."
},


{
title:"Baixo, não guitarra",
text:"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso."
},


{
title:"A cartinha de girassol",
text:"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda porque você separou tempo e carinho pensando em mim."
},


{
title:"As nossas calls",
text:"Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia."
},


{
title:"As minhas piadinhas",
text:"Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é meu jeito de brincar com você e criar momentos bobos."
},


{
title:"O nosso caminho",
text:"A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você."
}


];








/* =====================================
   BOTÃO ENTRAR
===================================== */


enterButton.addEventListener("click",()=>{


    if(gardenStarted) return;


    gardenStarted=true;



    intro.style.opacity="0";


    setTimeout(()=>{


        intro.classList.add("hidden");


        transition.classList.remove("hidden");


        setTimeout(()=>{


            transition.classList.add("hidden");


            gardenScreen.classList.remove("hidden");


            createGarden();



        },3000);



    },1000);



});








/* =====================================
   CRIAÇÃO DO JARDIM
===================================== */


function createGarden(){


    createFlowers();


    createParticles();


    createLeaves();


    updateCounter();


    setInterval(updateCounter,1000);


}







/* =====================================
   FLORES
===================================== */


function createFlowers(){



    const normalFlowers=[

        "🌷",
        "🌹",
        "🌼",
        "🌸",
        "💐",
        "🪻"

    ];



    for(let i=0;i<40;i++){


        let flower=document.createElement("div");


        flower.className="flower";


        flower.innerHTML=
        normalFlowers[
        Math.floor(Math.random()*normalFlowers.length)
        ];



        placeFlower(flower);



        flower.style.animationDelay=
        `${i*0.08}s`;



        garden.appendChild(flower);


    }





    letters.forEach((letter,index)=>{


        let flower=document.createElement("div");


        flower.className=
        "flower special-flower";


        flower.dataset.id=index;



        flower.innerHTML="🌹";



        placeFlower(flower);



        flower.style.animationDelay=
        `${index*0.15}s`;



        flower.addEventListener("click",()=>{

            openLetter(index);

        });



        garden.appendChild(flower);



    });



}









/* =====================================
   POSIÇÃO SEGURA DAS FLORES
===================================== */


function placeFlower(element){


    let x=Math.random()*75+10;

    let y=Math.random()*75+10;



    element.style.left=x+"%";

    element.style.top=y+"%";


}









/* =====================================
   CARTAS
===================================== */


function openLetter(index){


    openedLetters.add(index);



    letterTitle.textContent=
    letters[index].title;


    letterText.textContent=
    letters[index].text;



    modal.classList.remove("hidden");



    if(openedLetters.size===letters.length){


        setTimeout(showFinal,1000);


    }


}






closeLetter.addEventListener("click",()=>{


    modal.classList.add("hidden");


});







/* =====================================
   GIRASSOL FINAL
===================================== */


function showFinal(){


    finalSunflower.classList.remove("hidden");


    setTimeout(()=>{


        finalMessage.classList.remove("hidden");


    },2000);



}








backGarden.addEventListener("click",()=>{


    finalMessage.classList.add("hidden");


});








/* =====================================
   CONTADOR
===================================== */


function updateCounter(){


    let now=new Date();


    let diff=
    now-startDate;



    let seconds=
    Math.floor(diff/1000);



    let days=
    Math.floor(seconds/86400);



    seconds%=86400;



    let hours=
    Math.floor(seconds/3600);



    seconds%=3600;



    let minutes=
    Math.floor(seconds/60);



    counter.textContent=
    `${days} dias, ${hours} horas e ${minutes} minutos desde a primeira mensagem`;



}







/* =====================================
   PARTÍCULAS
===================================== */


function createParticles(){


    const area=
    document.getElementById("particles");


    for(let i=0;i<20;i++){


        let p=document.createElement("div");


        p.className="particle";


        p.style.left=
        Math.random()*100+"%";


        p.style.animationDuration=
        (5+Math.random()*10)+"s";


        area.appendChild(p);


    }


}








/* =====================================
   FOLHAS
===================================== */


function createLeaves(){


    const area=
    document.getElementById("windLeaves");



    for(let i=0;i<5;i++){


        let leaf=document.createElement("div");


        leaf.className="leaf";


        leaf.innerHTML="🍃";


        leaf.style.top=
        Math.random()*80+"%";


        leaf.style.animationDelay=
        i+"s";



        area.appendChild(leaf);



    }


}
