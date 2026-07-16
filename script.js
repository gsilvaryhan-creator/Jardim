/* =====================================================
   O JARDIM ONDE VOCÊ FLORESCE
   SCRIPT.JS
   PARTE 1/4
===================================================== */



/* =====================================================
   CONFIG
===================================================== */


const CONFIG = {


    startDate: new Date(
        "2026-04-27T18:14:00"
    ),


    totalFlowers: 24,


    specialFlowers: 11,


    flowerDelay: 120,


    safeArea: {

        minX: 10,

        maxX: 90,

        minY: 12,

        maxY: 88

    },


    minDistance: 9


};







/* =====================================================
   ELEMENTOS
===================================================== */


const ELEMENTS = {


    screens: {

        intro:
            document.querySelector("#intro"),

        transition:
            document.querySelector("#transition"),

        garden:
            document.querySelector("#garden"),

        final:
            document.querySelector("#final")

    },



    enterButton:
        document.querySelector("#enterGardenBtn"),



    backGardenButton:
        document.querySelector("#backGardenBtn"),



    fallingPetal:
        document.querySelector("#fallingPetal"),



    flowersContainer:
        document.querySelector("#flowersContainer"),



    gardenArea:
        document.querySelector("#gardenArea"),



    letterModal:
        document.querySelector("#letterModal"),



    letterTitle:
        document.querySelector("#letterTitle"),



    letterText:
        document.querySelector("#letterText"),



    closeLetter:
        document.querySelector("#closeLetter"),



    musicButton:
        document.querySelector("#musicBtn"),



    music:
        document.querySelector("#backgroundMusic"),



    days:
        document.querySelector("#days"),



    hours:
        document.querySelector("#hours"),



    minutes:
        document.querySelector("#minutes"),



    particles:
        document.querySelector("#particlesContainer"),



    leaves:
        document.querySelector("#leavesContainer"),



    finalSunflower:
        document.querySelector("#finalSunflower"),



    finalScreen:
        document.querySelector("#final")

};









/* =====================================================
   ESTADO GLOBAL
===================================================== */


const STATE = {


    currentScreen:
        "intro",



    openedLetters:
        [],



    flowers:
        [],



    generatedPositions:
        [],



    letterOpen:
        false,



    finalSequenceStarted:
        false,



    gardenCreated:
        false,



    musicPlaying:
        false


};









/* =====================================================
   DADOS DAS CARTAS
===================================================== */


const LETTERS = [


{

title:

"Seu sorriso 🌻",

text:

"Uma das coisas que mais gosto em você é o jeito que seu sorriso consegue deixar meus dias melhores."

},



{

title:

"Seu jeitinho 🌸",

text:

"Existem pequenos detalhes seus que talvez você nem perceba, mas que fazem você ser única para mim."

},



{

title:

"Nossas conversas 💛",

text:

"Cada conversa nossa é um momento que eu guardo com carinho, mesmo quando falamos sobre coisas simples."

},



{

title:

"Sua risada 🌼",

text:

"A sua risada é uma daquelas coisas que eu poderia ouvir muitas vezes e ainda continuaria gostando."

},



{

title:

"Seu carinho 🌹",

text:

"Mesmo de longe, você consegue demonstrar cuidado de um jeito que significa muito para mim."

},



{

title:

"Pequenos momentos 🌷",

text:

"As pequenas coisas acabam se tornando as maiores lembranças quando são compartilhadas com alguém especial."

},



{

title:

"Você me inspira 🪻",

text:

"Você me faz querer ser uma pessoa melhor e continuar construindo momentos bonitos juntos."

},



{

title:

"Minha pequenininha 🌻",

text:

"Esse apelido carrega muito carinho, porque representa o quanto você é importante para mim."

},



{

title:

"Nosso jardim 🌱",

text:

"Assim como esse jardim, acredito que tudo bonito precisa de cuidado, paciência e carinho para florescer."

},



{

title:

"Meu carinho por você ❤️",

text:

"Cada detalhe desse lugar foi criado pensando em você e no quanto você é especial para mim."

},



{

title:

"Obrigado por existir 🌻",

text:

"Obrigado por fazer parte da minha vida e por permitir que eu compartilhe tantos momentos com você."

}


];









