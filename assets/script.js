const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;

  document.body.classList.toggle('menu-open', open);
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
}

menuButton?.addEventListener('click', () => {
  setMenu(!mobileMenu?.classList.contains('is-open'));
});

menuClose?.addEventListener('click', () => setMenu(false));

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = '送信処理はダミーです。内容をご確認いただきありがとうございます。';
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
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.08,
});

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
