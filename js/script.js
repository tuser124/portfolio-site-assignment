
document.addEventListener('DOMContentLoaded', () => {

    // ヘッダーのナビゲーションリンクを取得
    const navLinks = document.querySelectorAll(
        '.header nav a[href^="#"]'
    );

    // 各セクションを取得
    const profileSection = document.querySelector('.profile-section');
    const worksSection = document.querySelector('#works');
    const contactSection = document.querySelector('#contact');

    // activeを付けるリンクを指定する関数
    function setActiveLinks(ids) {

        // すべてのactiveを外す
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 指定されたリンクにactiveを付ける
        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            if (ids.includes(href)) {
                link.classList.add('active');
            }
        });
    }

    // スクロール位置に応じてactiveを切り替える関数
    function updateActiveLink() {

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // 画面の上から35%の位置を判定基準にする
        const currentPosition =
            scrollPosition + windowHeight * 0.35;

        // 各セクションのページ上部からの位置を取得
        const profileTop =
            profileSection.getBoundingClientRect().top + scrollPosition;

        const worksTop =
            worksSection.getBoundingClientRect().top + scrollPosition;

        const contactTop =
            contactSection.getBoundingClientRect().top + scrollPosition;

        // ページの最下部に到達したか判定
        const isBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;

        // ① ページ最下部：WorksとContactを同時にactive
        if (isBottom) {
            setActiveLinks(['#works', '#contact']);
            return;
        }

        // ② AboutとSkillsの範囲：両方をactive
        if (
            currentPosition >= profileTop &&
            currentPosition < worksTop
        ) {
            setActiveLinks(['#about', '#skills']);
            return;
        }

        // ③ Worksの範囲
        if (
            currentPosition >= worksTop &&
            currentPosition < contactTop
        ) {

            // Contactが画面内に入ってきたら両方をactive
            if (contactTop <= scrollPosition + windowHeight) {
                setActiveLinks(['#works', '#contact']);
            } else {
                setActiveLinks(['#works']);
            }

            return;
        }

        // ④ Contactの範囲
        if (currentPosition >= contactTop) {
            setActiveLinks(['#contact']);
            return;
        }

        // ⑤ それ以外はHomeをactive
        setActiveLinks(['#home']);
    }

    // スクロール時に実行
    window.addEventListener('scroll', updateActiveLink);

    // 画面サイズ変更時にも実行
    window.addEventListener('resize', updateActiveLink);

    // ページを開いたときにも実行
    updateActiveLink();

});
