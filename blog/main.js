const API_URL = "https://jsonplaceholder.typicode.com";

const postsContainer = document.querySelector("#posts");
const postTemplate = document.querySelector("#post-template");
const commentTemplate = document.querySelector("#comment-template");

// Шаг 1. Получить данные: три запроса одновременно (Promise.all + fetch)
async function loadData() {
    // TODO: запросить /posts, /users, /comments и вернуть { posts, users, comments }
}

// Шаг 2. Собрать один пост: найти юзера (по userId) и комментарии (по postId)
function renderPost(post, users, comments) {
    // TODO: const user = users.find(...)
    // TODO: const postComments = comments.filter(...)
    // TODO: склонировать шаблон: postTemplate.content.cloneNode(true)
    // TODO: вставить данные через textContent
    // TODO: показать первый комментарий, остальные скрыть (класс "hidden")
    // TODO: кнопка "Show more" показывает остальные комментарии
}

// Шаг 3. Один комментарий: email, заголовок (name) и текст (body)
function renderComment(comment) {
    // TODO: склонировать commentTemplate и заполнить
}

async function init() {
    try {
        const data = await loadData();
        // TODO: для каждого поста вызвать renderPost и добавить результат в postsContainer
        console.log(data);
    } catch (error) {
        console.error("Не удалось загрузить данные", error);
    }
}

init();
