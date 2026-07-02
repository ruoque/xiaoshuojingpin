
// 1. 全局配置与状态
const savedTheme = localStorage.getItem('user-theme') || 'blue';
document.documentElement.setAttribute('data-theme', savedTheme);

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('user-theme', themeName);
}


// 2. 数据源
let novels = [];

async function init() {
  try {
    const res = await fetch('./novels.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}: JSON加载失败`);

    novels = await res.json();
    console.log('成功加载小说数量:', novels.length);  // 调试用

    // 根据页面决定渲染
    if (window.location.pathname.endsWith('novel.html') || 
        window.location.search.includes('id=')) {
      renderNovelDetail();
    } else {
      renderHome();
    }
  } catch (e) {
    console.error('加载失败:', e);
    const listEl = document.getElementById("novel-list");
    if (listEl) {
      listEl.innerHTML = `<p style='color:red'>novels.json 加载失败: ${e.message}</p>`;
    }
  }
}

function renderHome() {
  const el = document.getElementById("novel-list");
  if (!el) {
    console.error('未找到 #novel-list 元素');
    return;
  }

  if (!novels || novels.length === 0) {
    el.innerHTML = "<p>暂无数据</p>";
    return;
  }

  el.innerHTML = `
    <h2>小说列表</h2>
    <ul>
      ${novels.map(n => `
        <li>
          <a href="novel.html?id=${encodeURIComponent(n.id)}">${n.title}</a>
          <p>${n.category} | ${n.desc.substring(0, 100)}...</p>
        </li>
      `).join('')}
    </ul>
  `;
}

function renderNovelDetail() {
  const el = document.getElementById("novel-detail");
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');
  if (!id) {
    el.innerHTML = "<p>缺少小说ID参数</p>";
    return;
  }

  id = decodeURIComponent(id);
  const novel = novels.find(n => n.id === id || n.title === id || n.title.includes(id));

  if (!novel) {
    el.innerHTML = `<p>未找到小说: ${id}</p>`;
    return;
  }



  const imageUrl = novel.image || 'pic/default.jpg';   // 如果没设图片就用默认图
    <!-- 新增：显示图片 -->
    <div style="margin: 20px 0;">
      <img src="${imageUrl}" 
           alt="${novel.title}" 
           style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    </div>



  
  // 生成下载链接（直接指向 txt 文件夹里的文件）
  


  const downloadUrl = novel.file;

  el.innerHTML = `
    <h1>${novel.title}</h1>
    <p><strong>分类：</strong>${novel.category}</p>
    <p><strong>简介：</strong>${novel.desc}</p>
    
    <div style="margin: 25px 0;">
      <a href="${downloadUrl}" 
         download 
         class="download-btn"
         style="display: inline-block; padding: 12px 28px; background: #0066cc; color: white; text-decoration: none; border-radius: 6px; font-size: 16px;">
        📥 下载 TXT 小说全文
      </a>
    </div>


    <hr>
    <a href="index.html">← 返回首页</a>
  `;
}

// 启动
document.addEventListener('DOMContentLoaded', init);
