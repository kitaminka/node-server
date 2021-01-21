const menuLinks = document.querySelectorAll('nav a.nav__item');

for (const link of menuLinks) {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
}