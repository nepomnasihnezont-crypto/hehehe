document.addEventListener('DOMContentLoaded', () => {
    // --- ГЕНЕРАЦИЯ ЗВЕЗД ЧЕРЕЗ JS ---
    const starsCount = 45; // Количество звёзд на фоне
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайные координаты, размер и время анимации
        const size = Math.random() * 3 + 1.5; // от 1.5px до 4.5px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`; // от 2 до 5 секунд
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        document.body.appendChild(star);
    }

    // --- МОБИЛЬНОЕ МЕНЮ И БУРГЕР ---
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            dropdowns.forEach(item => {
                if (item !== dropdown) item.classList.remove('open');
            });

            dropdown.classList.toggle('open');
        });
    });

    document.addEventListener('click', () => {
        dropdowns.forEach(item => item.classList.remove('open'));
    });
});
