async function getData() {
  const url = "https://mimrpimstudios.github.io/news/fetch.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

function addnews(newsItems) {
  const newsContainer = document.getElementById("news-container");

  if (!Array.isArray(newsItems) || newsItems.length === 0) {
    newsContainer.innerHTML = "<p>No news available.</p>";
    return;
  }

  // Podle tvého systému: id 1 = nejnovější, pak 2, 3, ...
  const sortedNews = [...newsItems].sort((a, b) => Number(a.id) - Number(b.id));

  newsContainer.innerHTML = sortedNews.map(item => `
    <article class="news-item">
      <p class="news-date">Date: ${item.date}</p>
      <p class="news-id">id: ${item.id}</p>
      <h2>${item.title}</h2>
      <p>${item.content}</p>
    </article>
  `).join("");
}

async function init() {
  const data = await getData();
  addnews(data);
}

init();