document.addEventListener('DOMContentLoaded', function () {
    const filterBlocks = Array.from(document.querySelectorAll('.filter'));
    const dropdowns = Array.from(document.querySelectorAll('.filter-dropdown'));
    const cards = Array.from(document.querySelectorAll('.card'));
    const loadMoreBtn = document.querySelector('.loadmore');
    
    function getCardsPerPage() {
        const isIpad = window.matchMedia('(min-width: 743px) and (max-width: 1025px)').matches;
        return isIpad ? 12 : 8;
    }
    let shownCount = 0;
    let filteredCards = cards;

    function showDropdown(filter, dropdown) {
        filter.classList.add('active');
        dropdown.style.display = 'flex';
        
        if (isMobileDevice()) {
            setTimeout(() => {
                const dropdownHeight = dropdown.offsetHeight;
                const vwUnit = window.innerWidth / 100;
                const marginBottomVw = dropdownHeight / vwUnit + 2;
                filter.style.marginBottom = `${marginBottomVw}vw`;
            }, 50);
        }
    }
    function hideDropdown(filter, dropdown) {
        filter.classList.remove('active');
        
        if (isMobileDevice()) {
            filter.style.marginBottom = '';
        }
        
        setTimeout(() => {
            if (!filter.classList.contains('active')) {
                dropdown.style.display = 'none';
            }
        }, 300);
    }

    function isMobileDevice() {
        return window.matchMedia('(max-width: 743px)').matches;
    }

    // Навешиваем обработчики на все фильтры
    filterBlocks.forEach(filter => {
        const dropdown = filter.querySelector('.filter-dropdown');
        if (!dropdown) return;
        
        filter.addEventListener('click', () => {
            const isActive = filter.classList.contains('active');
            filterBlocks.forEach(f => hideDropdown(f, f.querySelector('.filter-dropdown')));
            if (!isActive) {
                showDropdown(filter, dropdown);
            }
        });
        
        if (!isMobileDevice()) {
            filter.addEventListener('mouseenter', () => {
                if (!filter.classList.contains('active')) {
                    showDropdown(filter, dropdown);
                }
            });
            filter.addEventListener('mouseleave', () => hideDropdown(filter, dropdown));
        }
    });

    function getAllCheckboxes() {
        return filterBlocks.map(filter => Array.from(filter.querySelectorAll('input[type="checkbox"]')));
    }

    function getCheckedValues(checkboxes) {
        return checkboxes.filter(cb => cb.checked).map(cb => cb.value);
    }

    function updateFilterHighlight() {
        filterBlocks.forEach((filter, idx) => {
            const checkboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]'));
            filter.classList.toggle('selected', getCheckedValues(checkboxes).length > 0);
        });
    }

    function filterCards(reset = true) {
        const allCheckboxGroups = getAllCheckboxes();
        const selectedValues = allCheckboxGroups.map(getCheckedValues);
        const filterAttrs = filterBlocks.map(filter => {
            const dropdown = filter.querySelector('.filter-dropdown');
            if (!dropdown) return null;
            const firstCheckbox = dropdown.querySelector('input[type="checkbox"]');
            if (!firstCheckbox) return null;
            return filter.getAttribute('data-attr');
        });
        filteredCards = cards.filter(card => {
            return selectedValues.every((values, idx) => {
                if (!filterAttrs[idx]) return true;
                const cardAttr = card.getAttribute('data-' + filterAttrs[idx]);
                return values.length === 0 || values.includes(cardAttr);
            });
        });
        if (reset) shownCount = 0;
        showNextCards();
        updateFilterHighlight();
    }

    function showNextCards() {
        const CARDS_PER_PAGE = getCardsPerPage();
        cards.forEach(card => card.style.display = 'none');
        const toShow = filteredCards.slice(0, shownCount + CARDS_PER_PAGE);
        toShow.forEach(card => card.style.display = '');
        shownCount = toShow.length;
        if (shownCount >= filteredCards.length) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        } else {
            if (loadMoreBtn) loadMoreBtn.style.display = '';
        }
    }

    getAllCheckboxes().forEach(checkboxes => {
        checkboxes.forEach(cb => cb.addEventListener('change', () => filterCards(true)));
    });

    filterCards(true);

    document.addEventListener('click', function(event) {
        if (!isMobileDevice()) return;
        
        const clickedInsideFilter = filterBlocks.some(filter => filter.contains(event.target));
        
        if (!clickedInsideFilter) {
            filterBlocks.forEach(filter => {
                const dropdown = filter.querySelector('.filter-dropdown');
                if (dropdown) hideDropdown(filter, dropdown);
            });
        }
    });

    window.addEventListener('resize', function() {
        const CARDS_PER_PAGE = getCardsPerPage();
        if (shownCount > 0) {
            const pages = Math.ceil(shownCount / CARDS_PER_PAGE);
            shownCount = 0;
            for (let i = 0; i < pages; i++) {
                showNextCards();
            }
        }
        
        filterBlocks.forEach(filter => {
            const dropdown = filter.querySelector('.filter-dropdown');
            if (dropdown) hideDropdown(filter, dropdown);
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            showNextCards();
        });
    }
});
