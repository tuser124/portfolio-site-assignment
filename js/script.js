document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll(
        '.header nav a[href^="#"]'
    );

    const profileSection = document.querySelector('.profile-layout');
    const worksSection = document.querySelector('#works');
    const contactSection = document.querySelector('#contact');

    function setActiveLinks(ids) {

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            if (ids.includes(href)) {
                link.classList.add('active');
            }
        });
    }

    function updateActiveLink() {

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        const currentPosition =
            scrollPosition + windowHeight * 0.35;

        const profileTop =
            profileSection.getBoundingClientRect().top + scrollPosition;

        const worksTop =
            worksSection.getBoundingClientRect().top + scrollPosition;

        const contactTop =
            contactSection.getBoundingClientRect().top + scrollPosition;

        const isBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;

        if (isBottom) {
            setActiveLinks(['#works', '#contact']);
            return;
        }

        if (
            currentPosition >= profileTop &&
            currentPosition < worksTop
        ) {
            setActiveLinks(['#about', '#skills']);
            return;
        }

        if (
            currentPosition >= worksTop &&
            currentPosition < contactTop
        ) {

            if (contactTop <= scrollPosition + windowHeight) {
                setActiveLinks(['#works', '#contact']);
            } else {
                setActiveLinks(['#works']);
            }

            return;
        }

        if (currentPosition >= contactTop) {
            setActiveLinks(['#contact']);
            return;
        }

        setActiveLinks(['#home']);
    }

    window.addEventListener('scroll', updateActiveLink);

    window.addEventListener('resize', updateActiveLink);

    updateActiveLink();

    const hamburger = document.querySelector('.hamburger-menu');
    const wrapper = document.querySelector('.wrapper-hamburger');
    const closeButton = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const menuLinks = document.querySelectorAll('.sp-menu a');

    function toggleMenu(isOpen) {
        wrapper.classList.toggle('is-open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute(
            'aria-label',
            isOpen ? 'メニューを閉じる' : 'メニューを開く'
        );

        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = wrapper.classList.contains('is-open');
        toggleMenu(!isOpen);
    });

    closeButton.addEventListener('click', () => {
        toggleMenu(false);
    });

    overlay.addEventListener('click', () => {
        toggleMenu(false);
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

});

const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('is-visible');
    } else {
        backToTop.classList.remove('is-visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});