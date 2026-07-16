/* =========================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT.JS FINAL
========================================= */



/* ===============================
   ELEMENTOS
================================ */


const introScreen = document.getElementById("introScreen");

const transitionScreen = document.getElementById("transitionScreen");

const gardenScreen = document.getElementById("gardenScreen");


const enterButton = document.getElementById("enterButton");


const flowersContainer = document.getElementById("flowersContainer");

const particlesContainer = document.getElementById("particlesContainer");

const windContainer = document.getElementById("windContainer");

const insectsContainer = document.getElementById("insectsContainer");



const letterModal = document.getElementById("letterModal");

const letterTitle = document.getElementById("letterTitle");

const letterText = document.getElementById("letterText");

const closeLetter = document.getElementById("closeLetter");



const counter = document.getElementById("relationshipCounter");


const finalMessage = document.getElementById("finalMessage");

const returnButton = document.getElementById("returnButton");





/* ===============================
   VERIFICAÇÃO DE SEGURANÇA
================================ */


console.log("🌻 Jardim carregado");



if(
!enterButton ||
!introScreen ||
!transitionScreen ||
!gardenScreen
){

console.error(
"Erro: elementos principais não encontrados"
);

}









/* ===============================
   CARTAS
================================ */


const cartas = [


{

titulo:"Seu cabelo",

texto:
"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço."

},


{

titulo:"Seus olhos",

texto:
"Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra."

},


{

titulo:"O seu sorriso",

texto:
"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto."

},


{

titulo:"Minha pitucha",

texto:
"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida."

},


{

titulo:"Quando você ri de mim",

texto:
"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."

},


{

titulo:"O jeito que você cuida",

texto:
"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar."

},


{

titulo:"Baixo, não guitarra",

texto:
"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava a diferença."

},


{

titulo:"A cartinha de girassol",

texto:
"Eu nunca vou esquecer da cartinha de girassol que você fez para mim. Ela mostra o carinho que você colocou nela."

},


{

titulo:"As nossas calls",

texto:
"Eu gosto muito dos nossos momentos simples, como nossas calls enquanto eu cozinhava e você ia me ensinando."

},


{

titulo:"As minhas piadinhas",

texto:
"Eu sei que às vezes faço uma piadinha e deixo você meio brava. Mas é meu jeito de brincar com você."

},


{

titulo:"O nosso caminho",

texto:
"A gente ainda é novo e tem muita coisa para viver. Mas eu quero passar por tudo isso com você."

}


];





let cartasAbertas = 0;







/* ===============================
   ENTRAR NO JARDIM
================================ */


enterButton.addEventListener(
"click",
()=>{


introScreen.classList.remove("active");


setTimeout(()=>{


transitionScreen.classList.add("active");


},600);



setTimeout(()=>{


transitionScreen.classList.remove("active");


gardenScreen.classList.add("active");



iniciarJardim();



},3000);



}

);









/* ===============================
   CRIAR FLORES
================================ */


function iniciarJardim(){


criarFlores();

criarParticulas();

criarInsetos();

criarVento();


}



function criarFlores(){



const flores = [

"🌹",
"🌷",
"🌼",
"🌸",
"💐",
"🌺"

];



for(let i=0;i<40;i++){



let flor =
document.createElement("div");



flor.className="flower";



flor.innerHTML =
flores[
Math.floor(
Math.random()*flores.length
)
];



let x =
Math.random()*80+10;


let y =
Math.random()*75+10;



flor.style.left=x+"%";

flor.style.top=y+"%";



flor.style.animationDelay=
(i*0.08)+"s";





if(i<11){



flor.classList.add(
"specialFlower"
);



flor.dataset.carta=i;



flor.addEventListener(
"click",
()=>abrirCarta(i)
);



}



flowersContainer.appendChild(flor);



}



}









/* ===============================
   CARTAS
================================ */


function abrirCarta(numero){



letterTitle.innerText =
cartas[numero].titulo;



letterText.innerText =
cartas[numero].texto;



letterModal.classList.remove(
"hidden"
);



if(
!cartas[numero].aberta
){


cartas[numero].aberta=true;


cartasAbertas++;


if(cartasAbertas===11){


setTimeout(()=>{


finalMessage.classList.remove(
"hidden"
);


},1000);


}


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









/* ===============================
   CONTADOR
================================ */


const inicio =
new Date(
"2026-04-27T18:14:00"
);



function atualizarContador(){



let agora =
new Date();



let tempo =
agora - inicio;



let dias =
Math.floor(
tempo /
86400000
);



let horas =
Math.floor(
tempo /
3600000
)%24;



let minutos =
Math.floor(
tempo /
60000
)%60;



counter.innerText =
`${dias} dias, ${horas} horas e ${minutos} minutos desde a primeira mensagem`;



}



setInterval(
atualizarContador,
1000
);


atualizarContador();









/* ===============================
   PARTICULAS
================================ */


function criarParticulas(){



for(let i=0;i<30;i++){



let p =
document.createElement("span");



p.innerHTML="✦";



p.style.left=
Math.random()*100+"%";



p.style.top=
Math.random()*100+"%";



particlesContainer.appendChild(p);



}



}









/* ===============================
   VENTO
================================ */


function criarVento(){



for(let i=0;i<6;i++){



let folha =
document.createElement("span");


folha.innerHTML="🍃";


folha.style.position="absolute";


folha.style.top=
Math.random()*90+"%";


folha.style.left="-20%";


folha.style.animation=
`windMove ${8+i}s linear infinite`;



windContainer.appendChild(folha);



}



}









/* ===============================
   INSETOS
================================ */


function criarInsetos(){



const insetos=[
"🦋",
"🐝",
"🐞"
];



for(let i=0;i<5;i++){



let inseto =
document.createElement("span");



inseto.innerHTML=
insetos[i%3];



inseto.style.position="absolute";


inseto.style.left=
Math.random()*80+"%";


inseto.style.top=
Math.random()*80+"%";


insectsContainer.appendChild(inseto);



}



}








/* ===============================
   VOLTAR AO JARDIM
================================ */


returnButton.addEventListener(
"click",
()=>{


finalMessage.classList.add(
"hidden"
);


}

);
