document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Открытие/закрытие главного мобильного меню
    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });

    // Раскрытие подразделов (Взрослое / Детское) на мобильных и ПК
    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        
        toggleBtn.addEventListener('click', (e) => {
            // На мобильных отменяем стандартное поведение, чтобы открылся список
            e.stopPropagation();
            
            // Закрываем остальные открытые списки
            dropdowns.forEach(item => {
                if (item !== dropdown) item.classList.remove('open');
            });

            dropdown.classList.toggle('open');
        });
    });

    // Закрывать меню при клике в любое место экрана
    document.addEventListener('click', () => {
        dropdowns.forEach(item => item.classList.remove('open'));
    });
});