/* =====================================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT COMPLETO
===================================================== */



/* ===============================
   PEGAR ELEMENTOS
================================ */


const intro = document.getElementById("intro");

const enterGarden =
document.getElementById("enterGarden");


const transition =
document.getElementById("transition");


const garden =
document.getElementById("garden");


const flowersContainer =
document.getElementById("flowersContainer");


const counter =
document.getElementById("counter");


const letterModal =
document.getElementById("letterModal");


const letterTitle =
document.getElementById("letterTitle");


const letterMessage =
document.getElementById("letterMessage");


const closeLetter =
document.getElementById("closeLetter");


const finalFlower =
document.getElementById("finalFlower");


const finalPage =
document.getElementById("finalPage");


const returnGarden =
document.getElementById("returnGarden");





/* ===============================
   VARIÁVEIS
================================ */


let gardenOpened = false;

let openedLetters = [];





/* ===============================
   CARTAS
================================ */


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
text:"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é perfeita, sua risada faz valer a pena."
},


{
title:"O jeito que você cuida",
text:"Eu percebo como você é prestativa. Você se importa, presta atenção e tenta ajudar. Eu admiro muito isso em você."
},


{
title:"Baixo, não guitarra",
text:"No começo você sempre trocava baixo por guitarra e colocava a culpa no corretor. Até hoje acho engraçado lembrar disso."
},


{
title:"A cartinha de girassol",
text:"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. O mais bonito é saber que você dedicou tempo pensando em mim."
},


{
title:"As nossas calls",
text:"Eu gosto muito dos nossos momentos simples, como nossas calls enquanto eu cozinhava e você ia me ensinando coisas."
},


{
title:"As minhas piadinhas",
text:"Eu sei que às vezes faço piadinhas e deixo você brava, mas é meu jeito de criar momentos bobos com você."
},


{
title:"O nosso caminho",
text:"A gente ainda tem muita coisa para viver. Mas eu quero passar por tudo isso com você."
}

];








/* ===============================
   BOTÃO ENTRAR
================================ */


if(enterGarden){


enterGarden.addEventListener(
"click",
()=>{


if(gardenOpened) return;


gardenOpened=true;



intro.classList.add("hidden");



transition.classList.remove("hidden");



setTimeout(()=>{


transition.classList.add("hidden");


garden.classList.remove("hidden");


createFlowers();



},3000);



}

);


}









/* ===============================
   CRIAR FLORES
================================ */


function createFlowers(){


if(!flowersContainer)
return;



// flores normais

for(let i=0;i<29;i++){


createFlower(false,i);


}




// flores das cartas

letters.forEach(
(letter,index)=>{


createFlower(true,index);


}

);



}






function createFlower(special,index){



const flower =
document.createElement("div");



flower.classList.add("flower");



if(special){

flower.classList.add(
"special-flower"
);


flower.dataset.id=index;


flower.addEventListener(
"click",
()=>openLetter(index)
);


}




// posição segura

let left =
Math.random()*75+10;


let top =
Math.random()*70+10;



flower.style.left =
left+"%";


flower.style.top =
top+"%";



flower.style.animationDelay =
(index*0.08)+"s";



flowersContainer.appendChild(
flower
);



}









/* ===============================
   ABRIR CARTAS
================================ */


function openLetter(index){



if(!letterModal)
return;



letterTitle.innerText =
letters[index].title;



letterMessage.innerText =
letters[index].text;



letterModal.classList.remove(
"hidden"
);





if(!openedLetters.includes(index)){


openedLetters.push(index);


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



}

);


}








/* ===============================
   FINAL
================================ */


function checkFinal(){


if(openedLetters.length===11){



setTimeout(()=>{


if(finalFlower){


finalFlower.classList.remove(
"hidden"
);


}



},700);



}

}








/* ===============================
   CONTADOR
================================ */


function updateCounter(){



if(!counter)
return;



const firstMessage =
new Date(
"2026-04-27T18:14:00"
);



const now =
new Date();



let difference =
now-firstMessage;



if(difference<0){


counter.innerText=
"Ainda não começou";


return;


}




let totalMinutes =
Math.floor(
difference/60000
);



let days =
Math.floor(
totalMinutes/(60*24)
);



let hours =
Math.floor(
(totalMinutes/60)%24
);



let minutes =
totalMinutes%60;



counter.innerText =

`${days} dias, ${hours} horas e ${minutes} minutos`;



}



setInterval(
updateCounter,
1000
);


updateCounter();









/* ===============================
   VOLTAR AO JARDIM
================================ */


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
