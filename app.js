
  // ── Custom Cursor (desktop only) ──
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  const isTouchDevice = () => window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);

  document.addEventListener('mousemove', e => {
    if (isTouchDevice()) return;
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  function animateCursor() {
    if (!isTouchDevice()) {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, .portfolio-item, .service-card, .process-step').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  // ── Mobile Nav ──
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => mobileNav.classList.contains('open') ? closeNav() : openNav());
  mobileNavClose.addEventListener('click', closeNav);
  document.querySelectorAll('.mobile-nav-link').forEach(a => a.addEventListener('click', closeNav));

  // ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => revealObserver.observe(el));

  // ── Portfolio filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = match ? '1' : '0.2';
        item.style.transform = match ? 'scale(1)' : 'scale(0.97)';
        item.style.transition = 'all 0.4s ease';
        item.style.pointerEvents = match ? '' : 'none';
      });
    });
  });

  // ── Testimonial slider (responsive) ──
  const track = document.getElementById('testimonialTrack');
  const slides = track.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function getSlideWidth() {
    // On mobile slides are 100% wide; on tablet 70%; on desktop 50%
    const w = window.innerWidth;
    if (w <= 768) return 100;
    if (w <= 1180) return 70;
    return 50;
  }

  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    const pct = getSlideWidth();
    const gap = 32;
    track.style.transform = `translateX(calc(-${currentSlide * pct}% - ${currentSlide * gap}px))`;
  }

  document.getElementById('tNext').addEventListener('click', () => goToSlide(currentSlide + 1));
  document.getElementById('tPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
  const autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

  // Touch swipe for testimonials
  let tStartX = 0;
  track.addEventListener('touchstart', e => { tStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = tStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1); }
  });

  window.addEventListener('resize', () => goToSlide(currentSlide));

  // ── Form submit ──
  document.getElementById('submitBtn').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) { inp.style.borderColor = '#C4724A'; valid = false; }
      else inp.style.borderColor = '';
    });
    if (valid) {
      this.textContent = 'Message Sent ✓';
      this.style.background = '#5a7a5a';
      inputs.forEach(inp => inp.value = '');
      setTimeout(() => { this.textContent = 'Send Enquiry'; this.style.background = ''; }, 3500);
    }
  });

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
