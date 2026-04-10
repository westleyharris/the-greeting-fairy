// ===================================
// The Greeting Fairy — Site Scripts
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll(
    '.service-card, .gallery-item, .testimonial-card, .section-header, ' +
    '.about-content, .contact-wrapper, .occasion-tag, .stat, ' +
    '.process-step, .review-badge'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest(
          '.services-grid, .gallery-grid, .testimonials-grid, .occasion-tags, .about-stats, .process-grid'
        );
        const delay = parent
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
          : 0;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // --- Contact Form (Formspree) ---
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#7ea87e';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      btn.textContent = 'Oops — try again';
      btn.style.background = '#d4556a';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });

  // --- Gallery Lightbox ---
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.9);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 40px;
        opacity: 0; transition: opacity 0.3s ease;
      `;

      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.alt = img.alt;
      fullImg.style.cssText = `
        max-width: 90%; max-height: 90vh;
        object-fit: contain; border-radius: 16px;
        transform: scale(0.95); transition: transform 0.3s ease;
      `;

      overlay.appendChild(fullImg);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        fullImg.style.transform = 'scale(1)';
      });

      overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        fullImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.style.overflow = '';
        }, 300);
      });
    });
  });

});
