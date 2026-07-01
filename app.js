let novels = [];

async function init() {
  try {
    const res = await fetch('./novels.json');
    if (!res.ok) throw new Error("JSON加载失败");
    novels = await res.json();

    // 根据当前页面决定渲染什么
    if (window.location.pathname.includes('novel.html')) {
      renderNovelDetail();
    } else {
      renderHome();
    }
  } catch (e) {
    console.error(e);
    const el = document.getElementById("novel-list") || document.getElementById("novel-detail");
    if (el) el.innerHTML = "<p style='color:red'>数据加载失败</p>";
  }
}

function renderHome() {
  const el = document.getElementById("novel-list");
  if (!el) return;
  // ... 保持你原来的 renderHome 代码 ...
}

function renderNovelDetail() {
  const el = document.getElementById("novel-detail");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    el.innerHTML = "<p>缺少小说ID参数</p>";
    return;
  }

  // 注意：你 novles.json 里的 id 是带书名的长字符串，要注意匹配方式
  const novel = novels.find(n => n.id === id || n.title.includes(id));

  if (!novel) {
    el.innerHTML = "<p>未找到该小说</p>";
    return;
  }

  el.innerHTML = `
    <h1>${novel.title}</h1>
    <p><strong>分类：</strong>${novel.category}</p>
    <p><strong>简介：</strong>${novel.desc}</p>
    <hr>
    <a href="index.html">← 返回首页</a>
    <!-- 如果以后要显示正文，可以在这里加 -->
  `;
}

// 启动
init();
