/* ==================================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT DEFINITIVO
================================================== */


document.addEventListener("DOMContentLoaded", iniciar);



function iniciar(){


console.log("🌻 Jardim iniciado");



/* ==========================
   ELEMENTOS
========================== */


const introScreen =
document.getElementById("introScreen");


const transitionScreen =
document.getElementById("transitionScreen");


const gardenScreen =
document.getElementById("gardenScreen");



const enterButton =
document.getElementById("enterButton");


const petal =
document.getElementById("petal");



const flowersContainer =
document.getElementById("flowersContainer");


const particlesContainer =
document.getElementById("particlesContainer");


const windContainer =
document.getElementById("windContainer");


const insectsContainer =
document.getElementById("insectsContainer");



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


const finalMessage =
document.getElementById("finalMessage");


const returnGarden =
document.getElementById("returnGarden");





/* ==========================
   VERIFICAÇÃO
========================== */


if(
!introScreen ||
!transitionScreen ||
!gardenScreen ||
!enterButton
){

console.error(
"Erro: elementos principais não encontrados"
);

return;

}







/* ==========================
   ESTADO
========================== */


let jardimAberto=false;

let cartasAbertas=0;

const totalCartas=11;








/* ==========================
   CARTAS
========================== */


const cartas=[


[
"Seu cabelo",
"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço."
],


[
"Seus olhos",
"Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra."
],


[
"O seu sorriso",
"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto."
],


[
"Minha pitucha",
"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida, não vejo minha rotina sem você."
],


[
"Quando você ri de mim",
"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."
],


[
"O jeito que você cuida",
"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas para muita gente, mas eu vejo e admiro muito em você."
],


[
"Baixo, não guitarra",
"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso."
],


[
"A cartinha de girassol",
"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela é linda, mas o que eu mais amo nela é saber que você separou um tempo e carinho para fazer algo pensando em mim."
],


[
"As nossas calls",
"Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia."
],


[
"As minhas piadinhas",
"Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é o meu jeito de brincar com você e criar momentos bobos."
],


[
"O nosso caminho",
"A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você."
]


];








/* ==========================
   ENTRADA DO JARDIM
========================== */


enterButton.onclick=function(){



if(jardimAberto){

return;

}



jardimAberto=true;



introScreen.classList.remove("active");



setTimeout(function(){



transitionScreen.classList.add("active");


petal.style.animation=
"petalFall 2s forwards";



},500);





setTimeout(function(){



transitionScreen.classList.remove("active");


gardenScreen.classList.add("active");



iniciarJardim();



},2500);



};









/* ==========================
   INICIAR JARDIM
========================== */


function iniciarJardim(){


criarFlores();


criarParticulas();


criarVento();


criarInsetos();


atualizarContador();


}









/* ==========================
   FLORES
========================== */


function criarFlores(){



let especiais=[];


while(especiais.length<11){


let n=
Math.floor(Math.random()*40);



if(!especiais.includes(n)){


especiais.push(n);


}



}






const tipos=[

"🌹",
"🌷",
"🌸",
"🌼",
"💐"

];





for(let i=0;i<40;i++){



const flor=
document.createElement("div");



flor.className="flower";



flor.innerHTML=
tipos[
Math.floor(
Math.random()*tipos.length
)
];



flor.style.left=
(10+Math.random()*75)+"%";



flor.style.top=
(10+Math.random()*75)+"%";



flor.style.animation=
`flowerBorn .8s forwards ${i*0.08}s`;





if(especiais.includes(i)){


flor.classList.add(
"special-flower"
);


flor.dataset.carta=
especiais.indexOf(i);



flor.onclick=function(){


abrirCarta(this);


};


}




flowersContainer.appendChild(flor);



}



   


}


/* ==========================
   CARTAS
========================== */


function abrirCarta(flor){


const indice =
Number(flor.dataset.carta);



letterTitle.innerText =
cartas[indice][0];



letterText.innerText =
cartas[indice][1];



letterModal.classList.remove(
"hidden"
);



if(!flor.dataset.lida){


flor.dataset.lida="true";


cartasAbertas++;



verificarFinal();


}



}






if(closeLetter){


closeLetter.onclick=function(){


letterModal.classList.add(
"hidden"
);


};


}








/* ==========================
   FINAL
========================== */


function verificarFinal(){


if(cartasAbertas===totalCartas){



setTimeout(function(){



finalMessage.classList.remove(
"hidden"
);



},1000);



}



}




if(returnGarden){


returnGarden.onclick=function(){


finalMessage.classList.add(
"hidden"
);


};


}









/* ==========================
   CONTADOR
========================== */


const primeiraMensagem =
new Date(
"2026-04-27T18:14:00"
);



function atualizarContador(){



const agora =
new Date();



const diferenca =
agora - primeiraMensagem;




const dias =
Math.floor(
diferenca /
(1000*60*60*24)
);



const horas =
Math.floor(
diferenca /
(1000*60*60)
)%24;



const minutos =
Math.floor(
diferenca /
(1000*60)
)%60;




counter.innerText =
`${dias} dias, ${horas} horas e ${minutos} minutos desde a primeira mensagem`;



}



setInterval(
atualizarContador,
1000
);









/* ==========================
   PARTICULAS
========================== */


function criarParticulas(){



for(let i=0;i<30;i++){



const brilho =
document.createElement("span");



brilho.innerHTML="✦";



brilho.style.position=
"absolute";



brilho.style.left=
Math.random()*100+"%";



brilho.style.top=
Math.random()*100+"%";



brilho.style.opacity=
Math.random();



brilho.style.fontSize=
"14px";



particlesContainer.appendChild(
brilho
);



}



}









/* ==========================
   VENTO
========================== */


function criarVento(){



for(let i=0;i<8;i++){



const folha =
document.createElement("span");



folha.innerHTML="🍃";



folha.style.position=
"absolute";



folha.style.left=
"-10%";



folha.style.top=
Math.random()*90+"%";



folha.style.animation=
`windMove ${8+i}s linear infinite`;



windContainer.appendChild(
folha
);



}



}









/* ==========================
   INSETOS
========================== */


function criarInsetos(){



const lista=[

"🦋",
"🐞",
"🐝"

];




for(let i=0;i<4;i++){



const inseto =
document.createElement("span");



inseto.innerHTML =
lista[
i % lista.length
];



inseto.style.position=
"absolute";



inseto.style.left=
Math.random()*80+"%";



inseto.style.top=
Math.random()*80+"%";



inseto.style.fontSize=
"25px";



inseto.style.animation=
"float 5s infinite";



insectsContainer.appendChild(
inseto
);



}


}







console.log(
"🌻 Todos os sistemas carregados"
);



}
