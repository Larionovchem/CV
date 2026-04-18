const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// появление блоков при скролле
// threshold 0.12 — меньше слишком рано срабатывает
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), i * 80);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// полоски навыков
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.querySelectorAll('.skill-fill').forEach(bar => {
      const target = bar.dataset.w;
      setTimeout(() => { bar.style.width = target + '%'; }, 200);
    });

    skillsObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => skillsObserver.observe(el));

// плавный скролл по якорям
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const dest = document.querySelector(link.getAttribute('href'));
    if (!dest) return;
    e.preventDefault();
    dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
