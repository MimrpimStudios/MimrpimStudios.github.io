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

  // Řazení od největšího ID po nejmenší (od nejnovější po nejstarší)
  const sortedNews = [...newsItems].sort((a, b) => Number(b.id) - Number(a.id));

  newsContainer.innerHTML = sortedNews.map(item => `
    <div class="newsbox">
      <p class="news-date">Date: ${item.date}</p>
      <p class="news-id">id: ${item.id}</p>
      <h2>${item.title}</h2>
      <p>${item.content}</p>
    </div>
  `).join("");
}

async function init() {
  const data = await getData();
  addnews(data);
}

init();