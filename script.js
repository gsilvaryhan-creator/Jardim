/* =====================================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT PRINCIPAL
===================================================== */



/* =====================================================
   ELEMENTOS
===================================================== */


const introScreen = document.getElementById("introScreen");
const enterButton = document.getElementById("enterButton");

const transitionScreen = document.getElementById("transitionScreen");

const gardenScreen = document.getElementById("gardenScreen");

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


const finalScreen =
document.getElementById("finalScreen");


const returnButton =
document.getElementById("returnButton");




/* =====================================================
   CARTAS
===================================================== */


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
text:"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida, não vejo minha rotina sem você."
},

{
title:"Quando você ri de mim",
text:"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."
},

{
title:"O jeito que você cuida",
text:"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas para muita gente, mas eu vejo e admiro muito em você."
},

{
title:"Baixo, não guitarra",
text:"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso. Até hoje acho engraçado lembrar disso, porque foi uma das nossas primeiras brincadeiras."
},

{
title:"A cartinha de girassol",
text:"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda, mas o que eu mais amo nela é saber que você separou um tempo e carinho para fazer algo pensando em mim."
},

{
title:"As nossas calls",
text:"Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia."
},

{
title:"As minhas piadinhas",
text:"Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é o meu jeito de brincar com você e criar momentos bobos."
},

{
title:"O nosso caminho",
text:"A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você."
}

];





/* =====================================================
   ESTADO DO SITE
===================================================== */


let openedLetters = 0;

let opened = [];

let gardenStarted = false;




/* =====================================================
   ENTRAR NO JARDIM
===================================================== */


if(enterButton){


enterButton.addEventListener("click",()=>{


if(gardenStarted) return;


gardenStarted = true;



introScreen.classList.add("hidden");



transitionScreen.classList.remove("hidden");



setTimeout(()=>{


transitionScreen.classList.add("hidden");


gardenScreen.classList.remove("hidden");


createFlowers();



},3000);



});


}







/* =====================================================
   CRIAÇÃO DAS FLORES
===================================================== */


function createFlowers(){


if(!flowersContainer) return;



const normalFlowers=[

"🌷",
"🌹",
"🌼",
"🌸",
"💮",
"🪻"

];


for(let i=0;i<40;i++){


let flower=document.createElement("div");


flower.classList.add("flower");


flower.innerHTML=
normalFlowers[
Math.floor(
Math.random()*normalFlowers.length
)
];



let x =
Math.random()*75+10;


let y =
Math.random()*75+10;



flower.style.left=x+"%";

flower.style.top=y+"%";



flower.style.animationDelay=
(i*0.08)+"s";



flowersContainer.appendChild(flower);



}




createSpecialFlowers();



}






/* =====================================================
   FLORES DAS CARTAS
===================================================== */


function createSpecialFlowers(){


letters.forEach((item,index)=>{


let flower =
document.createElement("div");



flower.classList.add(
"flower",
"special-flower"
);



flower.innerHTML="🌹";



flower.style.left =
(10 + index*7)%80 + "%";


flower.style.top =
(15 + index*5)%75 + "%";



flower.style.animationDelay=
(index*0.2)+"s";



flower.addEventListener(
"click",
()=>openLetter(index)
);



flowersContainer.appendChild(flower);



});



}






/* =====================================================
   ABRIR CARTAS
===================================================== */


function openLetter(index){


if(!letterModal) return;



letterTitle.innerText =
letters[index].title;


letterText.innerText =
letters[index].text;



letterModal.classList.remove(
"hidden"
);



if(!opened.includes(index)){


opened.push(index);

openedLetters++;



checkFinal();


}


}







if(closeLetter){


closeLetter.addEventListener(
"click",
()=>{


letterModal.classList.add(
"hidden"
);


});


}






/* =====================================================
   FINAL
===================================================== */


function checkFinal(){


if(openedLetters===11){


setTimeout(()=>{


if(finalSunflower){

finalSunflower.classList.remove(
"hidden"
);

}


},500);



}

}








/* =====================================================
   CONTADOR
===================================================== */


function updateCounter(){


if(!counter)return;



const start =
new Date(
"2026-04-27T18:14:00"
);



const now =
new Date();



let diff =
now-start;



if(diff<0){

counter.innerText=
"Em breve...";

return;

}



let minutes =
Math.floor(diff/60000);



let hours =
Math.floor(minutes/60);



let days =
Math.floor(hours/24);



minutes%=60;

hours%=24;



counter.innerText =

`${days} dias, ${hours} horas e ${minutes} minutos desde a primeira mensagem`;



}



setInterval(
updateCounter,
1000
);


updateCounter();








/* =====================================================
   VOLTAR AO JARDIM
===================================================== */


if(returnButton){


returnButton.addEventListener(
"click",
()=>{


finalScreen.classList.add(
"hidden"
);



gardenScreen.classList.remove(
"hidden"
);



});


}
