/* ==================================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT DEFINITIVO
================================================== */


/* ==========================
   ELEMENTOS
========================== */


const introScreen = document.getElementById("introScreen");

const transitionScreen = document.getElementById("transitionScreen");

const gardenScreen = document.getElementById("gardenScreen");


const enterButton = document.getElementById("enterButton");


const petal = document.getElementById("petal");


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
   ESTADO
========================== */


let gardenOpened = false;

let lettersOpened = 0;

const totalLetters = 11;









/* ==========================
   CARTAS
========================== */


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
text:"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso."
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









/* ==========================
   BOTÃO PRINCIPAL
========================== */


enterButton.onclick = entrarNoJardim;






function entrarNoJardim(){


    if(gardenOpened){

        return;

    }


    gardenOpened = true;



    introScreen.classList.remove("active");



    setTimeout(()=>{


        transitionScreen.classList.add("active");


        iniciarPetala();


    },400);




    setTimeout(()=>{


        transitionScreen.classList.remove("active");


        gardenScreen.classList.add("active");



        iniciarJardim();



    },2500);



}









/* ==========================
   PETALA
========================== */


function iniciarPetala(){


    petal.style.animation =
    "petalFall 2s forwards";


}









/* ==========================
   INICIAR JARDIM
========================== */


function iniciarJardim(){


    criarFlores();


    criarParticulas();


    criarVento();


    criarInsetos();


}








/* ==========================
   FLORES
========================== */


function criarFlores(){



    let especiais =
    escolherFloresEspeciais();



    for(let i=0;i<40;i++){



        const flower =
        document.createElement("div");



        flower.className="flower";



        flower.innerHTML =
        escolherFlor();



        const posicao =
        posicaoSegura();



        flower.style.left =
        posicao.x+"%";


        flower.style.top =
        posicao.y+"%";



        flower.style.animation =
        `flowerBorn .8s forwards ${i*0.08}s`;




        if(especiais.includes(i)){


            flower.classList.add(
                "special-flower"
            );


            flower.dataset.letter =
            especiais.indexOf(i);



            flower.onclick =
            abrirCarta;



        }



        flowersContainer.appendChild(
            flower
        );



    }


}









function escolherFlor(){


const flores=[

"🌹",
"🌷",
"🌸",
"🌼",
"💐"

];


return flores[
Math.floor(
Math.random()*flores.length
)
];


}





function posicaoSegura(){


return{


x:
Math.random()*75+10,


y:
Math.random()*75+10


};


}




function escolherFloresEspeciais(){


let lista=[];


while(lista.length<11){


let numero =
Math.floor(Math.random()*40);



if(!lista.includes(numero)){


lista.push(numero);


}


}



return lista;


}



/* ==========================
   SISTEMA DE CARTAS
========================== */


function abrirCarta(){


    const index =
    Number(this.dataset.letter);



    letterTitle.innerText =
    letters[index].title;



    letterText.innerText =
    letters[index].text;



    letterModal.classList.remove(
        "hidden"
    );



    if(!this.dataset.opened){


        this.dataset.opened="true";


        lettersOpened++;


        verificarFinal();



    }


}






closeLetter.onclick=function(){


    letterModal.classList.add(
        "hidden"
    );


};








/* ==========================
   FINAL DO JARDIM
========================== */


function verificarFinal(){



    if(lettersOpened === totalLetters){



        setTimeout(()=>{


            finalMessage.classList.remove(
                "hidden"
            );


        },800);



    }


}





returnGarden.onclick=function(){


    finalMessage.classList.add(
        "hidden"
    );


};









/* ==========================
   CONTADOR
========================== */


const firstMessage =
new Date(
    "2026-04-27T18:14:00"
);





function atualizarContador(){



    const agora =
    new Date();



    const tempo =
    agora - firstMessage;



    const dias =
    Math.floor(
        tempo / 
        (1000*60*60*24)
    );



    const horas =
    Math.floor(
        tempo /
        (1000*60*60)
    ) % 24;



    const minutos =
    Math.floor(
        tempo /
        (1000*60)
    ) % 60;



    counter.innerText =
    `${dias} dias, ${horas} horas e ${minutos} minutos desde a primeira mensagem`;



}



setInterval(
    atualizarContador,
    1000
);



atualizarContador();









/* ==========================
   PARTICULAS
========================== */


function criarParticulas(){



    for(let i=0;i<25;i++){



        const particle =
        document.createElement("span");



        particle.innerHTML="✦";



        particle.style.position =
        "absolute";



        particle.style.left =
        Math.random()*100+"%";



        particle.style.top =
        Math.random()*100+"%";



        particle.style.opacity =
        Math.random();



        particle.style.fontSize =
        "14px";



        particlesContainer.appendChild(
            particle
        );



    }



}









/* ==========================
   VENTO
========================== */


function criarVento(){



    for(let i=0;i<8;i++){



        const leaf =
        document.createElement("span");



        leaf.innerHTML="🍃";



        leaf.style.position =
        "absolute";



        leaf.style.left =
        "-10%";



        leaf.style.top =
        Math.random()*90+"%";



        leaf.style.fontSize =
        "22px";



        leaf.style.animation =
        `windMove ${8+i}s linear infinite`;



        windContainer.appendChild(
            leaf
        );


    }


}









/* ==========================
   INSETOS
========================== */


function criarInsetos(){



    const insetos=[

        "🦋",
        "🐞",
        "🐝"

    ];




    for(let i=0;i<4;i++){



        const insect =
        document.createElement("span");



        insect.innerHTML =
        insetos[
            i % insetos.length
        ];



        insect.style.position =
        "absolute";



        insect.style.left =
        Math.random()*80+"%";



        insect.style.top =
        Math.random()*80+"%";



        insect.style.fontSize =
        "25px";



        insect.style.animation =
        "floating 5s infinite";



        insectsContainer.appendChild(
            insect
        );



    }


}









/* ==========================
   SEGURANÇA
========================== */


window.onload=function(){


    console.log(
        "🌻 Jardim carregado corretamente"
    );


};
