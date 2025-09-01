document.addEventListener('DOMContentLoaded', function() {
    const burgerToggle = document.querySelector('.burger-toggle');
    const burgerMenu = document.querySelector('.burger-menu-opened');
    const body = document.body;

    function toggleBurgerMenu() {
        const isOpen = burgerMenu.style.display === 'flex';
        const burgerIcon = burgerToggle.querySelector('.sticker-image-burger');
        
        if (isOpen) {
            burgerMenu.style.display = 'none';
            body.style.overflow = '';
            burgerToggle.classList.remove('active');
            burgerIcon.src = './images/header/burger.svg';
            if (searchInputBurger) {
                searchInputBurger.value = '';
                if (burgerSearchResults && burgerNavigation) {
                    burgerSearchResults.style.display = 'none';
                    burgerNavigation.style.display = 'flex';
                }
            }
        } else {
            burgerMenu.style.display = 'flex';
            body.style.overflow = 'hidden';
            burgerToggle.classList.add('active');
            burgerIcon.src = './images/header/close.svg';
        }
    }

    function closeBurgerMenu() {
        const burgerIcon = burgerToggle.querySelector('.sticker-image-burger');
        burgerMenu.style.display = 'none';
        body.style.overflow = '';
        burgerToggle.classList.remove('active');
        burgerIcon.src = './images/header/burger.svg';
    }

    if (burgerToggle) {
        burgerToggle.addEventListener('click', toggleBurgerMenu);
    }

    burgerMenu.addEventListener('click', function(event) {
        if (event.target === burgerMenu) {
            closeBurgerMenu();
        }
    });

    const searchInputBurger = document.querySelector('.search-input-burger');
    const burgerSearchResults = document.querySelector('.burger-search-results');
    const burgerSearchCardsContainer = document.querySelector('.burger-search-cards-container');
    const burgerNavigation = document.querySelector('.burger-navigation');

    if (searchInputBurger) {
        searchInputBurger.addEventListener('focus', function() {
            if (typeof window.loadCards === 'function') {
                window.loadCards();
            }
        }, { once: true });

        searchInputBurger.addEventListener('input', async function(event) {
            const query = event.target.value.trim().toLowerCase();

            if (query.length > 0) {
                if (typeof window.loadCards === 'function' && (!window.cardsLoaded)) {
                    await window.loadCards();
                }

                burgerSearchResults.style.display = 'block';
                burgerNavigation.style.display = 'none';
                burgerSearchCardsContainer.innerHTML = '';

                const filtered = window.allCards ? window.allCards.filter(card => {
                    if (typeof window.getCardKeywords === 'function') {
                        return window.getCardKeywords(card).includes(query);
                    }
                    return false;
                }) : [];

                if (filtered.length === 0) {
                    burgerSearchCardsContainer.style.display = 'flex';
                    burgerSearchCardsContainer.style.justifyContent = 'center';
                    burgerSearchCardsContainer.style.alignItems = 'center';
                    burgerSearchCardsContainer.style.gridTemplateColumns = '1fr';
                    
                    const noResults = document.createElement('div');
                    noResults.className = 'no-results-message heading-l';
                    noResults.style.textAlign = 'center';
                    noResults.style.fontSize = '4.5vw';
                    noResults.style.color = '#000';
                    noResults.textContent = 'No results found';
                    burgerSearchCardsContainer.appendChild(noResults);
                } else {
                    burgerSearchCardsContainer.style.display = 'grid';
                    burgerSearchCardsContainer.style.justifyContent = '';
                    burgerSearchCardsContainer.style.alignItems = '';
                    burgerSearchCardsContainer.style.gridTemplateColumns = '1fr';
                    
                    filtered.forEach(card => {
                        const clone = card.cloneNode(true);
                        if (card.parentElement.tagName === 'A') {
                            const link = card.parentElement.cloneNode(false);
                            link.appendChild(clone);
                            burgerSearchCardsContainer.appendChild(link);
                        } else {
                            burgerSearchCardsContainer.appendChild(clone);
                        }
                    });
                }
            } else {
                burgerSearchResults.style.display = 'none';
                burgerNavigation.style.display = 'flex';
            }
        });
    }
});
