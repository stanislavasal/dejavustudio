const searchInput = document.querySelector('.search-input');
const mainContent = document.getElementById('mainContent');
const searchResults = document.getElementById('searchResults');
const searchCardsContainer = document.getElementById('searchCardsContainer');
const cover = document.querySelector('.cover');
const loadMoreButton = document.getElementById('loadMoreButton');

const hiddenContainer = document.createElement('div');
hiddenContainer.style.display = 'none';
document.body.appendChild(hiddenContainer);

let cardsLoaded = false;

async function loadCards() {
    if (cardsLoaded) return;

    try {
        const response = await fetch('/search/index.html');
        const html = await response.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const cards = tempDiv.querySelectorAll('#articlesContainer .card');

        cards.forEach(card => {
            const cardClone = card.cloneNode(true);
            hiddenContainer.appendChild(cardClone);
        });

        cardsLoaded = true;
    } catch (error) {
        console.error('Ошибка загрузки карточек:', error);
    }
}

searchInput.addEventListener('focus', loadCards, { once: true });

searchInput.addEventListener('input', async function (event) {
    const searchQuery = event.target.value.toLowerCase();

    if (searchQuery.length > 0) {
        if (!cardsLoaded) {
            await loadCards();
        }

        mainContent.style.display = 'none';
        searchResults.style.display = 'flex';
        searchResults.style.flexDirection = 'column';
        
        const footerHeight = document.querySelector('footer')?.offsetHeight || 100;
        searchResults.style.minHeight = `calc(100vh - ${footerHeight}px)`;
        
        if (cover) {
            cover.style.display = 'none';
        }
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }

        const cards = hiddenContainer.querySelectorAll('.card');
        const filteredCards = Array.from(cards).filter(card => {
            const title = card.querySelector('.heading-xs').textContent.toLowerCase();
            return title.includes(searchQuery);
        });

        searchCardsContainer.innerHTML = '';
        searchCardsContainer.style.display = 'grid';
        searchCardsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        searchCardsContainer.style.gap = '20px';
        searchCardsContainer.style.minWidth = '100%';

        const searchTitle = searchResults.querySelector('.heading-m');

        if (filteredCards.length === 0) {
            if (searchTitle) {
                searchTitle.style.textAlign = 'center';
                searchTitle.style.width = '100%';
                searchTitle.style.margin = '20px 0';
            }
            
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.textContent = 'По вашему запросу ничего не найдено';
            noResultsMessage.style.gridColumn = '1 / span 3';
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.width = '100%';
            searchCardsContainer.appendChild(noResultsMessage);
        } else {
            if (searchTitle) {
                searchTitle.style.textAlign = '';
                searchTitle.style.width = '';
                searchTitle.style.margin = '';
            }
            
            filteredCards.forEach(card => {
                const cardClone = card.cloneNode(true);
                cardClone.style.width = '100%';
                cardClone.style.margin = '0';
                searchCardsContainer.appendChild(cardClone);
            });

            const totalCards = searchCardsContainer.children.length;
            const remainder = totalCards % 3;

            if (remainder === 2) {
                const invisibleCard = document.createElement('div');
                invisibleCard.className = 'card invisible';
                invisibleCard.style.visibility = 'hidden';
                invisibleCard.style.height = '0';
                invisibleCard.style.margin = '0';
                searchCardsContainer.appendChild(invisibleCard);
            } else if (remainder === 1) {
                for (let i = 0; i < 2; i++) {
                    const invisibleCard = document.createElement('div');
                    invisibleCard.className = 'card invisible';
                    invisibleCard.style.visibility = 'hidden';
                    invisibleCard.style.height = '0';
                    invisibleCard.style.margin = '0';
                    searchCardsContainer.appendChild(invisibleCard);
                }
            }
        }
    } else {
        mainContent.style.display = 'flex';
        searchResults.style.display = 'none';
        if (cover) {
            cover.style.display = 'block';
        }
        if (loadMoreButton) {
            loadMoreButton.style.display = 'block';
        }
    }
});