async function loadSection(id, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading section ${path}:`, error);
  }
}

function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function toggleTheme() {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const sunIcon = '<i data-lucide="sun" class="h-4 w-4"></i>';
  const moonIcon = '<i data-lucide="moon" class="h-4 w-4"></i>';
  const icon = theme === 'dark' ? sunIcon : moonIcon;
  
  if (themeToggle) themeToggle.innerHTML = icon;
  if (themeToggleMobile) themeToggleMobile.innerHTML = icon;
  if (window.lucide) lucide.createIcons();
}

function initializeNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }
}

function initializeTypingEffect() {
  const tagline = "Frontend Developer crafting scalable, high-performance web applications with clean code and modern architecture.";
  const taglineElement = document.getElementById('tagline');
  
  if (taglineElement) {
    let i = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        taglineElement.textContent = tagline.slice(0, i + 1);
        i++;
        if (i >= tagline.length) {
          clearInterval(interval);
          const cursor = taglineElement.nextElementSibling;
          if (cursor) cursor.style.display = 'none';
        }
      }, 30);
    }, 1200);
  }
}

function openGallery(name, imagesJson) {
  let images;
  try {
    images = typeof imagesJson === 'string' ? JSON.parse(imagesJson.replace(/'/g, '"')) : imagesJson;
  } catch (e) {
    console.error("Error parsing images JSON:", e);
    return;
  }
  
  const modalTitle = document.getElementById('galleryModalLabel');
  const modalBody = document.getElementById('galleryModalBody');
  
  if (!modalTitle || !modalBody) return;

  modalTitle.textContent = `${name} — Gallery`;
  modalBody.innerHTML = '';
  
  const grid = document.createElement('div');
  grid.className = 'row g-3';
  
  images.forEach(img => {
    const col = document.createElement('div');
    col.className = 'col-sm-6';
    col.innerHTML = `
      <a href="${img}" target="_blank" class="d-block overflow-hidden rounded-3 border border-secondary">
        <img src="${img}" class="img-fluid gallery-img" loading="lazy">
      </a>
    `;
    grid.appendChild(col);
  });
  
  modalBody.appendChild(grid);
  const modalElement = document.getElementById('galleryModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

window.openGallery = openGallery;

async function init() {
  await Promise.all([
    loadSection('navbar-placeholder', 'sections/navbar.html'),
    loadSection('hero-placeholder', 'sections/hero.html'),
    loadSection('about-placeholder', 'sections/about.html'),
    loadSection('skills-placeholder', 'sections/skills.html'),
    loadSection('projects-placeholder', 'sections/projects.html'),
    loadSection('experience-placeholder', 'sections/experience.html'),
    loadSection('education-placeholder', 'sections/education.html'),
    loadSection('freelance-placeholder', 'sections/freelance.html'),
    loadSection('hackathons-placeholder', 'sections/hackathons.html'),
    loadSection('contact-placeholder', 'sections/contact.html'),
    loadSection('footer-placeholder', 'sections/footer.html'),
    loadSection('gallery-modal-placeholder', 'sections/gallery-modal.html')
  ]);

  initializeTheme();
  initializeNavbar();
  initializeTypingEffect();
  
  if (window.lucide) {
    lucide.createIcons();
    
    setTimeout(() => {
      lucide.createIcons();
    }, 100);
    
    setTimeout(() => {
      lucide.createIcons();
    }, 500);
  }
}

window.addEventListener('load', init);