/* =====================================================
   CONTROLE DE TELAS
===================================================== */


function changeScreen(screenName){


    Object
    .values(ELEMENTS.screens)
    .forEach(screen => {


        screen.classList.remove(
            "active"
        );


    });



    ELEMENTS
    .screens[screenName]
    .classList.add(
        "active"
    );



    STATE.currentScreen =
        screenName;


}









/* =====================================================
   TRANSIÇÃO PARA O JARDIM
===================================================== */


function startTransition(){



    changeScreen(
        "transition"
    );



    ELEMENTS
    .fallingPetal
    .classList
    .add(
        "petals-falling"
    );



    setTimeout(()=>{


        changeScreen(
            "garden"
        );



        initializeGarden();



    },3000);



}









/* =====================================================
   INICIALIZAÇÃO
===================================================== */


function init(){


    createParticles();



    createLeaves();



    startCounter();



    ELEMENTS
    .enterButton
    .addEventListener(
        "click",
        startTransition
    );



    ELEMENTS
    .closeLetter
    .addEventListener(
        "click",
        closeLetter
    );



    ELEMENTS
    .backGardenButton
    .addEventListener(
        "click",
        returnGarden
    );



}







document
.addEventListener(
    "DOMContentLoaded",
    init
);


/* =====================================================
   FLOWERS
   PARTE 2/4
===================================================== */





/* =====================================================
   INICIALIZAÇÃO DO JARDIM
===================================================== */


function initializeGarden(){


    if(STATE.gardenCreated)
        return;



    STATE.gardenCreated = true;



    createFlowers();


}









/* =====================================================
   CRIAÇÃO DAS FLORES
===================================================== */


function createFlowers(){



    const flowerTypes = [


        "🌷",

        "🌹",

        "🌼",

        "🌸",

        "🪻"


    ];




    let specialIndexes = generateSpecialIndexes();





    for(
        let i = 0;
        i < CONFIG.totalFlowers;
        i++
    ){



        const isSpecial =
            specialIndexes.includes(i);



        const flower =
            document.createElement(
                "div"
            );



        flower.classList.add(
            "flower"
        );



        if(isSpecial){

            flower.classList.add(
                "special"
            );

        }




        flower.innerHTML =
            flowerTypes[
                Math.floor(
                    Math.random()
                    *
                    flowerTypes.length
                )
            ];





        const position =
            generateSafePosition();





        flower.style.left =
            position.x + "%";



        flower.style.top =
            position.y + "%";





        flower.dataset.index =
            isSpecial
            ?
            getLetterIndex(i,specialIndexes)
            :
            "-1";





        ELEMENTS
        .flowersContainer
        .appendChild(
            flower
        );




        STATE.flowers.push(
            flower
        );



        STATE.generatedPositions
        .push(
            position
        );





        setTimeout(()=>{


            flower.classList.add(
                "born"
            );


        },
        i * CONFIG.flowerDelay
        );





        flower.addEventListener(
            "click",
            ()=>{

                handleFlowerClick(
                    flower
                );

            }
        );



    }



}









/* =====================================================
   GERAR FLORES ESPECIAIS
===================================================== */


function generateSpecialIndexes(){


    const indexes = [];



    while(
        indexes.length <
        CONFIG.specialFlowers
    ){



        const random =
            Math.floor(
                Math.random()
                *
                CONFIG.totalFlowers
            );



        if(
            !indexes.includes(
                random
            )
        ){

            indexes.push(
                random
            );

        }


    }



    return indexes;


}









/* =====================================================
   LIGAR FLOR AO ÍNDICE DA CARTA
===================================================== */


function getLetterIndex(
    flowerIndex,
    specialIndexes
){



    return specialIndexes.indexOf(
        flowerIndex
    );


}









/* =====================================================
   POSICIONAMENTO SEGURO
===================================================== */


