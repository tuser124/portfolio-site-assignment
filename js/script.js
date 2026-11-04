document.addEventListener('DOMContentLoaded', () => {

    // ナビゲーションのリンクを取得
    const navLinks = document.querySelectorAll('nav a[href^="#"]'); 

    // 各リンクに対応するセクションを取得
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(section => section !== null);

    // AboutとSkillsを含む親要素を取得
    const profileSection = document.querySelector('.profile-section');

    // スクロール位置に応じてactiveを切り替える関数
    function updateActiveLink() {

        const currentPosition =
            window.scrollY + window.innerHeight * 0.35;

        // すべてのリンクからactiveを外す
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // AboutとSkillsの範囲内か判定
        const profileTop =
            profileSection.getBoundingClientRect().top + window.scrollY;

        const profileBottom =
            profileTop + profileSection.offsetHeight;

        if (
            currentPosition >= profileTop &&
            currentPosition < profileBottom
        ) {
            // AboutとSkillsの両方をactiveにする
            navLinks.forEach(link => {
                const href = link.getAttribute('href');

                if (href === '#about' || href === '#skills') {
                    link.classList.add('active');
                }
            });

            return;
        }

        // 通常のセクションのactive判定
        let currentSection = sections[0];

        sections.forEach(section => {
            // AboutとSkillsは上でまとめて判定したので除外
            if (
                section.id === 'about' ||
                section.id === 'skills'
            ) {
                return;
            }

            const sectionTop =
                section.getBoundingClientRect().top + window.scrollY;

            if (sectionTop <= currentPosition) {
                currentSection = section;
            }
        });

        // 該当するリンクにactiveをつける
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection.id}`) {
                link.classList.add('active');
            }
        });
    }

    // スクロール時に実行
    window.addEventListener('scroll', updateActiveLink);

    // 画面サイズ変更時にも実行
    window.addEventListener('resize', updateActiveLink);

    // 最初の表示時にも実行
    updateActiveLink();

});