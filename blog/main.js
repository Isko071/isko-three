const API_URL = "https://jsonplaceholder.typicode.com";

const postsContainer = document.querySelector("#posts");
const postTemplate = document.querySelector("#post-template");
const commentTemplate = document.querySelector("#comment-template");

// GET-запрос, который возвращает JSON; при ошибке сервера выбрасывает исключение
async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status} при запросе ${url}`);
    }
    return response.json();
}

// Шаг 1. Получить данные: три запроса одновременно
async function loadData() {
    const [posts, users, comments] = await Promise.all([
        getJson(`${API_URL}/posts`),
        getJson(`${API_URL}/users`),
        getJson(`${API_URL}/comments`),
    ]);
    return { posts, users, comments };
}

// Шаг 3. Один комментарий: email, заголовок (name) и текст (body)
function renderComment(comment) {
    const fragment = commentTemplate.content.cloneNode(true);

    fragment.querySelector(".comment-email").textContent = comment.email;
    fragment.querySelector(".comment-title").textContent = comment.name;
    fragment.querySelector(".comment-text").textContent = comment.body;

    // возвращаем сам элемент, а не фрагмент: фрагмент после вставки пустеет
    return fragment.querySelector(".comment");
}

// Шаг 2. Один пост: находим юзера (по userId) и комментарии (по postId)
function renderPost(post, users, comments) {
    const user = users.find(u => u.id === post.userId);
    const postComments = comments.filter(c => c.postId === post.id);

    // копия шаблона поста
    const fragment = postTemplate.content.cloneNode(true);

    // шапка и тело поста
    fragment.querySelector(".post-name").textContent = user.name;
    fragment.querySelector(".post-username").textContent = "@" + user.username;
    fragment.querySelector(".post-company-name").textContent = user.company.name;
    fragment.querySelector(".post-title").textContent = post.title;
    fragment.querySelector(".post-text").textContent = post.body;

    // комментарии: показываем только первый, остальные прячем
    fragment.querySelector(".comments-count").textContent = postComments.length;

    const list = fragment.querySelector(".comments-list");
    const extraComments = []; // все комментарии, кроме первого
    postComments.forEach((comment, index) => {
        const commentElement = renderComment(comment);
        if (index > 0) {
            commentElement.classList.add("hidden");
            extraComments.push(commentElement);
        }
        list.append(commentElement);
    });

    // кнопка переключает: "show more" показывает остальные комментарии, "show less" прячет обратно
    const showMoreButton = fragment.querySelector(".show-more-button");
    if (postComments.length <= 1) {
        showMoreButton.classList.add("hidden");
    }
    let expanded = false;
    showMoreButton.addEventListener("click", () => {
        expanded = !expanded;
        extraComments.forEach(element => element.classList.toggle("hidden", !expanded));
        showMoreButton.textContent = expanded ? "show less" : "show more";
    });

    // возвращаем сам пост (<article>), чтобы вставить его на страницу
    return fragment.querySelector(".post");
}

async function init() {
    try {
        const { posts, users, comments } = await loadData();
        posts.forEach(post => {
            postsContainer.append(renderPost(post, users, comments));
        });
    } catch (error) {
        console.error("Не удалось загрузить данные", error);
    }
}

init();