function generateSafePosition(){



    let valid = false;



    let position;



    while(!valid){



        position = {


            x:

            randomNumber(

                CONFIG.safeArea.minX,

                CONFIG.safeArea.maxX

            ),



            y:

            randomNumber(

                CONFIG.safeArea.minY,

                CONFIG.safeArea.maxY

            )



        };





        valid =
            checkDistance(
                position
            );



    }



    return position;


}









function randomNumber(
    min,
    max
){


    return Math.random()
    *
    (
        max - min
    )
    +
    min;


}









function checkDistance(
    newPosition
){



    for(
        const oldPosition of
        STATE.generatedPositions
    ){



        const distance =

        Math.sqrt(

            Math.pow(
                newPosition.x -
                oldPosition.x,
                2
            )

            +

            Math.pow(
                newPosition.y -
                oldPosition.y,
                2
            )

        );





        if(
            distance <
            CONFIG.minDistance
        ){

            return false;

        }


    }



    return true;


}









/* =====================================================
   CLIQUE NAS FLORES
===================================================== */


function handleFlowerClick(
    flower
){



    if(
        STATE.letterOpen
    )
    return;



    const index =
        Number(
            flower.dataset.index
        );





    if(
        index === -1
    )
    return;




    openLetter(
        index
    );



}









/* =====================================================
   SISTEMA DE CARTAS
===================================================== */


function openLetter(
    index
){



    if(
        STATE.openedLetters
        .includes(index)
    )
    return;





    STATE.letterOpen =
        true;




    STATE.openedLetters
    .push(
        index
    );





    const letter =
        LETTERS[index];





    ELEMENTS
    .letterTitle
    .textContent =
        letter.title;




    ELEMENTS
    .letterText
    .textContent =
        letter.text;





    ELEMENTS
    .letterModal
    .classList
    .add(
        "show"
    );




}









function closeLetter(){



    ELEMENTS
    .letterModal
    .classList
    .remove(
        "show"
    );



    STATE.letterOpen =
        false;





    checkFinalSequence();


}









/* =====================================================
   VERIFICAR FINAL
===================================================== */


function checkFinalSequence(){



    if(

        STATE.openedLetters.length
        ===
        CONFIG.specialFlowers

        &&

        !STATE.finalSequenceStarted

    ){



        STATE.finalSequenceStarted =
            true;



        startFinalSequence();



    }


}


/* =====================================================
   COUNTER
   PARTE 3/4
===================================================== */





/* =====================================================
   CONTADOR DESDE 27/04/2026 18:14
===================================================== */


function startCounter(){


    updateCounter();



    setInterval(()=>{


        updateCounter();


    },1000);


}









function updateCounter(){



    const now =
        new Date();



    const difference =
        now -
        CONFIG.startDate;





    if(
        difference < 0
    ){

        ELEMENTS.days.textContent =
            "0";

        ELEMENTS.hours.textContent =
            "0";

        ELEMENTS.minutes.textContent =
            "0";


        return;

    }







    const totalSeconds =

        Math.floor(
            difference / 1000
        );





    const days =

        Math.floor(
            totalSeconds /
            (60 * 60 * 24)
        );





    const hours =

        Math.floor(

            (
                totalSeconds %
                (60 * 60 * 24)

            )

            /

            (60 * 60)

        );





    const minutes =

        Math.floor(

            (
                totalSeconds %
                (60 * 60)

            )

            /

            60

        );







    ELEMENTS.days.textContent =
        days;



    ELEMENTS.hours.textContent =
        hours;



    ELEMENTS.minutes.textContent =
        minutes;



}









/* =====================================================
   PARTICLES
===================================================== */


function createParticles(){



    const amount =
        35;





    for(
        let i = 0;
        i < amount;
        i++
    ){



        const particle =
            document.createElement(
                "span"
            );




        particle.classList.add(
            "particle"
        );





        particle.style.left =

            randomNumber(
                0,
                100
            )

            +

            "%";





        particle.style.animationDuration =

            randomNumber(
                5,
                12
            )

            +

            "s";





        particle.style.animationDelay =

            randomNumber(
                0,
                5
            )

            +

            "s";





        ELEMENTS
        .particles
        .appendChild(
            particle
        );



    }



}









/* =====================================================
   FOLHAS DO JARDIM
===================================================== */


