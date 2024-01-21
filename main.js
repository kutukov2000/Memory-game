class Card {
    constructor(image, title, height = '7vh', isLogo = false) {
        this.image = image;
        this.title = title;
        this.height = height;
        this.isLogo = isLogo;
    }

    getCard() {
        return `
            <div class="card">
                <div class="content ${this.isLogo ? 'flipped logo' : ''}">
                    <div class="front"></div>
                    <div class="back">
                        <div>
                            <img style="height: ${this.height};" src="${this.image}">
                            <h3>${this.title}</h3>
                        </div>
                    </div>
                </div>
            </div>`
    }

    static flipCard(card) {
        card.classList.add('flipped');
    }

    static closeCard(card) {
        card.classList.remove('flipped');
    }
}

const field = document.querySelector("#field");

let startTime;
let isStart = true;

let openCards = [];
let matchedPairs = 0;
let matchedPairToWin;

function Initialization() {
    clearField();

    let cards = [];

    const animalData = [
        { image: 'images/toucan.png', title: 'Toucan', height: '9vh' },
        { image: 'images/turtle.png', title: 'Turtle' },
        { image: 'images/elephant.png', title: 'Elephant', height: '9vh' },
        { image: 'images/zebra.png', title: 'Zebra', height: '11vh' },
        { image: 'images/fox.png', title: 'Fox', height: '10vh' },
        { image: 'images/dog.png', title: 'Dog', height: '9vh' },
        { image: 'images/owl.png', title: 'Owl', height: '10vh' },
        { image: 'images/penguin.png', title: 'Penguin', height: '10vh' },
        { image: 'images/sheep.png', title: 'Sheep', height: '10vh' },
        { image: 'images/mouse.png', title: 'Mouse' },
        { image: 'images/rabbit.png', title: 'Rabbit', height: '11vh' },
        { image: 'images/lion.png', title: 'Lion', height: '11vh' },
    ];

    matchedPairToWin = animalData.length;

    for (const data of animalData) {
        cards.push(new Card(data.image, data.title, data.height));
        cards.push(new Card(data.image, data.title, data.height));
    }

    shuffleCards(cards);

    //Insert logo card
    cards.splice(12, 0, new Card('images/m.png', '', '12vh', true));

    //Add cards to game field
    cards.forEach((card) => field.innerHTML += card.getCard());

    const cardsContent = document.querySelectorAll('.content');

    cardsContent.forEach((content) => {
        content.addEventListener('click', () => {
            handleCardClick(content);
        });
    });
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function clearField() {
    field.innerHTML = '';
    isStart = true;
    openCards = [];
    matchedPairs = 0;
}

Initialization();

function handleCardClick(card) {
    if (isStart) {
        startTime = Date.now();
        isStart = false;
    }

    if (card.classList.contains('flipped') || openCards.length >= 2) {
        return;
    }

    Card.flipCard(card);

    openCards.push(card);

    if (openCards.length === 2) {
        const [card1, card2] = openCards;
        const img1 = card1.querySelector('img').src;
        const img2 = card2.querySelector('img').src;

        if (img1 === img2) {
            openCards = [];
            matchedPairs++;

            // Check for win
            if (matchedPairs === matchedPairToWin) {
                alert(`You are winner. Your time ${Math.floor((Date.now() - startTime) / 1000)}s`);
                Initialization();
            }
        }
        else {
            setTimeout(() => {
                Card.closeCard(card1);
                Card.closeCard(card2);
                openCards = [];
            }, 500);
        }
    }
}
