let currentSortType = null;
let isAscending = true;

function getCards() {
    return Array.from(document.querySelectorAll('.card'));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sortArticles(type) {
    const container = document.getElementById('articlesContainer');
    let cards = getCards();

    cards.forEach(card => card.style.display = '');

    if (currentSortType === type) {
        isAscending = !isAscending;
    } else {
        currentSortType = type;
        isAscending = true;
    }

    updateSortingIcons();

    cards.sort((a, b) => {
        const valueA = parseInt(a.dataset[type]);
        const valueB = parseInt(b.dataset[type]);
        return isAscending ? valueA - valueB : valueB - valueA;
    });

    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));

    applyVisibilityLimit();
}

function updateSortingIcons() {
    const complexityArrow = document.querySelector('.filter:nth-child(1) .heading-xxs:last-child');
    const popularityArrow = document.querySelector('.filter:nth-child(2) .heading-xxs:last-child');

    complexityArrow.textContent = currentSortType === 'complexity'
        ? (isAscending ? '↑' : '↓')
        : '↓';
    popularityArrow.textContent = currentSortType === 'popularity'
        ? (isAscending ? '↑' : '↓')
        : '↓';
}

function applyVisibilityLimit() {
    const cards = getCards();
    cards.forEach((card, index) => {
        if (index >= visibleCards) {
            card.style.display = 'none';
        } else {
            card.style.display = '';
        }
    });

    const loadMoreButton = document.getElementById('loadMoreButton');
    loadMoreButton.style.display = visibleCards >= cards.length ? 'none' : '';
}

let visibleCards = 6;

document.addEventListener('DOMContentLoaded', function () {
    const complexityFilter = document.querySelector('.filter:nth-child(1)');
    const popularityFilter = document.querySelector('.filter:nth-child(2)');
    const container = document.getElementById('articlesContainer');
    const loadMoreButton = document.getElementById('loadMoreButton');

    let cards = getCards();
    shuffleArray(cards);
    container.innerHTML = '';
    cards.forEach(card => container.appendChild(card));

    applyVisibilityLimit();

    complexityFilter.addEventListener('click', () => sortArticles('complexity'));
    popularityFilter.addEventListener('click', () => sortArticles('popularity'));

    complexityFilter.style.cursor = 'pointer';
    popularityFilter.style.cursor = 'pointer';

    loadMoreButton.addEventListener('click', () => {
        visibleCards += 6;
        applyVisibilityLimit();
    });
});