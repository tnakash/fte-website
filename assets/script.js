const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
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

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    formMessage.textContent = '\u9001\u4FE1\u4E2D\u3067\u3059\u3002';
    if (submitButton) submitButton.disabled = true;

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Form submission failed');

        contactForm.reset();
        formMessage.textContent = '\u304A\u554F\u3044\u5408\u308F\u305B\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002';
      })
      .catch(() => {
        formMessage.textContent = '\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6642\u9593\u3092\u304A\u3044\u3066\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002';
      })
      .finally(() => {
        if (submitButton) submitButton.disabled = false;
      });
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

if (sideCopies.length && messageSection) {
  let ticking = false;

  const updateSideCopyOpacity = () => {
    const fadeEnd = Math.max(messageSection.offsetTop, 1);
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
