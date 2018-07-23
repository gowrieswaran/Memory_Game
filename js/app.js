//constants
const TOTAL_CARDS = 8;

// variables for deck, cards
let deck = document.querySelector('.deck');
let cards=[];
let openCards =[];
let matchedCards = 0;

// variables to count moves
let moves = 0;
let movesCount = document.querySelector('.moves');

// variables to track time
let seconds, minutes;
let timer = document.querySelector('.timer');
let timeInterval;
let STAR_COUNT = 3;

// shuffle function
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// calls the shuffle function and create the element 
function shuffleCards() {
    let deckOfCards = Array.from(document.querySelectorAll('.deck li'));
    cards = shuffle(deckOfCards);
    cards.forEach(function(element){
        deck.appendChild(element);    
    });
     
}

document.body.onload = playGame();

// function to play game
function playGame() {
    shuffleCards();
    deck.addEventListener('click',function(){
        const cardSelected = event.target;
        if  (isCardValid(cardSelected)){
            displayCard(cardSelected);
            openCard(cardSelected); 
            if(openCards.length === 2){
                matchCards();
                moveCounter();
                starCounter();
                if(matchedCards===TOTAL_CARDS) {
                    clearInterval(timeInterval);
                    gameOver();
                }
            }
        }
    });
}


//validates card
function isCardValid(cardSelected) {
    return (
        cardSelected.classList.contains('card') && 
        !cardSelected.classList.contains('match') &&
        openCards.length < 2 && 
        !openCards.includes(cardSelected)
    );
}


//opens the selected card
function displayCard(cardSelected) {
    cardSelected.classList.toggle('open');
    cardSelected.classList.toggle('show');
    cardSelected.classList.remove('animated','jello');
}


//adds the open card to array
function openCard(cardSelected) {
    openCards.push(cardSelected);
}


//check if two cards are same
function matchCards() {
    if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        openCards[0].classList.add('animated','rubberBand');
        openCards[1].classList.add('animated','rubberBand');
        matchedCards++;
        openCards= [];
       } else {
        openCards[0].classList.add('animated','jello');
        openCards[1].classList.add('animated','jello');
           setTimeout(function(){
            displayCard(openCards[0]);
            displayCard(openCards[1]);
            openCards = [];
           },600); 
       }
}


//function to count the number of moves
function moveCounter() {
    moves++;
    movesCount.innerHTML = moves;
    if(moves === 1){
        minutes = 0;
        seconds = 0;
        startTimer();
    }
}


//function to hide stars based on moves
function starCounter() {
    const starsList = Array.from(document.querySelectorAll('.stars li'));
    if(moves === 16){
        starsList[0].style.display = 'none';
        STAR_COUNT--;
    } else if(moves === 22){
        starsList[1].style.display = 'none';
        STAR_COUNT--;
    }

}


//function for timer
function startTimer() {
    timeInterval = setInterval(function(){
        timer.innerHTML = minutes + " mins " + seconds + " secs ";
        seconds++;
        if(seconds===60){
            minutes++;
            seconds = 0;
        }

    },800);
}


//function to reset game
function resetGame() {
    resetStars();
    resetMoves();
    resetTime();    
    matchedCards = 0;
    STAR_COUNT = 3;
    playGame();
}


//function to reset moves
function resetMoves() {
    moves = 0;
    movesCount.innerHTML = moves;
}


//function to reset stars
function resetStars() {
    const stars = document.querySelectorAll('.stars li')
    for(star of stars){
        star.style.display = 'inline';      
    }
}


//function to reset time
function resetTime() {
    timer
    minutes = 0;
    seconds = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(timeInterval);
    cards = document.querySelectorAll('.card');
    for(card of cards){
        card.className = 'card';
    }
}

//function to display modal when the game ends
function gameOver() {
    displayModal();
}

//display modal
function displayModal () {
    toggleModal();
    document.querySelector('.modal_timer').innerHTML = "Time taken: " + timer.innerHTML;
    document.querySelector('.modal_stars').innerHTML = "Total no.of Stars: "+ STAR_COUNT;
    document.querySelector('.modal_moves').innerHTML = "Total no.of Moves: " + moves;
    let replayBtn = document.querySelector('.replay_button');
    replayBtn.addEventListener('click',replayGame);
}


//function to toggle modal view
function toggleModal() {
    let modalShow = document.querySelector('.modal');
    modalShow.classList.add('animated','slideInLeft');
    modalShow.classList.toggle('hide');
}


//function to replay
function replayGame() {
    toggleModal();
    resetGame();
}

