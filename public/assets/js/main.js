// main.js

// Initialize Google Translate widget
// This function is called by the Google Translate script when it loads.
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
const languageToggle = document.getElementById('translate-icon'); // Correct ID for the button
const languageMenu = document.getElementById('google_translate_element'); // Correct ID for the Google Translate container
const dropdowns = document.querySelectorAll('.dropdown'); // For main navigation dropdowns
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// --- Dark Mode Toggle with localStorage persistence and throttling ---
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
  const THROTTLE_DELAY = 300; // milliseconds

  darkModeToggle.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastToggleTime < THROTTLE_DELAY) {
      console.log('[DarkMode] Toggle ignored to prevent rapid toggling');
      return;
    }
    lastToggleTime = now;

    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    console.log(`[DarkMode] Theme toggled to: ${body.classList.contains('dark') ? 'dark' : 'light'}`);
  });
}

// --- Hamburger Menu Toggle for mobile ---
if (hamburger && navLinks && overlay) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from propagating to document listener
    const isOpen = navLinks.classList.toggle('show');
    overlay.classList.toggle('show', isOpen);
    hamburger.classList.toggle('active', isOpen);
    console.log(`[Hamburger] Menu toggled, isOpen: ${isOpen}`);

    // Close all main navigation dropdown submenus on hamburger toggle
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));

    // Close language menu if open (when hamburger menu is opened/closed)
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
      languageMenu.classList.remove('show'); // Close language menu on overlay click
    }
    console.log('[Overlay] Clicked overlay - all menus closed');
  });
}

// --- Dropdown submenu toggle on mobile only (for main navigation links) ---
if (dropdowns.length > 0) { // Check if dropdowns exist
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a'); // Assuming the main link itself acts as a toggle
    if (link) {
      link.addEventListener('click', (e) => {
        // This logic should only apply on mobile widths
        if (window.innerWidth <= 768) {
          e.preventDefault(); // Prevent link navigation on mobile dropdown toggle
          const isActive = dropdown.classList.toggle('active');
          console.log(`[Dropdown] Toggled dropdown ${dropdown.className}, active: ${isActive}`);

          // Close other dropdowns
          dropdowns.forEach(other => {
            if (other !== dropdown) other.classList.remove('active');
          });

          // Close language menu if open when a main nav dropdown is toggled
          if (languageMenu) {
            languageMenu.classList.remove('show');
            console.log('[Dropdown] Language menu closed');
          }
        }
      });
    }
  });
}

// --- Google Translate Toggle: Handles language dropdown visibility ---
// IMPORTANT FIX: Using the correct 'languageToggle' constant (for #translate-icon)
if (languageToggle && languageMenu) {
  languageToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from immediately closing the menu via the document listener
    languageMenu.classList.toggle('show');
    console.log('Language toggle clicked, dropdown visibility:', languageMenu.classList.contains('show') ? 'visible' : 'hidden');

    // Close main nav dropdowns if language menu opens (optional, but good for UX)
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    if (navLinks && navLinks.classList.contains('show')) {
        // If the mobile nav is open, ensure the language menu is contained within it visually.
        // Or if you want language toggle to close mobile nav, uncomment below:
        // navLinks.classList.remove('show');
        // overlay.classList.remove('show');
        // hamburger.classList.remove('active');
    }
  });

  // Close language dropdown when clicking outside of it or the toggle button
  document.addEventListener('click', (e) => {
    // Check if the click target is NOT inside the language menu AND NOT the language toggle button itself
    if (!languageMenu.contains(e.target) && !languageToggle.contains(e.target)) {
      languageMenu.classList.remove('show');
      console.log('Clicked outside language menu, dropdown hidden');
    }
  });
}

// --- Initialize on DOM Load: Ensures Google Translate dropdown is hidden ---
// Also logs initial theme state for debugging.
document.addEventListener('DOMContentLoaded', () => {
  if (languageMenu) {
    languageMenu.classList.remove('show'); // Ensure it's hidden on load
  }
  if (languageToggle) { // Check if the button exists
    console.log('Language toggle button loaded, visibility:', window.getComputedStyle(languageToggle).display);
  }
  console.log(`[DOMContentLoaded] Initial theme: ${body.classList.contains('dark') ? 'dark' : 'light'}`);
});

// --- Search button click handler (simple alert placeholder) ---
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

// --- On window resize: reset menus and toggles when switching between mobile/desktop ---
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) { // Assuming 768px is your mobile breakpoint
    // Close mobile-specific UI elements
    if (navLinks) navLinks.classList.remove('show');
    if (hamburger) hamburger.classList.remove('active');
    if (overlay) overlay.classList.remove('show');
    dropdowns.forEach(dropdown => dropdown.classList.remove('active')); // Close main nav dropdowns
    if (languageMenu) languageMenu.classList.remove('show'); // Close language menu
    console.log('[Resize] Window resized above 768px - mobile menus reset');
  }
});

// --- ESC key press to close menus and overlays ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Check if any of the major UI elements are open
    const isMobileNavOpen = navLinks && navLinks.classList.contains('show');
    const isLanguageMenuOpen = languageMenu && languageMenu.classList.contains('show');

    if (isMobileNavOpen || isLanguageMenuOpen) {
      if (navLinks) navLinks.classList.remove('show');
      if (hamburger) hamburger.classList.remove('active');
      if (overlay) overlay.classList.remove('show');
      dropdowns.forEach(dropdown => dropdown.classList.remove('active')); // Close main nav dropdowns
      if (languageMenu) languageMenu.classList.remove('show'); // Close language menu
      console.log('[Escape] Escape pressed - all visible menus closed');
    }
  }
});