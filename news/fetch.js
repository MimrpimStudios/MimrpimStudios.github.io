async function getData() {
  const url = "https://mimrpimstudios.github.io/news/fetch.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function addnews(newsData) {
  if (!newsData) return;

  const newsContainer = document.getElementById("news-container");
  
  // Pokud je v HTML pouze rodicovsky obal, dynamically vlozime vnitrek pomoci zpětných uvozovek ` `:
  newsContainer.innerHTML = `
    <p class="news-date">Date: ${newsData.date}</p>
    <p class="news-id">id: ${newsData.id}</p>
    <h2>${newsData.title}</h2>
    <p>${newsData.text || newsData.content}</p>
  `;
}

// Propojení a spuštění
async function init() {
  const data = await getData();
  addnews(data);
}

init();