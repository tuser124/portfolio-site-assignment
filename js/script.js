
document.addEventListener('DOMContentLoaded', () => {

// PC版ナビゲーション
const pcNavLinks = document.querySelectorAll(
    '.header #header-inner nav a[href^="#"]'
);

// activeを解除するタイマー
let activeTimer;

// クリックしたときだけ一時的にactiveにする
pcNavLinks.forEach(link => {
    link.addEventListener('click', () => {

        // 前回のタイマーを解除
        clearTimeout(activeTimer);

        // すべてのactiveを外す
        pcNavLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });

        // クリックしたナビにactiveを付ける
        link.classList.add('active');

        // 0.25秒後にactiveを解除
        activeTimer = setTimeout(() => {
            link.classList.remove('active');
        }, 250);

    });
});

    // ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger-menu');
const wrapper = document.querySelector('.wrapper-hamburger');
const closeButton = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const menuLinks = document.querySelectorAll('.sp-menu a');

// メニューを開く・閉じる共通関数
function toggleMenu(isOpen) {
    wrapper.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute(
        'aria-label',
        isOpen ? 'メニューを閉じる' : 'メニューを開く'
    );

    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// ハンバーガーをタップ
hamburger.addEventListener('click', () => {
    const isOpen = wrapper.classList.contains('is-open');
    toggleMenu(!isOpen);
});

// 閉じるボタンをタップ
closeButton.addEventListener('click', () => {
    toggleMenu(false);
});

// 背景をタップ
overlay.addEventListener('click', () => {
    toggleMenu(false);
});

// メニュー内のリンクをタップ
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu(false);
    });
});

});


// トップへ戻るボタン
const backToTop = document.getElementById('back-to-top');

// スクロール量に応じて表示・非表示を切り替える
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('is-visible');
    } else {
        backToTop.classList.remove('is-visible');
    }
});

// クリックするとページの先頭へ戻る
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});