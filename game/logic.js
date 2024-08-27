
//Page Logic
const hitButtonDOM = document.querySelector("#hit");
hitButtonDOM.addEventListener("click", playerHit);

const standButtonDOM = document.querySelector("#stand");
standButtonDOM.addEventListener("click", playerStand);

const dealButtonDOM = document.querySelector("#deal")
dealButtonDOM.addEventListener("click", deal);

const playerDeckDOM = document.querySelector("#playerDeck");
const playerTotalDOM = document.querySelector("#playerTotal");
const dealerDeckDOM = document.querySelector("#dealerDeck");
const dealerTotalDOM = document.querySelector("#dealerTotal");

const bustScreen = document.querySelector("#bustScreen");



let playerDeck = [];
let playerCount = 0;
let playerAceCount = 0;
let dealerDeck = [];
let dealerCount = 0;
let dealerAceCount = 0;

    //helper
function getValue(value){
    switch(value){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return Number(value);
        case 'A':
            return 11;
        default:
            return 10;
    }
}

function generateDOMCard(cardInnards){
    const card = document.createElement('div');
    card.classList.add('card');
    const marker = document.createElement('p');
    marker.innerHTML = cardInnards[0] + " " + cardInnards[1];
    card.appendChild(marker);
    return card;
}

function clearBoard(){
    playerDeck = [];
    playerCount = 0;
    playerAceCount = 0;
    dealerDeck = [];
    dealerCount = 0;
    dealerAceCount = 0;

    playerDeckDOM.innerHTML = "";
    playerTotalDOM.innerHTML = "";
    dealerDeckDOM.innerHTML = "";
    dealerTotalDOM.innerHTML = "";

}
    //actions
        //player
function deal(){
    dealerHit();
    playerHit();
    playerHit();
}

function playerHit(){
    const cardInnards = deck.pop();
    
    playerDeck.push(cardInnards);
    playerCount+=getValue(cardInnards[0]);
    if (cardInnards[0] == 'A'){
        playerAceCount++;
    }


    if (playerCount > 21 && playerAceCount > 0){
        playerCount -= 10;
        playerAceCount--;
    }

    playerTotalDOM.innerHTML = playerCount;
    playerDeckDOM.appendChild(generateDOMCard(cardInnards));

    if (playerCount > 21){
        bustScreen.classList.remove("hidden");
    }
}

function playerStand(){
    if (dealerCount < 17){
        setTimeout(()=>{
            dealerHit()
            playerStand()
        }, 1000);
    }
}

        //dealer
function dealerHit(){
    const cardInnards = deck.pop();
    
    dealerDeck.push(cardInnards);
    dealerCount+=getValue(cardInnards[0]);
    if (cardInnards[0] == 'A'){
        dealerAceCount++;
    }


    if (dealerCount > 21 && dealerAceCount > 0){
        dealerCount -= 10;
        dealerAceCount--;
    }
    
    dealerTotalDOM.innerHTML = dealerCount;
    dealerDeckDOM.appendChild(generateDOMCard(cardInnards));
}






//Game Logic
function generateDeck(){
    const cardRanks = ['A','1','2','3','4','5','6','7','8','9','10','J','Q','K'];
    const cardSuits = ['D','C','H','S'];
    let tempDeck = [];
    for(i = 0; i < cardRanks.length; i++){
        for(j = 0; j < cardSuits.length; j++){
            index = getNumUnder(tempDeck.length);
            newCard = [cardRanks[i], cardSuits[j]];
            tempDeck.push(newCard);
        }
    }
    return tempDeck;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getNumUnder(n){
    return Math.floor(Math.random()*n);
}
