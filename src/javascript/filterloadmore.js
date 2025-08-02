document.addEventListener('DOMContentLoaded', function () {
    // Универсальный поиск всех фильтров и dropdown-меню
    const filterBlocks = Array.from(document.querySelectorAll('.filter'));
    const dropdowns = Array.from(document.querySelectorAll('.filter-dropdown'));
    const cards = Array.from(document.querySelectorAll('.card'));
    const loadMoreBtn = document.querySelector('.loadmore');
    const CARDS_PER_PAGE = 8;
    let shownCount = 0;
    let filteredCards = cards;

    // Показать/скрыть dropdown
    function showDropdown(filter, dropdown) {
        filter.classList.add('active');
        dropdown.style.display = 'flex';
    }
    function hideDropdown(filter, dropdown) {
        filter.classList.remove('active');
        dropdown.style.display = 'none';
    }

    // Навешиваем обработчики на все фильтры
    filterBlocks.forEach(filter => {
        const dropdown = filter.querySelector('.filter-dropdown');
        if (!dropdown) return;
        filter.addEventListener('mouseenter', () => showDropdown(filter, dropdown));
        filter.addEventListener('mouseleave', () => hideDropdown(filter, dropdown));
    });

    // Собираем все чекбоксы по фильтрам
    function getAllCheckboxes() {
        return filterBlocks.map(filter => Array.from(filter.querySelectorAll('input[type="checkbox"]')));
    }

    // Получить выбранные значения по каждому фильтру
    function getCheckedValues(checkboxes) {
        return checkboxes.filter(cb => cb.checked).map(cb => cb.value);
    }

    // Подсветка выбранных фильтров
    function updateFilterHighlight() {
        filterBlocks.forEach((filter, idx) => {
            const checkboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]'));
            filter.classList.toggle('selected', getCheckedValues(checkboxes).length > 0);
        });
    }

    // Фильтрация карточек по всем фильтрам
    function filterCards(reset = true) {
        const allCheckboxGroups = getAllCheckboxes();
        const selectedValues = allCheckboxGroups.map(getCheckedValues);
        const filterAttrs = filterBlocks.map(filter => {
            // data-атрибут для фильтра: ищем по data-*, например data-theme, data-object, data-whatsinside
            const dropdown = filter.querySelector('.filter-dropdown');
            if (!dropdown) return null;
            // Берём первый чекбокс и смотрим value, чтобы понять, какой data-атрибут фильтрует
            const firstCheckbox = dropdown.querySelector('input[type="checkbox"]');
            if (!firstCheckbox) return null;
            // value="nature" => ищем data-theme, если themes-filter, и т.д.
            // Для универсальности, добавь data-attr="theme" на .filter, чтобы явно указать
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

    // Навешиваем обработчики на все чекбоксы всех фильтров
    getAllCheckboxes().forEach(checkboxes => {
        checkboxes.forEach(cb => cb.addEventListener('change', () => filterCards(true)));
    });

    filterCards(true);

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            showNextCards();
        });
    }
});