function createLeaves(){



    const amount =
        12;





    for(
        let i = 0;
        i < amount;
        i++
    ){



        const leaf =
            document.createElement(
                "div"
            );




        leaf.classList.add(
            "leaf"
        );




        leaf.textContent =
            "🍃";





        leaf.style.left =

            randomNumber(
                0,
                100
            )

            +

            "%";





        leaf.style.animationDuration =

            randomNumber(
                8,
                16
            )

            +

            "s";





        leaf.style.animationDelay =

            randomNumber(
                0,
                10
            )

            +

            "s";






        ELEMENTS
        .leaves
        .appendChild(
            leaf
        );



    }



}









/* =====================================================
   MÚSICA
===================================================== */



ELEMENTS
.musicButton
.addEventListener(
    "click",
    toggleMusic
);









function toggleMusic(){



    if(
        STATE.musicPlaying
    ){



        pauseMusic();



    }else{



        playMusic();



    }



}









function playMusic(){



    if(
        !ELEMENTS.music
    )
    return;





    ELEMENTS
    .music
    .play()
    .then(()=>{



        STATE.musicPlaying =
            true;



        ELEMENTS
        .musicButton
        .textContent =
            "🔇 Pausar";



    })
    .catch(()=>{



        STATE.musicPlaying =
            false;



    });



}









function pauseMusic(){



    ELEMENTS
    .music
    .pause();




    STATE.musicPlaying =
        false;




    ELEMENTS
    .musicButton
    .textContent =
        "🔊 Música";



}









/* =====================================================
   UTILITÁRIOS
===================================================== */


function wait(time){



    return new Promise(
        resolve =>
        setTimeout(
            resolve,
            time
        )
    );





/* =====================================================
   FINAL SEQUENCE
   PARTE 4/4
===================================================== */





/* =====================================================
   SEQUÊNCIA FINAL COMPLETA
===================================================== */


async function startFinalSequence(){



    if(
        STATE.finalSequenceStarted !== true
    )
    return;





    await wait(800);





    const overlay =
        document.createElement(
            "div"
        );





    overlay.classList.add(
        "final-transition-overlay"
    );





    document.body.appendChild(
        overlay
    );





    await wait(1000);





    createGiantSunflower();





    await wait(2500);





    showFinalScreen();



}









/* =====================================================
   GIRASSOL FINAL
===================================================== */


function createGiantSunflower(){



    const sunflower =
        document.createElement(
            "div"
        );





    sunflower.classList.add(
        "giant-sunflower"
    );





    sunflower.textContent =
        "🌻";





    ELEMENTS
    .gardenArea
    .appendChild(
        sunflower
    );





    setTimeout(()=>{


        sunflower.classList.add(
            "appear"
        );


    },100);



}









/* =====================================================
   TELA FINAL
===================================================== */


function showFinalScreen(){



    changeScreen(
        "final"
    );





    ELEMENTS
    .finalScreen
    .classList
    .add(
        "show"
    );





    setTimeout(()=>{


        ELEMENTS
        .finalSunflower
        .classList
        .add(
            "sunflower-animation"
        );



    },300);



}









/* =====================================================
   VOLTAR AO JARDIM
===================================================== */


function returnGarden(){



    changeScreen(
        "garden"
    );





    ELEMENTS
    .finalScreen
    .classList
    .remove(
        "show"
    );





}









/* =====================================================
   CONTROLE DE SEGURANÇA
===================================================== */



window.addEventListener(
    "beforeunload",
    ()=>{


        STATE.letterOpen =
            false;


    }
);









/* =====================================================
   GARANTIR QUE EVENTOS EXISTAM
===================================================== */


function bindEvents(){



    ELEMENTS
    .musicButton
    .addEventListener(
        "click",
        toggleMusic
    );





    ELEMENTS
    .closeLetter
    .addEventListener(
        "click",
        closeLetter
    );





    ELEMENTS
    .backGardenButton
    .addEventListener(
        "click",
        returnGarden
    );



}









/* =====================================================
   FINALIZAÇÃO
===================================================== */



bindEvents();
