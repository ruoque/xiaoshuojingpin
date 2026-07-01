let novels = [];

async function init() {
  try {
    const res = await fetch('./novels.json');
    if (!res.ok) throw new Error("JSON加载失败");
    novels = await res.json();

    // 路由判断逻辑
    if (window.location.pathname.includes("novel.html")) {
      renderNovelPage();
    } else {
      renderHome();
    }
  } catch (e) {
    console.error(e);
  }
}

function renderNovelPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const novelId = urlParams.get('id');
  const el = document.getElementById("novel-detail");

  if (!el) return; // 防止在列表页报错

  const book = novels.find(n => n.id === novelId);
  if (book) {
    el.innerHTML = `<h1>${book.title}</h1><p>分类：${book.category}</p><p>${book.desc}</p>`;
  } else {
    el.innerHTML = "<p>未找到该小说详情</p>";
  }
}

function renderHome() {
  const el = document.getElementById("novel-list");
  if (!el) return;
  // ... 原有的 renderHome 逻辑 ...
}

init();
