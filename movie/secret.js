let hasToken = document.cookie.includes("token=");

let page = window.location.pathname;

if (hasToken === true && (page.includes("index.html") || page === "/")) {
    window.location.href = "../movie/secret.html";
}

if (hasToken === false && page.includes("secret.html")) {
    window.location.href = "../login card/index.html";
}

// 1. Находим кнопку в коде
document.querySelector("#logout-btn").addEventListener("click", (event) => {
    event.preventDefault();
    
    // 3. Удаляем куку "token"
    // Мы просто ставим время жизни куки (max-age) на 0 секунд.
    document.cookie = "token=; max-age=0; path=/";

    // 4. Вызываем твою функцию, которая переключает страницы
    // Она увидит, что токена больше нет, и покажет форму входа.
    showPage(); 
    
    console.log("Вы вышли из системы");
});


const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('#next-button');
const prevBtn = document.querySelector('#prev-button');
let index = 0; // Номер текущей страницы (0 или 1)

function updateCarousel() {
    const width = document.querySelector('.carousel-window').clientWidth + 15;
    track.style.transition = "transform 0.5s ease-in-out"; // Включаем анимацию
    track.style.transform = `translateX(${-index * width}px)`;
}

// Слушатель для кнопки "Вперед"
nextBtn.addEventListener('click', () => {
    index++;
    updateCarousel();

    // Если мы дошли до клонов (index 2)
    if (index === 2) {
        setTimeout(() => {
            track.style.transition = "none"; // ВЫКЛЮЧАЕМ анимацию
            index = 0;                       // Сбрасываем индекс на начало
            track.style.transform = `translateX(0)`; 
        }, 500); // Ждем ровно 0.5с (время анимации), чтобы прыгнуть
    }
});

// Слушатель для кнопки "Назад"
prevBtn.addEventListener('click', () => {
    if (index === 0) {
        // Если мы в начале, мгновенно прыгаем на клонов в конце
        track.style.transition = "none";
        index = 2;
        const width = document.querySelector('.carousel-window').clientWidth + 15;
        track.style.transform = `translateX(${-index * width}px)`;
        
        // И сразу заставляем браузер плавно поехать на страницу 1
        setTimeout(() => {
            index = 1;
            updateCarousel();
        }, 10);
    } else {
        index--;
        updateCarousel();
    }
});