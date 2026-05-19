const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = '送信処理はダミーです。後ほど担当者よりご連絡いたします。';
    contactForm.reset();
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
});

document.querySelectorAll('.fade-in').forEach((section) => observer.observe(section));
