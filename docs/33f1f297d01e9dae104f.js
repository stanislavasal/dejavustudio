document.addEventListener('DOMContentLoaded', function () {
  // Универсальный поиск всех фильтров и dropdown-меню
  var filterBlocks = Array.from(document.querySelectorAll('.filter'));
  var dropdowns = Array.from(document.querySelectorAll('.filter-dropdown'));
  var cards = Array.from(document.querySelectorAll('.card'));
  var loadMoreBtn = document.querySelector('.loadmore');
  var CARDS_PER_PAGE = 8;
  var shownCount = 0;
  var filteredCards = cards; // Показать/скрыть dropdown

  function showDropdown(filter, dropdown) {
    filter.classList.add('active');
    dropdown.style.display = 'flex';
  }

  function hideDropdown(filter, dropdown) {
    filter.classList.remove('active');
    dropdown.style.display = 'none';
  } // Навешиваем обработчики на все фильтры


  filterBlocks.forEach(function (filter) {
    var dropdown = filter.querySelector('.filter-dropdown');
    if (!dropdown) return;
    filter.addEventListener('mouseenter', function () {
      return showDropdown(filter, dropdown);
    });
    filter.addEventListener('mouseleave', function () {
      return hideDropdown(filter, dropdown);
    });
  }); // Собираем все чекбоксы по фильтрам

  function getAllCheckboxes() {
    return filterBlocks.map(function (filter) {
      return Array.from(filter.querySelectorAll('input[type="checkbox"]'));
    });
  } // Получить выбранные значения по каждому фильтру


  function getCheckedValues(checkboxes) {
    return checkboxes.filter(function (cb) {
      return cb.checked;
    }).map(function (cb) {
      return cb.value;
    });
  } // Подсветка выбранных фильтров


  function updateFilterHighlight() {
    filterBlocks.forEach(function (filter, idx) {
      var checkboxes = Array.from(filter.querySelectorAll('input[type="checkbox"]'));
      filter.classList.toggle('selected', getCheckedValues(checkboxes).length > 0);
    });
  } // Фильтрация карточек по всем фильтрам


  function filterCards() {
    var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var allCheckboxGroups = getAllCheckboxes();
    var selectedValues = allCheckboxGroups.map(getCheckedValues);
    var filterAttrs = filterBlocks.map(function (filter) {
      // data-атрибут для фильтра: ищем по data-*, например data-theme, data-object, data-whatsinside
      var dropdown = filter.querySelector('.filter-dropdown');
      if (!dropdown) return null; // Берём первый чекбокс и смотрим value, чтобы понять, какой data-атрибут фильтрует

      var firstCheckbox = dropdown.querySelector('input[type="checkbox"]');
      if (!firstCheckbox) return null; // value="nature" => ищем data-theme, если themes-filter, и т.д.
      // Для универсальности, добавь data-attr="theme" на .filter, чтобы явно указать

      return filter.getAttribute('data-attr');
    });
    filteredCards = cards.filter(function (card) {
      return selectedValues.every(function (values, idx) {
        if (!filterAttrs[idx]) return true;
        var cardAttr = card.getAttribute('data-' + filterAttrs[idx]);
        return values.length === 0 || values.includes(cardAttr);
      });
    });
    if (reset) shownCount = 0;
    showNextCards();
    updateFilterHighlight();
  }

  function showNextCards() {
    cards.forEach(function (card) {
      return card.style.display = 'none';
    });
    var toShow = filteredCards.slice(0, shownCount + CARDS_PER_PAGE);
    toShow.forEach(function (card) {
      return card.style.display = '';
    });
    shownCount = toShow.length;

    if (shownCount >= filteredCards.length) {
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    } else {
      if (loadMoreBtn) loadMoreBtn.style.display = '';
    }
  } // Навешиваем обработчики на все чекбоксы всех фильтров


  getAllCheckboxes().forEach(function (checkboxes) {
    checkboxes.forEach(function (cb) {
      return cb.addEventListener('change', function () {
        return filterCards(true);
      });
    });
  });
  filterCards(true);

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      showNextCards();
    });
  }
});