// Initialize Google Translate widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en', // Default page language
    includedLanguages: 'am,en,ti,om,ar,fr', // Supported languages
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Simple dropdown
    autoDisplay: false // Prevent auto display
  }, 'google_translate_element');
}

// Select DOM elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const languageToggle = document.getElementById('translate-icon');
const languageMenu = document.getElementById('google_translate_element');
const dropdowns = document.querySelectorAll('.dropdown');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Dark Mode Toggle with localStorage persistence and throttling
if (darkModeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    console.log('[Init] Dark mode applied from localStorage');
  } else {
    body.classList.remove('dark');
    console.log('[Init] Light mode applied (default or from localStorage)');
  }

  let lastToggleTime = 0;

  darkModeToggle.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastToggleTime < 300) {
      console.log('[DarkMode] Toggle ignored to prevent rapid toggling');
      return; // Prevent toggling too fast
    }
    lastToggleTime = now;

    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    console.log(`[DarkMode] Theme toggled to: ${body.classList.contains('dark') ? 'dark' : 'light'}`);
  });
}

// Hamburger Menu Toggle for mobile
if (hamburger && navLinks && overlay) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('show');
    overlay.classList.toggle('show', isOpen);
    hamburger.classList.toggle('active', isOpen);
    console.log(`[Hamburger] Menu toggled, isOpen: ${isOpen}`);

    // Close all dropdown submenus on hamburger toggle
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));

    // Close language menu if open
    if (languageMenu) {
      languageMenu.classList.remove('show');
      console.log('[Hamburger] Language menu closed');
    }
  });

  // Close mobile menu on overlay click
  overlay.addEventListener('click', () => {
    navLinks.classList.remove('show');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    if (languageMenu) {
      languageMenu.classList.remove('show');
    }
    console.log('[Overlay] Clicked overlay - all menus closed');
  });
}

// Dropdown submenu toggle on mobile only
if (dropdowns) {
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault(); // Prevent link navigation on mobile dropdown toggle
          const isActive = dropdown.classList.toggle('active');
          console.log(`[Dropdown] Toggled dropdown ${dropdown.className}, active: ${isActive}`);

          // Close other dropdowns
          dropdowns.forEach(other => {
            if (other !== dropdown) other.classList.remove('active');
          });

          // Close language menu if open
          if (languageMenu) {
            languageMenu.classList.remove('show');
            console.log('[Dropdown] Language menu closed');
          }
        }
      });
    }
  });
}

// Google Translate Initialization: Sets up the translation widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'am,en,ti,om,ar,fr',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}

// Google Translate Toggle: Handles language dropdown visibility
if (document.getElementById('language-toggle') && document.getElementById('google_translate_element')) {
  document.getElementById('language-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('google_translate_element').classList.toggle('show');
    console.log('Language toggle clicked, dropdown visibility:', document.getElementById('google_translate_element').classList.contains('show') ? 'visible' : 'hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!document.getElementById('google_translate_element').contains(e.target) && !document.getElementById('language-toggle').contains(e.target)) {
      document.getElementById('google_translate_element').classList.remove('show');
      console.log('Clicked outside, dropdown hidden');
    }
  });
}

// Initialize on DOM Load: Ensures Google Translate dropdown is hidden
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('google_translate_element')) {
    document.getElementById('google_translate_element').classList.remove('show');
  }
  if (document.getElementById('language-toggle')) {
    console.log('Language toggle button loaded, visibility:', window.getComputedStyle(document.getElementById('language-toggle')).display);
  }
});

// Search button click handler (simple alert placeholder)
const searchButton = document.querySelector('.search-button');
if (searchButton) {
  searchButton.addEventListener('click', () => {
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchInput.value.trim()) {
      alert(`Searching for: ${searchInput.value}`);
      searchInput.value = '';
    }
  });
}

// On DOM load: ensure language menu hidden and log theme state
document.addEventListener('DOMContentLoaded', () => {
  if (languageMenu) {
    languageMenu.classList.remove('show');
  }
  console.log(`[DOMContentLoaded] Initial theme: ${body.classList.contains('dark') ? 'dark' : 'light'}`);
});

// On window resize: reset menus and toggles when switching between mobile/desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    if (navLinks) navLinks.classList.remove('show');
    if (hamburger) hamburger.classList.remove('active');
    if (overlay) overlay.classList.remove('show');
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    if (languageMenu) languageMenu.classList.remove('show');
    console.log('[Resize] Window resized above 768px - menus reset');
  }
});

// ESC key press to close menus and overlays
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
      overlay.classList.remove('show');
      dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      if (languageMenu) {
        languageMenu.classList.remove('show');
      }
      console.log('[Escape] Escape pressed - all menus closed');
    }
  }
});
