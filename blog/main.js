const API_URL = "https://jsonplaceholder.typicode.com";

const postsContainer = document.querySelector("#posts");
const postTemplate = document.querySelector("#post-template");
const commentTemplate = document.querySelector("#comment-template");

/*
Классы внутри шаблона поста (#post-template):
    .post             сам пост (<article>)
    .post-name        имя юзера
    .post-username    username (в макете с @)
    .post-company-name  название компании
    .post-title       заголовок поста
    .post-text        текст поста
    .comments-count   число комментариев (скобки уже в HTML)
    .comments-list    сюда добавляются комментарии
    .show-more-button кнопка "show more"

Классы внутри шаблона комментария (#comment-template):
    .comment          сам комментарий
    .comment-email    email
    .comment-title    заголовок (поле name)
    .comment-text     текст (поле body)

Класс .hidden скрывает элемент (display: none).
*/

// Шаг 1. Получить данные: запросы на /posts, /users и /comments (fetch)
async function loadData() {
    // TODO: вернуть { posts, users, comments }
}

// Шаг 2. Собрать один пост: найти юзера (по userId) и комментарии (по postId)
function renderPost(post, users, comments) {
    // TODO: склонировать postTemplate.content и заполнить данными (textContent)
    // TODO: показать первый комментарий, остальные скрыть
    // TODO: кнопка "show more" показывает остальные комментарии
    // TODO: вернуть готовый пост
}

// Шаг 3. Один комментарий: email, заголовок и текст
function renderComment(comment) {
    // TODO: склонировать commentTemplate.content и заполнить данными
    // TODO: вернуть готовый комментарий
}

async function init() {
    try {
        const data = await loadData();
        console.log(data);
        // TODO: для каждого поста вызвать renderPost и добавить результат в postsContainer
    } catch (error) {
        console.error("Не удалось загрузить данные", error);
    }
}

init();
