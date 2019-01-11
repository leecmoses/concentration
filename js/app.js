// Create a list that holds all of your cards
let icons =   ["fas fa-leaf", "fas fa-leaf",
                "fas fa-moon", "fas fa-moon",
                "fas fa-sun", "fas fa-sun",
                "fas fa-bolt", "fas fa-bolt",
                "fas fa-frog", "fas fa-frog",
                "fas fa-cloud", "fas fa-cloud",
                "fas fa-fire", "fas fa-fire",
                "fas fa-music", "fas fa-music"]

const deck = document.querySelector('.deck');

let openCards = [];
let matchCards = [];

// Clearout deck, shuffle, then generate cards
deck.innerHTML = '';
icons = shuffle(icons);
for (let i = 0; i < icons.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    deck.appendChild(card);

    // Handle click event for each card
    flip(card);

}

function flip(card) {
    card.addEventListener('click', function () {
            
        const currentCard = this;
        const previousCard = openCards[0];

        if (openCards.length === 1) {
            
            card.classList.add('open', 'show');
            openCards.push(this);

            // Compare the two cards
            if (currentCard.innerHTML === previousCard.innerHTML) {
                
                // Match found
                currentCard.classList.add('match');
                previousCard.classList.add('match');

                matchCards.push(currentCard, previousCard);

                openCards = [];

                // Check if game is finished
                end();

            } else {

                setTimeout(function() {
                    currentCard.classList.remove('open', 'show');
                    previousCard.classList.remove('open', 'show');
                    openCards = [];
                }, 750);

            }
        } else {
            card.classList.add('open', 'show');
            openCards.push(this);
        }
        
    });
}

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

function end() {
    if (matchCards.length === icons.length) {
        alert("Game Over");
    }
}