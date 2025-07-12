const burgerIcon = document.getElementById('burger-icon');
const burgerIconClosed = document.querySelector('.mobile-menu-с');
const popup = document.getElementById('popup');

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

function createMenuContent() {
    popup.innerHTML = '';

    const mainLinks = document.createElement('div');
    mainLinks.className = 'burger-main-links';

    const mainNavLinks = [
        { text: 'Главная', href: '../index.html' },
        { text: 'О нас', href: '../additions/index.html' },
        { text: 'Учебник', href: '../textbook/index.html' },
        { text: 'Полезные ресурсы', href: '../additions/index1.html' }
    ];

    const currentPath = window.location.pathname;
    
    function normalizePath(path) {
        return path.replace(/^\/+|\/+$/g, '');
    }
    
    const normalizedCurrentPath = normalizePath(currentPath);
    
    let activePageFound = false;

    mainNavLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.text;
        linkElement.className = 'heading-xs';
        
        linkElement.style.display = 'block';
        linkElement.style.width = '100%';
        linkElement.style.padding = '5px 0';
        
        const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
        
        if (!activePageFound && normalizedCurrentPath === linkPath) {
            linkElement.style.color = '#FF4702';
            activePageFound = true;
        }
        
        mainLinks.appendChild(linkElement);
    });

    popup.appendChild(mainLinks);

    const menuContainer = document.createElement('div');
    menuContainer.className = 'burger-menu-container';

    for (const category in menuStructure) {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'burger-category-container';

        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'burger-category-header';

        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'heading-xs';
        categoryTitle.textContent = category;
        
        categoryTitle.style.width = '100%';
        categoryTitle.style.padding = '5px 0';

        let categoryUrl = '';
        if (category === 'Маленькие элементы') {
            categoryUrl = '../elements/index-small.html';
        } else if (category === 'Средние элементы') {
            categoryUrl = '../elements/index-medium.html';
        } else if (category === 'Большие элементы') {
            categoryUrl = '../elements/index-large.html';
        }
        
        const categoryPath = normalizePath(new URL(categoryUrl, window.location.origin).pathname);
        
        if (!activePageFound && normalizedCurrentPath === categoryPath) {
            categoryTitle.style.color = '#FF4702';
            activePageFound = true;
        }

        categoryTitle.addEventListener('click', function () {
            window.location.href = categoryUrl;
        });

        const arrow = document.createElement('div');
        arrow.className = 'burger-arrow heading-xs';
        arrow.textContent = '↓';

        categoryHeader.appendChild(categoryTitle);
        categoryHeader.appendChild(arrow);
        categoryContainer.appendChild(categoryHeader);

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'burger-submenu-container';
        itemsContainer.style.display = 'none';
        
        let activeCategoryItem = false;

        const items = menuStructure[category];
        items.forEach(item => {
            const itemLink = document.createElement('a');
            itemLink.href = item.link;
            itemLink.textContent = item.title;
            itemLink.className = 'heading-xs';
            
            itemLink.style.display = 'block';
            itemLink.style.width = '100%';
            itemLink.style.padding = '5px 0';
            
            const itemPath = normalizePath(new URL(item.link, window.location.origin).pathname);
            
            if (!activePageFound && normalizedCurrentPath === itemPath) {
                itemLink.style.color = '#FF4702';
                activePageFound = true;
                activeCategoryItem = true;
            }
            
            itemsContainer.appendChild(itemLink);
        });

        categoryContainer.appendChild(itemsContainer);
        menuContainer.appendChild(categoryContainer);
        
        if (activeCategoryItem) {
            itemsContainer.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
        }

        arrow.addEventListener('click', function (e) {
            e.stopPropagation();
            if (itemsContainer.style.display === 'none') {
                itemsContainer.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                itemsContainer.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    }

    popup.appendChild(menuContainer);
}

if (burgerIconClosed) {
    burgerIconClosed.style.display = 'none';
}

burgerIcon.addEventListener('click', () => {
    if (popup.style.display === 'none' || popup.style.display === '') {
        createMenuContent();
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (burgerIconClosed) {
            burgerIcon.style.display = 'none';
            burgerIconClosed.style.display = 'flex';
        }
    } else {
        popup.style.display = 'none';
        document.body.style.overflow = '';

        if (burgerIconClosed) {
            burgerIcon.style.display = 'flex';
            burgerIconClosed.style.display = 'none';
        }
    }
});

if (burgerIconClosed) {
    burgerIconClosed.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = '';

        burgerIcon.style.display = 'flex';
        burgerIconClosed.style.display = 'none';
    });
}

popup.addEventListener('wheel', function (e) {
    e.stopPropagation();
});