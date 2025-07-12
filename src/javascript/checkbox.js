document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('mouseover', function() {
            if (this.style.color === 'rgb(255, 71, 2)') {
                this.textContent = '□';
            } else {
                this.textContent = '■';
            }
        });
        
        checkbox.addEventListener('mouseout', function() {
            if (this.style.color === 'rgb(255, 71, 2)') {
                this.textContent = '■';
            } else {
                this.textContent = '□';
            }
        });
        
        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
            const checklistItem = this.previousElementSibling;
            
            if (this.style.color === 'rgb(255, 71, 2)') {
                this.style.color = '';
                checklistItem.style.color = '';
                this.textContent = '□';
            } else {
                this.style.color = '#FF4702';
                checklistItem.style.color = '#FF4702';
                this.textContent = '■';
            }
        });
    });
});