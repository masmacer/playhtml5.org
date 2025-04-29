function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this awesome game!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnReddit() {
    const url = window.location.href; // 获取当前页面的 URL
    const title = document.title; // 获取页面标题
    const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(redditShareUrl, '_blank'); // 在新窗口中打开 Reddit 分享链接
}

function shareIframeOnFacebook() {
    captureIframeScreenshot().then((screenshotUrl) => {
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, '_blank');
        console.log('Screenshot captured for Facebook:', screenshotUrl);
    }).catch((error) => {
        console.error('Failed to capture iframe screenshot:', error);
    });
}

function shareIframeOnTwitter() {
    captureIframeScreenshot().then((screenshotUrl) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this awesome game!');
        const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        window.open(shareUrl, '_blank');
        console.log('Screenshot captured for Twitter:', screenshotUrl);
    }).catch((error) => {
        console.error('Failed to capture iframe screenshot:', error);
    });
}

function captureIframeScreenshot() {
    return new Promise((resolve, reject) => {
        const iframe = document.querySelector('iframe'); // 选择 iframe 元素
        if (!iframe) {
            reject('Iframe not found');
            return;
        }
        html2canvas(iframe, { useCORS: true }).then((canvas) => {
            const screenshotUrl = canvas.toDataURL('image/png'); // 将截图转换为 Base64 URL
            resolve(screenshotUrl);
        }).catch((error) => {
            reject(error);
        });
    });
}

function toggleFullScreen() {
    const iframe = document.querySelector('iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { // Safari
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

function goToHome() {
    if (window.top !== window.self) {
        // 如果页面嵌套在 iframe 中，跳出 iframe 并跳转到主页
        window.top.location.href = "/index.html"; // 替换为主页的实际路径
    } else {
        // 如果页面不在 iframe 中，直接跳转到主页
        window.location.href = "/index.html"; // 替换为主页的实际路径
    }
}