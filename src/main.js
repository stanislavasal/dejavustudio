document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('clickMe');
    let clickCount = 0;
  
    button.addEventListener('click', () => {
      clickCount++;
      button.textContent = `Нажато ${clickCount} раз`;
    });
  
    console.log('JavaScript загружен!');
  });