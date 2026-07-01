let novels = [];

fetch('novels.json')
  .then(res => res.json())
  .then(data => {
    novels = data;
  });

// 首页渲染
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

// 1. 确保 DOM 加载完成后再执行逻辑
document.addEventListener('DOMContentLoaded', () => {
    // 2. 检查当前页面是否包含目标挂载点，防止在 index.html 报错
    const detailContainer = document.getElementById('novel-detail');
    
    if (detailContainer) {
        // 3. 执行渲染逻辑
        // 确保你的 renderNovelPage 函数在这里被调用
        if (typeof renderNovelPage === 'function') {
            renderNovelPage();
        } else {
            console.error("renderNovelPage 函数未在 app.js 中定义");
        }
    }
});


// 小说详情页渲染
function renderNovelPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const novel = novels.find(n => n.id === id);

  const container = document.getElementById("novel-detail");

  if (!novel) {
    container.innerHTML = "<h2>小说不存在</h2>";
    return;
  }

  container.innerHTML = `
    <h1>${novel.title}</h1>
    <p>${novel.desc}</p>

    <h3>下载 TXT</h3>
    <a href="${novel.file}" download>点击下载</a>

    <br><br>
    <a href="index.html">返回首页</a>
  `;
}
