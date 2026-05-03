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

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all open items
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        openItem.classList.remove('active');
        const openBtn = openItem.querySelector('.faq-question');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Balloon Color Visualizer ---
  const COLOR_FAMILIES = [
    {
      label: 'Whites & Neutrals',
      colors: [
        { name: 'White',      hex: '#FFFFFF' },
        { name: 'Ivory',      hex: '#F5F0DC' },
        { name: 'Champagne',  hex: '#F7E0B0' },
        { name: 'Sand',       hex: '#D4BC94' },
      ]
    },
    {
      label: 'Metallics',
      colors: [
        { name: 'Gold',       hex: '#D4AF37' },
        { name: 'Silver',     hex: '#BEBEBE' },
        { name: 'Rose Gold',  hex: '#C9878A' },
        { name: 'Bronze',     hex: '#B87333' },
      ]
    },
    {
      label: 'Pinks & Corals',
      colors: [
        { name: 'Blush',      hex: '#F4BEC4' },
        { name: 'Baby Pink',  hex: '#FFD1DC' },
        { name: 'Hot Pink',   hex: '#FF69B4' },
        { name: 'Fuchsia',    hex: '#E91E8C' },
        { name: 'Coral',      hex: '#FF7F6B' },
        { name: 'Dusty Rose', hex: '#C08080' },
        { name: 'Mauve',      hex: '#9E6B7B' },
      ]
    },
    {
      label: 'Reds',
      colors: [
        { name: 'Red',        hex: '#E63946' },
        { name: 'Cherry',     hex: '#C41C34' },
        { name: 'Burgundy',   hex: '#800020' },
        { name: 'Cranberry',  hex: '#9E1B32' },
      ]
    },
    {
      label: 'Oranges & Peaches',
      colors: [
        { name: 'Peach',         hex: '#FFCBA4' },
        { name: 'Orange',        hex: '#FF8C00' },
        { name: 'Terracotta',    hex: '#C16B4A' },
        { name: 'Burnt Orange',  hex: '#CC5500' },
      ]
    },
    {
      label: 'Yellows',
      colors: [
        { name: 'Butter',    hex: '#FFF3A0' },
        { name: 'Lemon',     hex: '#FFF44F' },
        { name: 'Yellow',    hex: '#FFD700' },
        { name: 'Marigold',  hex: '#ECA83A' },
      ]
    },
    {
      label: 'Greens',
      colors: [
        { name: 'Mint',    hex: '#98E4C5' },
        { name: 'Sage',    hex: '#9DC183' },
        { name: 'Lime',    hex: '#52C41A' },
        { name: 'Emerald', hex: '#50C878' },
        { name: 'Forest',  hex: '#228B22' },
        { name: 'Olive',   hex: '#808000' },
      ]
    },
    {
      label: 'Blues',
      colors: [
        { name: 'Baby Blue',   hex: '#AED6F1' },
        { name: 'Sky Blue',    hex: '#87CEEB' },
        { name: 'Turquoise',   hex: '#40CFC0' },
        { name: 'Teal',        hex: '#008B8B' },
        { name: 'Royal Blue',  hex: '#4169E1' },
        { name: 'Navy',        hex: '#1B2A5C' },
      ]
    },
    {
      label: 'Purples',
      colors: [
        { name: 'Lavender',     hex: '#C4A8E0' },
        { name: 'Lilac',        hex: '#C8A2C8' },
        { name: 'Purple',       hex: '#9B59B6' },
        { name: 'Deep Purple',  hex: '#5B2D8E' },
        { name: 'Plum',         hex: '#8B1FA8' },
      ]
    },
    {
      label: 'Darks',
      colors: [
        { name: 'Charcoal', hex: '#36454F' },
        { name: 'Black',    hex: '#111111' },
      ]
    },
  ];

  const MAX_COLORS = 6;
  let selectedColors = [];

  const colorFilterTabsEl = document.getElementById('colorFilterTabs');
  const colorSwatchGridEl = document.getElementById('colorSwatchGrid');
  const selectedChipsEl   = document.getElementById('selectedChips');
  const paletteCountEl    = document.getElementById('paletteCount');
  const garlandSvgEl      = document.getElementById('garlandSvg');
  const sendPaletteBtn    = document.getElementById('sendPaletteBtn');
  const clearPaletteBtn   = document.getElementById('clearPaletteBtn');

  if (colorSwatchGridEl) {
    let activeFamily = 'All';

    // Build filter tabs
    const allFamilyNames = ['All', ...COLOR_FAMILIES.map(f => f.label)];
    allFamilyNames.forEach(name => {
      const tab = document.createElement('button');
      tab.className = 'filter-tab' + (name === 'All' ? ' active' : '');
      tab.textContent = name;
      tab.addEventListener('click', () => {
        activeFamily = name;
        colorFilterTabsEl.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderSwatchGrid();
      });
      colorFilterTabsEl.appendChild(tab);
    });

    // Build all swatches up front (hidden/shown by filter)
    const allSwatchEls = [];
    COLOR_FAMILIES.forEach(family => {
      family.colors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'color-swatch';
        btn.style.background = color.hex;
        btn.title = color.name;
        btn.setAttribute('aria-label', color.name);
        btn.dataset.hex = color.hex;
        btn.dataset.family = family.label;
        btn.addEventListener('click', () => toggleColor(color, btn));
        allSwatchEls.push(btn);
        colorSwatchGridEl.appendChild(btn);
      });
    });

    function renderSwatchGrid() {
      allSwatchEls.forEach(btn => {
        btn.style.display = (activeFamily === 'All' || btn.dataset.family === activeFamily) ? '' : 'none';
      });
    }

    function toggleColor(color, btn) {
      const idx = selectedColors.findIndex(c => c.hex === color.hex);
      if (idx > -1) {
        selectedColors.splice(idx, 1);
        btn.classList.remove('selected');
      } else {
        if (selectedColors.length >= MAX_COLORS) return;
        selectedColors.push(color);
        btn.classList.add('selected');
      }
      updateVisualizer();
    }

    function updateVisualizer() {
      paletteCountEl.textContent = `${selectedColors.length} of ${MAX_COLORS} selected`;

      if (selectedColors.length === 0) {
        selectedChipsEl.innerHTML = '<span class="empty-chips-hint">Tap a color below to start</span>';
      } else {
        selectedChipsEl.innerHTML = '';
        selectedColors.forEach(color => {
          const lightHexes = ['#FFFFFF','#FFF44F','#FFF3A0','#FFD1DC','#F5F0DC','#F7E0B0','#FFCBA4','#AED6F1','#87CEEB','#98E4C5','#F4BEC4','#C4A8E0','#C8A2C8'];
          const isLight = lightHexes.includes(color.hex);
          const chip = document.createElement('div');
          chip.className = 'selected-chip';
          chip.innerHTML = `
            <span class="chip-dot" style="background:${color.hex}; border-color:${isLight ? 'rgba(0,0,0,0.18)' : 'transparent'}"></span>
            <span>${color.name}</span>
            <button class="chip-remove" aria-label="Remove ${color.name}">&times;</button>
          `;
          chip.querySelector('.chip-remove').addEventListener('click', () => {
            selectedColors = selectedColors.filter(c => c.hex !== color.hex);
            const swatch = colorSwatchGridEl.querySelector(`.color-swatch[data-hex="${CSS.escape(color.hex)}"]`);
            if (swatch) swatch.classList.remove('selected');
            updateVisualizer();
          });
          selectedChipsEl.appendChild(chip);
        });
      }

      sendPaletteBtn.disabled = selectedColors.length === 0;
      renderGarland(selectedColors);
    }

    function renderGarland(colors) {
      if (colors.length === 0) {
        garlandSvgEl.innerHTML = `<text x="280" y="105" text-anchor="middle" fill="#C8B4C8" font-family="Poppins, sans-serif" font-size="13" font-weight="400">Select colors to preview your garland ✨</text>`;
        return;
      }

      // 10 balloon positions arranged in a gentle arch
      const positions = [
        { x: 42,  y: 158, rx: 19, ry: 24 },
        { x: 98,  y: 130, rx: 22, ry: 28 },
        { x: 158, y: 108, rx: 24, ry: 30 },
        { x: 220, y: 94,  rx: 26, ry: 32 },
        { x: 284, y: 86,  rx: 28, ry: 34 },
        { x: 348, y: 92,  rx: 26, ry: 32 },
        { x: 410, y: 106, rx: 24, ry: 30 },
        { x: 468, y: 128, rx: 22, ry: 28 },
        { x: 522, y: 155, rx: 19, ry: 24 },
      ];

      // Rope y values: bottom of each balloon knot
      const ropePoints = positions.map(p => ({ x: p.x, y: p.y + p.ry + 8 }));
      const ropeD = ropePoints.map((pt, i) =>
        i === 0 ? `M${pt.x},${pt.y}` : `Q${(ropePoints[i-1].x + pt.x) / 2},${Math.max(ropePoints[i-1].y, pt.y) + 6} ${pt.x},${pt.y}`
      ).join(' ');

      let svgContent = '';

      // Draw drop shadows
      positions.forEach(p => {
        svgContent += `<ellipse cx="${p.x}" cy="${p.y + p.ry + 16}" rx="${p.rx * 0.7}" ry="5" fill="rgba(0,0,0,0.07)"/>`;
      });

      // Draw rope/string
      svgContent += `<path d="${ropeD}" stroke="#BBA8CC" stroke-width="1.5" fill="none" stroke-dasharray="4,3" opacity="0.7"/>`;

      // Draw balloons
      positions.forEach((p, i) => {
        const color = colors[i % colors.length];
        const isLight = ['#FFFFFF','#FFF44F','#FFF3A0','#FFD1DC','#F5F0DC','#F7E0B0','#FFCBA4','#AED6F1','#87CEEB','#98E4C5','#C4A8E0','#F4BEC4','#C8A2C8'].includes(color.hex);
        const shadowColor = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.25)';
        const innerShadow = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.18)';

        svgContent += `
          <g>
            <!-- Balloon body -->
            <ellipse cx="${p.x}" cy="${p.y}" rx="${p.rx}" ry="${p.ry}" fill="${color.hex}" stroke="${shadowColor}" stroke-width="1"/>
            <!-- Shine highlight -->
            <ellipse cx="${p.x - p.rx * 0.28}" cy="${p.y - p.ry * 0.28}" rx="${p.rx * 0.28}" ry="${p.ry * 0.32}" fill="rgba(255,255,255,0.38)" transform="rotate(-20,${p.x - p.rx * 0.28},${p.y - p.ry * 0.28})"/>
            <!-- Secondary subtle shadow side -->
            <ellipse cx="${p.x + p.rx * 0.2}" cy="${p.y + p.ry * 0.2}" rx="${p.rx * 0.5}" ry="${p.ry * 0.45}" fill="${innerShadow}"/>
            <!-- Knot -->
            <polygon points="${p.x},${p.y + p.ry} ${p.x - 4},${p.y + p.ry + 7} ${p.x + 4},${p.y + p.ry + 7}" fill="${color.hex}" stroke="${shadowColor}" stroke-width="0.5"/>
          </g>
        `;
      });

      garlandSvgEl.innerHTML = svgContent;
    }

    // Send palette to contact form
    sendPaletteBtn.addEventListener('click', () => {
      const names = selectedColors.map(c => c.name).join(', ');
      const msgField = document.getElementById('message');
      if (msgField) {
        const prefix = `My color palette: ${names}\n\n`;
        msgField.value = msgField.value ? prefix + msgField.value : prefix;
      }
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Clear palette
    clearPaletteBtn.addEventListener('click', () => {
      selectedColors = [];
      allSwatchEls.forEach(s => s.classList.remove('selected'));
      updateVisualizer();
    });

    // Initial render
    renderSwatchGrid();
  }

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
