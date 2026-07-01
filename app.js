let novels = [];

async function init() {
  try {
    const res = await fetch('./novels.json');

    if (!res.ok) {
      throw new Error("JSON加载失败");
    }

    novels = await res.json();

    renderHome();
  } catch (err) {
    console.error(err);
    document.getElementById("novel-list").innerHTML =
      "<p style='color:red'>数据加载失败，请检查 novels.json</p>";
  }
}

function renderHome() {
  const container = document.getElementById("novel-list");

  if (!novels || novels.length === 0) {
    container.innerHTML = "<p>暂无小说</p>";
    return;
  }

  let html = "<h2>小说列表</h2><ul>";

  novels.forEach(novel => {
    html += `
      <li>
        <a href="novel.html?id=${novel.id}">
          ${novel.title}
        </a>
        <p>${novel.category} | ${novel.desc}</p>
      </li>
    `;
  });

  html += "</ul>";
  container.innerHTML = html;
}

init();
