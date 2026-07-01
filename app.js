let novels = [];

async function init() {
  try {
    const res = await fetch('./novels.json');

    if (!res.ok) throw new Error("JSON加载失败");

    novels = await res.json();

    renderHome();
  } catch (e) {
    console.error(e);
    document.getElementById("novel-list").innerHTML =
      "<p style='color:red'>novels.json 加载失败</p>";
  }
}

function renderHome() {
  const el = document.getElementById("novel-list");

  if (!novels.length) {
    el.innerHTML = "<p>暂无数据</p>";
    return;
  }

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

init();
