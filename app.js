let novels = [];

async function init() {
  const res = await fetch('./novels.json');
  novels = await res.json();

  renderHome();
}

function renderHome() {
  const container = document.getElementById("novel-list");

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

init(); // ✅ 统一入口
