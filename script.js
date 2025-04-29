const themeSwitcher = document.getElementById('theme-switcher');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Default theme is "theme-default.css"
let currentTheme = 'theme-default.css';

// Ensure the default theme is applied on page load
themeStylesheet.setAttribute('href', currentTheme);

themeSwitcher.addEventListener('click', () => {
    // Toggle between themes
    currentTheme = currentTheme === 'theme-default.css' ? 'theme-soft.css' : 'theme-default.css';
    themeStylesheet.setAttribute('href', currentTheme);
});

document.addEventListener('DOMContentLoaded', () => {
    // 获取所有的 .game-card p 元素
    const paragraphs = document.querySelectorAll('.game-card p');

    // 设置最大字符数
    const maxLength = 45; // 你可以根据需求调整字符数

    paragraphs.forEach((p) => {
        if (p.textContent.length > maxLength) {
            // 截取文字并添加省略号
            p.textContent = p.textContent.slice(0, maxLength) + '...';
        }
    });

    // 获取所有卡片
    const gameCards = document.querySelectorAll('.game-card');

    // 监听卡片点击事件
    gameCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); // 阻止默认行为

            const url = card.getAttribute('data-url'); // 获取卡片的目标 URL

            if (url) {
                const mainContent = document.querySelector('.main-content');
                mainContent.innerHTML = `
                    <iframe src="${url}" style="width: 100%; height: calc(100vh - 100px); border: none;"></iframe>
                `;
            }
        });
    });

    // 返回主页按钮功能
    const backButton = document.getElementById('back-to-home');
    backButton.addEventListener('click', () => {
       // 刷新页面，重新加载首页
       window.location.href = window.location.origin; // 或者使用 location.reload();
    });

    // 社交分享功能
    window.shareOnFacebook = function () {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    window.shareOnTwitter = function () {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this awesome game!');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target'); // 获取目标 ID
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 获取顶部固定导航栏的高度（如果有）
                const offset = document.querySelector('.top-nav')?.offsetHeight || 0;

                // 滚动到目标位置，减去偏移量
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // 平滑滚动
                });
            }
        });
    });

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 搜索按钮点击事件
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase(); // 获取用户输入并转换为小写
        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3').textContent.toLowerCase(); // 获取游戏标题
            if (gameTitle.includes(query)) {
                card.style.display = 'block'; // 显示匹配的卡片
            } else {
                card.style.display = 'none'; // 隐藏不匹配的卡片
            }
        });
    });

    // 输入框按下回车键时触发搜索
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click(); // 模拟点击搜索按钮
        }
    });

    const hotGamesContainer = document.querySelector('.hot-games-container');

    let scrollAmount = 0;
    const scrollStep = 2; // 每次滚动的像素
    const scrollInterval = 30; // 滚动间隔时间（毫秒）

    function autoScroll() {
        scrollAmount += scrollStep;
        hotGamesContainer.scrollLeft = scrollAmount;

        // 如果滚动到末尾，重置为开头
        if (scrollAmount >= hotGamesContainer.scrollWidth - hotGamesContainer.clientWidth) {
            scrollAmount = 0;
        }
    }

    setInterval(autoScroll, scrollInterval);
});