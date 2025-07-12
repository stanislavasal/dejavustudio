document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#headerlink');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            this.classList.toggle('clicked');
        });
    });
}); 