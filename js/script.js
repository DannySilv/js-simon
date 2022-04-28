// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

// Create an array for numbers chosen by user and another one for random numbers
const arrayUserNumbs = [];
let rndNumb;

// GAME START
document.getElementById("play").addEventListener("click", startGame)

// FUNCTION START-GAME

function startGame() {

    // 1 - Generate random numbers, pass them to the array and append them to HTML element
    const numbContainer = document.querySelector(".number-container");
    numbContainer.innerHTML = "";

    rndNumb = genRndNumbArray(1, 100);
    console.log(rndNumb);
    for (let i = 0; i < 5; i++) {
        const thisNumb = rndNumb[i];
        const domElement = genNewElement(thisNumb);
        numbContainer.append(domElement)
    }
    
    // 2 - Create a timer based on difficulty chosen

    const countdown = document.querySelector(".countdown");
    let difficulty = document.getElementById("difficulty").value;
    let counter;
    let timer;

    if (difficulty == "easy") {
        counter = 31;
    } else if (difficulty == "medium") {
        counter = 21;
    } else if (difficulty == "hard") {
        counter = 16;
    }  

    timer = setInterval(() => {
        counter--;
        if (counter === -1) {
            clearInterval(timer);
            document.getElementById("d-none").style.display = "none";
            setTimeout(() => {
                userChosenNumbs();
                checkNumbs();
            }, 100); 
        } else {
            countdown.innerHTML = counter;
        }
    }, 1000)
};

// FUNCTIONS

// FUNCTION 1 RANDOM-INTEGER-GENERATOR
/**
 * Description
 * @param {integer} min -> Smallest value
 * @param {integer} max -> Max value 
 * @returns {integer} -> Return one random integer between min and max
 */
 function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// FUNCTION 2 RANDOM-INTEGER-ARRAY
/**
 * Description -> Creates an array containing 5 random numbers
 * @param {integer} min -> Min Value
 * @param {integer} max -> Max Value
 * @returns {array} rndNumbArray -> An array containing 5 random integers
 */
 function genRndNumbArray(min, max) {
    const rndNumbArray = [];
    const itemNumber = 5;
 
    while (rndNumbArray.length < itemNumber) {
        const rndNumb = getRndInteger(min, max);
        if ( !rndNumbArray.includes(rndNumb) ) {
            rndNumbArray.push(rndNumb);
        }
    }
    
    return rndNumbArray;
}

// FUNCTION 3 USER-CHOSEN-NUMBERS-ARRAY
/**
 * Description -> Asks the user the numbers that were on screen and push the numbers written to an array 
 * @returns {any} -> Nothing
 */
function userChosenNumbs() {
    for (let i = 1; i <=5; i++) {
        let userNumber;
        userNumber = parseInt (prompt (`Inserisci il ${i}° numero!`));
        console.log(`${i}° numero è:`, userNumber);
        arrayUserNumbs.push(userNumber);
        };
};

// FUNCTION 4 CHECK-USER-NUMBERS
/**
 * Description -> Checks if the elements inside arrayUserNumbs are the same of those in rndNumbs 
 * @returns {any}
 */
function checkNumbs() {
    let endResult;
    let counter = 0; 

    for(let i = 0; i < 5; i++) {
        if (rndNumb.includes(arrayUserNumbs[i])) {
            counter++;
        }
    }

    endResult = alert(`Hai indovinato ${counter} numeri!`)
}



// DOM FUNCTION - NEW-ELEMENT-GENERATOR
/**
 * Description -> It generates the HTML element with a number inside
 * @param {integer} number -> The number to append to the html element
 * @returns {any} -> HTML element
 */
 function genNewElement(number) {
    const newElement = document.createElement("div");

    newElement.innerHTML = `<span>${number}</span>`

    newElement.classList.add("number");

    return newElement;
}


