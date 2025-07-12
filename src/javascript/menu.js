const menuStructure = {
    'Маленькие элементы': [
        { title: 'Кнопка', link: '../articles/index1.html' },
        { title: 'Ссылка', link: '../articles/index2.html' },
        { title: 'Иконки', link: '../articles/index3.html' },
        { title: 'Курсор', link: '../articles/index4.html' },
        { title: 'Тултипы', link: '../articles/index5.html' },
        { title: 'Индикатор загрузки', link: '../articles/index6.html' },
        { title: 'Поле выбора файла', link: '../articles/index7.html' },
        { title: 'Текстовое поле', link: '../articles/index8.html' },
        { title: 'Список', link: '../articles/index9.html' },
        { title: 'Выпадающий список', link: '../articles/index10.html' },
        { title: 'Поле поиска', link: '../articles/index11.html' },
        { title: 'Индикатор прогресса', link: '../articles/index12.html' },
        { title: 'Оповещение', link: '../articles/index13.html' },
        { title: 'Теги', link: '../articles/index14.html' },
        { title: 'Ползунок диапазона', link: '../articles/index15.html' },
        { title: 'Переключатель', link: '../articles/index16.html' },
        { title: 'Тогл', link: '../articles/index17.html' },
        { title: 'Фильтр', link: '../articles/index18.html' },
        { title: 'Хлебные крошки', link: '../articles/index19.html' },
        { title: 'Рейтинг', link: '../articles/index20.html' }
    ],
    'Средние элементы': [
        { title: 'Форма входа', link: '../articles/index21.html' },
        { title: 'Меню-бар', link: '../articles/index22.html' },
        { title: 'Гамбургер-меню', link: '../articles/index23.html' },
        { title: 'Сайдбар', link: '../articles/index24.html' },
        { title: 'Степпер', link: '../articles/index25.html' },
        { title: 'Аккордеон', link: '../articles/index26.html' },
        { title: 'Слайдер', link: '../articles/index27.html' },
        { title: 'Табы', link: '../articles/index28.html' },
        { title: 'Модальные окна', link: '../articles/index29.html' },
        { title: 'Карточка', link: '../articles/index30.html' },
        { title: 'Таймлайн', link: '../articles/index31.html' },
        { title: 'Форма', link: '../articles/index32.html' },
        { title: 'Система рекомендаций', link: '../articles/index33.html' }
    ],
    'Большие элементы': [
        { title: 'Хедер', link: '../articles/index34.html' },
        { title: 'Футер', link: '../articles/index35.html' },
        { title: 'Многошаговая форма', link: '../articles/index36.html' },
        { title: 'Корзина покупок', link: '../articles/index37.html' },
        { title: 'Система подписки', link: '../articles/index38.html' },
        { title: 'Галерея изображений', link: '../articles/index39.html' },
        { title: 'Лента контента', link: '../articles/index40.html' },
        { title: 'Комментарии', link: '../articles/index41.html' },
        { title: 'Система аутентификации', link: '../articles/index42.html' },
        { title: 'Панель управления', link: '../articles/index43.html' }
    ]
};

const textbookMenu = document.getElementById('textbook-menu');
textbookMenu.classList.add('menu-item');

const submenu = document.createElement('div');
submenu.className = 'submenu';
submenu.style.display = 'none'; 

for (const category in menuStructure) {
    const submenuItem = document.createElement('div');
    submenuItem.className = 'submenu-item';

    const categoryText = document.createElement('p');
    categoryText.textContent = category;
    
    if (category === 'Маленькие элементы') {
        categoryText.addEventListener('click', function() {
            window.location.href = '../elements/index-small.html'; 
        });
    } else if (category === 'Средние элементы') {
        categoryText.addEventListener('click', function() {
            window.location.href = '../elements/index-medium.html'; 
        });
    } else if (category === 'Большие элементы') {
        categoryText.addEventListener('click', function() {
            window.location.href = '../elements/index-large.html'; 
        });
    }
    
    submenuItem.appendChild(categoryText);

    const arrow = document.createElement('p');
    arrow.textContent = '↓';
    arrow.className = 'arrow';
    submenuItem.appendChild(arrow);

    const secondaryMenu = document.createElement('div');
    secondaryMenu.className = 'secondary-menu';

    menuStructure[category].forEach(item => {
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;
        secondaryMenu.appendChild(link);
    });

    submenuItem.appendChild(secondaryMenu);
    submenu.appendChild(submenuItem);
}

textbookMenu.appendChild(submenu);

textbookMenu.addEventListener('mouseenter', function () {
    submenu.style.display = 'flex'; 
});

textbookMenu.addEventListener('mouseleave', function () {
    submenu.style.display = 'none'; 
    document.querySelectorAll('.secondary-menu').forEach(menu => {
        menu.style.display = 'none'; 
    });
});

const submenuItems = document.querySelectorAll('.submenu-item');
submenuItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        const secondaryMenu = this.querySelector('.secondary-menu');
        document.querySelectorAll('.secondary-menu').forEach(menu => {
            menu.style.display = 'none';
        });
        if (secondaryMenu) {
            secondaryMenu.style.display = 'block';
        }
    });
});