let novels = [];

async function init() {
  try {
    const res = await fetch('./novels.json');

    if (!res.ok) {
      throw new Error("JSON加载失败");
    }
    if (!res.ok) throw new Error("JSON加载失败");

    novels = await res.json();

    renderHome();
  } catch (err) {
    console.error(err);
  } catch (e) {
    console.error(e);
    document.getElementById("novel-list").innerHTML =
      "<p style='color:red'>数据加载失败，请检查 novels.json</p>";
      "<p style='color:red'>novels.json 加载失败</p>";
  }
}

function renderHome() {
  const container = document.getElementById("novel-list");
  const el = document.getElementById("novel-list");

  if (!novels || novels.length === 0) {
    container.innerHTML = "<p>暂无小说</p>";
  if (!novels.length) {
    el.innerHTML = "<p>暂无数据</p>";
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
  el.innerHTML =
    "<h2>小说列表</h2><ul>" +
    novels.map(n =>
      `<li>
        <a href="novel.html?id=${n.id}">${n.title}</a>
        <p>${n.category} | ${n.desc}</p>
      </li>`
    ).join("") +
    "</ul>";
}
