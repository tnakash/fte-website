const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const mediaVideoButton = document.querySelector('.media-video[data-youtube-src]');

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

mediaVideoButton?.addEventListener('click', () => {
  const src = mediaVideoButton.dataset.youtubeSrc;
  if (!src) return;

  const videoFrame = document.createElement('div');
  videoFrame.className = 'media-video is-playing';

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = '\u5F53\u793E\u4EE3\u8868\u304C\u51FA\u6F14\u3057\u305FYouTube\u52D5\u753B';
  iframe.width = '840';
  iframe.height = '473';
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  videoFrame.append(iframe);
  mediaVideoButton.replaceWith(videoFrame);
});

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

const forgottenThreadPaths = document.querySelectorAll('.forgotten-thread-path');
const forgottenThread = document.querySelector('.forgotten-thread');
const forgottenHeroLogo = document.querySelector('.forgotten-hero-logo');

if (forgottenThreadPaths.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const threadLength = forgottenThreadPaths[0].getTotalLength();
  const threadStartRatio = 80 / 260;
  const heroAnchorRatio = 0.86;
  const threadAnchorOffset = -15;

  const updateForgottenThreadAnchor = () => {
    if (!forgottenThread || !forgottenHeroLogo) return;

    const logoRect = forgottenHeroLogo.getBoundingClientRect();
    const threadRect = forgottenThread.getBoundingClientRect();
    const anchorX = logoRect.left + window.scrollX + (logoRect.width * heroAnchorRatio) + threadAnchorOffset;
    const threadLeft = anchorX - (threadRect.width * threadStartRatio);

    forgottenThread.style.setProperty('--forgotten-thread-left', `${threadLeft.toFixed(2)}px`);
  };

  forgottenThreadPaths.forEach((path) => {
    path.style.strokeDasharray = String(threadLength);
  });

  if (reduceMotion) {
    forgottenThreadPaths.forEach((path) => {
      path.style.strokeDashoffset = '0';
    });
    updateForgottenThreadAnchor();
    window.addEventListener('load', updateForgottenThreadAnchor);
    window.addEventListener('resize', updateForgottenThreadAnchor);
  } else {
    let ticking = false;

    const updateForgottenThread = () => {
      updateForgottenThreadAnchor();

      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max((window.scrollY + window.innerHeight * 0.32) / (scrollable * 0.58), 0), 1);

      forgottenThreadPaths.forEach((path) => {
        path.style.strokeDashoffset = String(threadLength * (1 - progress));
      });
      ticking = false;
    };

    const requestForgottenThreadUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateForgottenThread);
    };

    updateForgottenThread();
    window.addEventListener('load', requestForgottenThreadUpdate);
    window.addEventListener('scroll', requestForgottenThreadUpdate, { passive: true });
    window.addEventListener('resize', requestForgottenThreadUpdate);
  }
}
