let hasToken = document.cookie.includes("token=");

let page = window.location.pathname;

if (hasToken === true && (page.includes("index.html") || page === "/")) {
    window.location.href = "/secret.html";
}

if (hasToken === false && page.includes("secret.html")) {
    window.location.href = "/index.html";
}
