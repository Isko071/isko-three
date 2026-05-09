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