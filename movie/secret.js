let hasToken = document.cookie.includes("token=");

let page = window.location.pathname;

if ((hasToken) && (page.includes("../index.html") || page === "/")) {
    window.location.href = "../movie/index.html";
}

if (hasToken === false && page.includes("../index.html")) {
    window.location.href = "../index.html";
}

// 1. Находим элементы главного блока
const mainPoster = document.getElementById('main-poster');
const mainTitle = document.getElementById('main-title');
const mainDesc = document.getElementById('main-description');
const mainDirector = document.getElementById('main-director');
const mainActors = document.getElementById('main-actors');
const mainRatingValue = document.getElementById('main-rating-value'); // Нашли узел с цифрами

// 2. Находим все карточки в карусели
const carouselCards = document.querySelectorAll('.poster-wrapper');

carouselCards.forEach(card => {
    card.addEventListener('click', () => {
        
        // --- ШАГ А: Запоминаем текущие текстовые данные главного фильма ---
        const oldMainSrc = mainPoster.src;
        const oldMainTitle = mainTitle.textContent;
        const oldMainDesc = mainDesc.textContent;
        const oldMainDirector = mainDirector.textContent;
        const oldMainActors = mainActors.textContent;
        const oldMainRating = mainRatingValue.textContent; // Запомнили чистые цифры (н-р, "7.3/10")

        // --- ШАГ Б: Берем данные из карточки, на которую кликнули ---
        const clickedImg = card.querySelector('.carousel-img');
        const newSrc = clickedImg.src;
        const newTitle = card.getAttribute('data-title');
        const newYear = card.getAttribute('data-year');
        const newDesc = card.getAttribute('data-description');
        const newDirector = card.getAttribute('data-director');
        const newActors = card.getAttribute('data-actors');
        const newRating = card.getAttribute('data-rating'); // Берем новые цифры (н-р, "8.8/10")

        // --- ШАГ В: Обновляем главный блок контентом из карусели ---
        mainPoster.src = newSrc;
        mainTitle.textContent = `${newTitle} (${newYear})`;
        mainDesc.textContent = newDesc;
        mainDirector.textContent = newDirector;
        mainActors.textContent = newActors;
        mainRatingValue.textContent = newRating; // Просто меняем текст цифр, картинки вокруг не пострадают!

        // --- ШАГ Г: Отправляем старый главный фильм вниз в карусель ---
        clickedImg.src = oldMainSrc;
        
        // Обновляем текстовое превью внутри overlay карточки в карусели
        card.querySelector('.poster-title').textContent = oldMainTitle.split(' (')[0];
        card.querySelector('.poster-year').textContent = oldMainTitle.match(/\(([^)]+)\)/)?.[1] || '';
        
        // Перезаписываем data-атрибуты карточки старыми данными верха, чтобы рокировка работала по кругу
        card.setAttribute('data-title', oldMainTitle.split(' (')[0]);
        card.setAttribute('data-year', oldMainTitle.match(/\(([^)]+)\)/)?.[1] || '');
        card.setAttribute('data-description', oldMainDesc);
        card.setAttribute('data-director', oldMainDirector);
        card.setAttribute('data-actors', oldMainActors);
        card.setAttribute('data-rating', oldMainRating);
    });
});




// 1. Находим кнопку в коде
document.querySelector("#logout-btn").addEventListener("click", (event) => {
    event.preventDefault();

    document.cookie = "token=; max-age=0; path=/";

    showPage(); 
    
    console.log("Вы вышли из системы");
});

const posters = document.querySelectorAll('.poster-wrapper');
const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('#next-button');
const prevBtn = document.querySelector('#prev-button');
let index = 0;

function updateCarousel() {
    const width = document.querySelector('.carousel-window').clientWidth + 15;
    track.style.transition = "transform 0.5s ease-in-out";
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
            index = 0;
            track.style.transform = `translateX(0)`; 
        }, 500); // Ждем ровно 0.5с, чтобы прыгнуть
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