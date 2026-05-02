
document.querySelector("#submit-button").addEventListener("click", (event) => {
    event.preventDefault();

    // получение логина
    let login = document.querySelector("#login").value;

    // получение пароля
    let password = document.querySelector("#password").value;
    
    let correctLogin = "admin@email.com";
    let correctPass = "12345"

    // Валидация логина и пароля
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login)) {
        document.querySelector("#login").classList.add("invalid-input");
        return;
    } else {
        document.querySelector("#login").classList.remove("invalid-input");
    }

    if (password.length < 5) {
        document.querySelector("#password").classList.add("invalid-input");
        return;
    } else {
        document.querySelector("#password").classList.remove("invalid-input"); 
    }

    // Проверка правильности логина и пароля
    if (login !== correctLogin) {
        document.querySelector(".login-failed").classList.add("login-failed-show");
        document.querySelector('.login-failed span').textContent = 'Login is incorrect!';
        return;
    } else {
        document.querySelector(".login-failed").classList.remove("login-failed-show");
        document.querySelector('.login-failed span').textContent = '-';
    }

    if (password !== correctPass) {
        document.querySelector(".login-failed").classList.add("login-failed-show");
        document.querySelector('.login-failed span').textContent = 'Password is incorrect!';
        return;
    } else {
        document.querySelector(".login-failed").classList.remove("login-failed-show");
        document.querySelector('.login-failed span').textContent = '-';
    }
    // Если все верно, сохраняем токен в куки
    document.cookie = "token=12345; max-age=86400; path=/;";

    window.location.href = "/secret.html";

});
