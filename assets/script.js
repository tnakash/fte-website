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

const sideCopies = document.querySelectorAll('.side-copy');
const messageSection = document.getElementById('message');
const worksSection = document.getElementById('works');

if (sideCopies.length && messageSection) {
  let ticking = false;

  const updateSideCopyOpacity = () => {
    const fadeEnd = worksSection ? worksSection.offsetTop : messageSection.offsetTop + messageSection.offsetHeight;
    const progress = Math.min(Math.max(window.scrollY / fadeEnd, 0), 1);
    const opacity = 0.84 * (1 - progress);

    sideCopies.forEach((copy) => {
      copy.style.setProperty('--side-copy-opacity', opacity.toFixed(3));
    });

    ticking = false;
  };

  const requestSideCopyUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateSideCopyOpacity);
  };

  updateSideCopyOpacity();
  window.addEventListener('scroll', requestSideCopyUpdate, { passive: true });
  window.addEventListener('resize', requestSideCopyUpdate);
}
