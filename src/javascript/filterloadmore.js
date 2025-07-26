document.addEventListener('DOMContentLoaded', function () {

    const themeFilter = document.getElementById('themes-filter');
    const objectFilter = document.getElementById('objects-filter');
    const themeDropdown = document.getElementById('themes-dropdown');
    const objectDropdown = document.getElementById('objects-dropdown');

    function showDropdown(filter, dropdown) {
        filter.classList.add('active');
        dropdown.style.display = 'flex';
    }
    function hideDropdown(filter, dropdown) {
        filter.classList.remove('active');
        dropdown.style.display = 'none';
    }

    themeFilter.addEventListener('mouseenter', () => showDropdown(themeFilter, themeDropdown));
    themeFilter.addEventListener('mouseleave', () => hideDropdown(themeFilter, themeDropdown));
    objectFilter.addEventListener('mouseenter', () => showDropdown(objectFilter, objectDropdown));
    objectFilter.addEventListener('mouseleave', () => hideDropdown(objectFilter, objectDropdown));

    const cards = Array.from(document.querySelectorAll('.card'));
    const themeCheckboxes = themeDropdown.querySelectorAll('input[type="checkbox"]');
    const objectCheckboxes = objectDropdown.querySelectorAll('input[type="checkbox"]');
    const loadMoreBtn = document.querySelector('.loadmore');
    const CARDS_PER_PAGE = 8;
    let shownCount = 0;
    let filteredCards = cards;

    function getCheckedValues(checkboxes) {
        return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    }

    function updateFilterHighlight() {
        themeFilter.classList.toggle('selected', getCheckedValues(themeCheckboxes).length > 0);
        objectFilter.classList.toggle('selected', getCheckedValues(objectCheckboxes).length > 0);
    }

    function filterCards(reset = true) {
        const selectedThemes = getCheckedValues(themeCheckboxes);
        const selectedObjects = getCheckedValues(objectCheckboxes);
        filteredCards = cards.filter(card => {
            const cardTheme = card.getAttribute('data-theme');
            const cardObject = card.getAttribute('data-object');
            const themeMatch = selectedThemes.length === 0 || selectedThemes.includes(cardTheme);
            const objectMatch = selectedObjects.length === 0 || selectedObjects.includes(cardObject);
            return themeMatch && objectMatch;
        });
        if (reset) shownCount = 0;
        showNextCards();
        updateFilterHighlight();
    }

    function showNextCards() {
        cards.forEach(card => card.style.display = 'none');
        const toShow = filteredCards.slice(0, shownCount + CARDS_PER_PAGE);
        toShow.forEach(card => card.style.display = '');
        shownCount = toShow.length;
        if (shownCount >= filteredCards.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = '';
        }
    }

    filterCards(true);

    themeCheckboxes.forEach(cb => cb.addEventListener('change', () => filterCards(true)));
    objectCheckboxes.forEach(cb => cb.addEventListener('change', () => filterCards(true)));

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            showNextCards();
        });
    }
});
