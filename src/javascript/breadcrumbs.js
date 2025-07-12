document.addEventListener('DOMContentLoaded', function() {
    function updateBreadcrumbsArrows() {
        if (window.innerWidth <= 743) {
            const arrows = document.querySelectorAll('.breadcrumbs .heading-xxs');
            
            arrows.forEach(arrow => {
                if (arrow.textContent === '→') {
                    arrow.textContent = '↓';
                }
            });
        } else {
            const arrows = document.querySelectorAll('.breadcrumbs .heading-xxs');
            
            arrows.forEach(arrow => {
                if (arrow.textContent === '↓') {
                    arrow.textContent = '→';
                }
            });
        }
    }
    updateBreadcrumbsArrows();
    window.addEventListener('resize', updateBreadcrumbsArrows);
});