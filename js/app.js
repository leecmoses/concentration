// Global variables
let     icons       = ["fas fa-leaf", "fas fa-leaf", "fas fa-moon", "fas fa-moon", "fas fa-sun", "fas fa-sun", "fas fa-bolt", "fas fa-bolt", "fas fa-frog", "fas fa-frog", "fas fa-cloud", "fas fa-cloud", "fas fa-fire", "fas fa-fire", "fas fa-music", "fas fa-music"],
        liveTimer,
        matchCards  = [],
        moves       = 0,
        openCards   = [],
        seconds     = 0,
        start       = true;

const   caption     = document.querySelector("#caption"),
        deck        = document.querySelector('.deck'),
        ninja       = document.querySelector("#ninja"),
        moveCounter = document.querySelector(".moves"),
        playAgain   = document.querySelector(".play-again"),
        rate        = document.querySelector(".stars"),
        restart     = document.querySelector('.restart'),
        time        = document.querySelector('.time');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function init() {
    // Shuffle and generate cards
    icons = shuffle(icons);
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        deck.appendChild(card);

        // Handle click event for each card
        flip(card);
    }
}

function flip(card) {
    card.addEventListener('click', function () {
        
        if(start) {
            startTimer();
            start = false;
        }

        const currentCard = this;
        const previousCard = openCards[0];

        if (openCards.length === 1) {
            
            card.classList.add('open', 'show', 'animated', 'flipInY');
            openCards.push(this);

            // Compare the two cards
            match(currentCard, previousCard);
            
            // Increment move counter
            addMove();

            // Update rating
            rating();

            // Check if game is finished
            end();

        } else {
            card.classList.add('open', 'show', 'animated', 'flipInY');
            openCards.push(this);
        }
    });
}

function match(currentCard, previousCard) {
    // Match found
    if (currentCard.innerHTML === previousCard.innerHTML) {
        
        currentCard.classList.remove('animated', 'flipInY');
        previousCard.classList.remove('animated', 'flipInY');
        
        currentCard.classList.add('match', 'animated', 'tada');
        previousCard.classList.add('match', 'animated', 'tada');

        matchCards.push(currentCard, previousCard);

        openCards = [];

    // Match not found
    } else {

        currentCard.classList.remove('animated', 'flipInY');
        previousCard.classList.remove('animated', 'flipInY');

        currentCard.classList.add('animated', 'wobble');
        previousCard.classList.add('animated', 'wobble');

        setTimeout(function() {
            currentCard.classList.remove('open', 'show', 'flipInY', 'wobble');
            previousCard.classList.remove('open', 'show', 'flipInY', 'wobble');
        }, 1000);

        openCards = [];

    }
}

function end() {
    if (matchCards.length === icons.length) {
        stopTimer();
        modal();
    }
}

// Modal
function modal() {
    // Result summary in modal
    document.querySelector(".total-seconds").innerHTML = seconds;
    document.querySelector(".total-moves").innerHTML = moves;
    document.querySelector(".total-stars").innerHTML = rate.innerHTML;

    // Set ninja and caption
    if (moves < 17 && seconds <= 30) {
        ninja.setAttribute("src", 'img/kakashi.png');
        caption.innerHTML = 'Excellent work!';
    } else if (moves < 17) {
        ninja.setAttribute("src", "img/naruto.png");
        caption.innerHTML = 'Great job!';
    } else if (moves < 23) {
        ninja.setAttribute("src", "img/sakura.png");
        caption.innerHTML = 'Nice work!';
    } else {
        ninja.setAttribute("src", "img/sasuke.png");
        caption.innerHTML = 'Is that all you got?'
    }

    // Show modal
    document.querySelector(".modal").style.display = ('flex');
}

// Play Again
playAgain.addEventListener('click', function(e) {
    e.preventDefault();
    reset();
    init();
    document.querySelector(".modal").style.display = ('none');
});

// Move counter
function addMove() {
    moves++;
    moveCounter.innerHTML = `Moves: ${moves}`;
}

// Rating system
function rating() {
    if (moves > 16) {
        rate.innerHTML = '<li><i class="far fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>';  
    } if (moves > 22) {
        rate.innerHTML = '<li><i class="far fa-star"></i></li><li><i class="far fa-star"></i></li><li><i class="fas fa-star"></i></li>';
    } if (moves > 30) {
        rate.innerHTML = '<li><i class="far fa-star"></i></li><li><i class="far fa-star"></i></li><li><i class="far fa-star"></i></li>';
    }
}

// Timer
function startTimer() {
    liveTimer = setInterval(function() {
        seconds++;
        time.innerHTML = seconds + 's';
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}

// Restart Button
restart.addEventListener('click', function() {
    // Reset any related variables
    reset();

    // Call 'init' to generate new cards
    init();
});

function reset() {
    deck.innerHTML = "";
    matchCards = [];
    moves = 0;
    moveCounter.innerHTML = `Moves: ${moves}`; // moveCounter has to be after moves
    openCards = [];
    rate.innerHTML = '<li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>';
    seconds = 0;
    start = true;
    stopTimer();
    time.innerHTML = seconds + 's';
}

init();