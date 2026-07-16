/* =====================================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT COMPLETO
===================================================== */


/* ===============================
   ELEMENTOS
================================ */


const intro = document.querySelector("#intro");

const enterButton =
document.querySelector("#enterGarden");


const transition =
document.querySelector("#transition");


const garden =
document.querySelector("#garden");


const flowersContainer =
document.querySelector("#flowersContainer");


const letterModal =
document.querySelector("#letterModal");


const letterTitle =
document.querySelector("#letterTitle");


const letterMessage =
document.querySelector("#letterMessage");


const closeLetter =
document.querySelector("#closeLetter");


const counter =
document.querySelector("#counter");


const finalPage =
document.querySelector("#finalPage");


const finalFlower =
document.querySelector("#finalFlower");


const returnButton =
document.querySelector("#returnGarden");







/* ===============================
   ESTADO
================================ */


let gardenStarted = false;


let openedLetters = [];









/* ===============================
   CARTAS
================================ */


const letters = [

{
title:"Seu cabelo",
text:"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem precisar fazer esforço."
},


{
title:"Seus olhos",
text:"Os seus olhos são grandes e brilhantes. Às vezes eu paro para olhar e penso em como eles conseguem mostrar tanta coisa sem dizer uma palavra."
},


{
title:"O seu sorriso",
text:"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o dia fica melhor junto."
},


{
title:"Minha pitucha",
text:"Eu acho muito fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigante na minha vida."
},


{
title:"Quando você ri de mim",
text:"Eu gosto quando você ri das coisas que eu falo. Até uma piada ruim fica melhor quando você ri."
},


{
title:"O jeito que você cuida",
text:"Eu percebo como você se importa, presta atenção e tenta ajudar. Eu admiro muito isso em você."
},


{
title:"Baixo, não guitarra",
text:"Eu nunca esqueço quando você confundia baixo com guitarra e colocava a culpa no corretor. Virou uma lembrança muito nossa."
},


{
title:"A cartinha de girassol",
text:"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. O carinho por trás dela é o que torna ela especial."
},


{
title:"As nossas calls",
text:"Eu amo nossos momentos simples, nossas conversas e as vezes que ficávamos juntos mesmo de longe."
},


{
title:"As minhas piadinhas",
text:"Mesmo quando eu faço alguma piadinha e você fica brava, é meu jeito de criar momentos com você."
},


{
title:"O nosso caminho",
text:"A gente ainda tem muita coisa para viver. Eu quero continuar descobrindo tudo isso com você."
}


];









/* ===============================
   ENTRAR NO JARDIM
================================ */


if(enterButton){


enterButton.onclick = function(){


if(gardenStarted)
return;


gardenStarted = true;



if(intro)
intro.classList.add("hidden");



if(transition)
transition.classList.remove("hidden");




setTimeout(()=>{


if(transition)
transition.classList.add("hidden");


if(garden)
garden.classList.remove("hidden");



createFlowers();



},3000);



};


}









/* ===============================
   CRIAR FLORES
================================ */


function createFlowers(){



if(!flowersContainer)
return;



// flores normais

for(let i=0;i<30;i++){


createFlower(false);


}



// flores especiais

letters.forEach(
(item,index)=>{


createFlower(true,index);


});


}









function createFlower(special,index){



const flower =
document.createElement("div");



flower.classList.add("flower");




let x =
Math.random()*75+10;


let y =
Math.random()*70+10;



flower.style.left =
x+"%";


flower.style.top =
y+"%";




if(special){



flower.classList.add(
"special-flower"
);



flower.dataset.id=index;



flower.onclick=function(){


openLetter(index);


};



}



flowersContainer.appendChild(
flower
);



}









/* ===============================
   ABRIR CARTA
================================ */


function openLetter(index){



if(!letterModal)
return;



letterTitle.textContent =
letters[index].title;



letterMessage.textContent =
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


closeLetter.onclick=function(){


letterModal.classList.add(
"hidden"
);


};


}









/* ===============================
   FINAL
================================ */


function checkFinal(){



if(openedLetters.length === letters.length){



setTimeout(()=>{


if(finalPage)
finalPage.classList.remove("hidden");



if(finalFlower)
finalFlower.classList.remove("hidden");



},1000);



}


}









/* ===============================
   CONTADOR
================================ */


function updateCounter(){



if(!counter)
return;



const start =
new Date(
"2026-04-27T18:14:00"
);



const now =
new Date();



const diff =
now-start;



if(diff<0){

counter.textContent=
"Começando em breve";

return;

}




const minutes =
Math.floor(diff/60000);



const days =
Math.floor(minutes/(60*24));



const hours =
Math.floor(
(minutes/60)%24
);



const mins =
minutes%60;



counter.textContent =

`${days} dias, ${hours} horas e ${mins} minutos`;



}



updateCounter();


setInterval(
updateCounter,
1000
);









/* ===============================
   VOLTAR AO JARDIM
================================ */


if(returnButton){


returnButton.onclick=function(){



if(finalPage)
finalPage.classList.add("hidden");



if(garden)
garden.classList.remove("hidden");



};



}
