const searchInput = document.querySelector('.search-input');
const mainContent = document.querySelector('.main-container');
const searchResults = document.getElementById('searchResults');
const searchCardsContainer = document.getElementById('searchCardsContainer');
const footer = document.querySelector('.footer');

if (searchCardsContainer) {
    searchCardsContainer.classList.add('search-cards-grid');
}

let cardsLoaded = false;
let allCards = [];

async function loadCards() {
    if (cardsLoaded) return;
    const paths = [
        '/search/search/index.html',
        '../search/search/index.html',
        '../../search/search/index.html'
    ];
    let html = null;
    for (let path of paths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                html = await response.text();
                break;
            }
        } catch (e) {
        }
    }
    if (!html) {
        console.error('Ошибка загрузки карточек для поиска: не найден ни один путь');
        return;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    allCards = Array.from(tempDiv.querySelectorAll('.cards-wrapper .card, .cards-wrapper a .card'));
    cardsLoaded = true;
}

function getCardKeywords(card) {
    const tags = Array.from(card.querySelectorAll('.card-tag')).map(tag => tag.textContent.toLowerCase());
    const dataAttrs = ['theme', 'object', 'whatsinside', 'platform'];
    const attrs = dataAttrs.map(attr => (card.dataset[attr] || '').toLowerCase()).filter(Boolean);
    return [...tags, ...attrs].join(' ');
}

searchInput.addEventListener('focus', loadCards, { once: true });

searchInput.addEventListener('input', async function (event) {
    const query = event.target.value.trim().toLowerCase();

    if (query.length > 0) {
        if (!cardsLoaded) await loadCards();

        mainContent.style.display = 'none';
        searchResults.style.display = 'flex';
        searchCardsContainer.innerHTML = '';

        const filtered = allCards.filter(card => getCardKeywords(card).includes(query));

        if (filtered.length === 0) {
            searchCardsContainer.style.display = 'flex';
            searchCardsContainer.style.justifyContent = 'center';
            searchCardsContainer.style.alignItems = 'center';
            
            const noResults = document.createElement('div');
            noResults.className = 'no-results-message heading-l';
            noResults.style.textAlign = 'center';
            noResults.style.marginTop = '10vw';
            noResults.style.marginBottom = '6.53vw';
            noResults.style.maxWidth = 'none';
            noResults.style.width = 'auto';
            noResults.style.lineHeight = '1.5';
            noResults.style.whiteSpace = 'nowrap';
            noResults.textContent = 'No results found';
            searchCardsContainer.appendChild(noResults);
        } else {
            searchCardsContainer.style.display = '';
            searchCardsContainer.style.justifyContent = '';
            searchCardsContainer.style.alignItems = '';
            
            filtered.forEach(card => {
                const clone = card.cloneNode(true);
                if (card.parentElement.tagName === 'A') {
                    const link = card.parentElement.cloneNode(false);
                    link.appendChild(clone);
                    searchCardsContainer.appendChild(link);
                } else {
                    searchCardsContainer.appendChild(clone);
                }
            });
        }
    } else {
        mainContent.style.display = '';
        searchResults.style.display = 'none';
    }
});
