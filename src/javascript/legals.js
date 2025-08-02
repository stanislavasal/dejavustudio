document.addEventListener('DOMContentLoaded', function() {
    const legalsContainers = document.querySelectorAll('.legals-container');
    function updateTitlePositions() {
        legalsContainers.forEach((container, index) => {
            const title = container.querySelector('.legals-title');
            const text = container.querySelector('.legals-text');
            if (!title || !text) return;

            let triggerOffset = 300;
            let transition = 'transform 0.1s ease-out';
            if (index === 0) triggerOffset = 170;
            if (index === legalsContainers.length - 1) transition = 'transform 0.7s cubic-bezier(.4,0,.2,1)';

            const containerRect = container.getBoundingClientRect();
            const titleHeight = title.offsetHeight;
            const maxOffset = text.offsetHeight - titleHeight;
            let offset = 0;

            if (index === legalsContainers.length - 1) {
                const windowHeight = window.innerHeight;
                const textBottom = text.getBoundingClientRect().bottom;
                if (containerRect.top <= triggerOffset) {
                    const scrolledPastContainer = Math.abs(containerRect.top - triggerOffset);
                    offset = Math.min(scrolledPastContainer, maxOffset);
                }
                if (textBottom < windowHeight) {
                    offset = maxOffset;
                }
            } else {
                if (containerRect.top <= triggerOffset) {
                    const scrolledPastContainer = Math.abs(containerRect.top - triggerOffset);
                    offset = Math.min(scrolledPastContainer, maxOffset);
                }
            }

            title.style.transform = `translateY(${offset}px)`;
            title.style.transition = transition;
        });
    }
    window.addEventListener('scroll', updateTitlePositions);
    updateTitlePositions();
});
