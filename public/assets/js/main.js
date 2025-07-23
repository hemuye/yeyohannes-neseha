
// Initialize Google Translate widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en', // Set default page language to English
    includedLanguages: 'am,en,ti,om,ar,fr', // Supported languages for translation
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Use simple dropdown layout
    autoDisplay: false // Prevent automatic display of translation
  }, 'google_translate_element'); // Target element for the widget
}

// Select DOM elements for navigation, translation, and dark mode
const hamburger = document.getElementById('hamburger'); // Hamburger menu icon
const navLinks = document.getElementById('nav-links'); // Navigation links container
const overlay = document.getElementById('overlay'); // Overlay for mobile menu
const languageToggle = document.getElementById('language-toggle'); // Google Translate button
const languageMenu = document.getElementById('google_translate_element'); // Google Translate dropdown
const dropdowns = document.querySelectorAll('.dropdown'); // All dropdown menu containers
const darkModeToggle = document.getElementById('dark-mode-toggle'); // Dark mode toggle button
const body = document.body; // Body element for dark mode class

// Dark Mode Toggle: Handles light/dark theme switching
if (darkModeToggle) {
  // Check saved theme in localStorage, default to light mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark'); // Only apply dark mode if explicitly saved
    console.log('Dark mode applied from localStorage');
  } else {
    body.classList.remove('dark'); // Ensure light mode is default
    console.log('Light mode applied (default or from localStorage)');
  }

  // Toggle dark mode on button click
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark'); // Toggle dark class on body
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light'); // Save preference
    console.log(`Theme toggled to: ${body.classList.contains('dark') ? 'dark' : 'light'}`);
  });
}

// Hamburger Menu Toggle: Handles mobile menu open/close
if (hamburger && navLinks && overlay) {
  // Open/close mobile menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    const isOpen = navLinks.classList.toggle('show'); // Toggle menu visibility
    overlay.classList.toggle('show', isOpen); // Show/hide overlay
    hamburger.classList.toggle('active', isOpen); // Animate hamburger icon
    dropdowns.forEach(dropdown => dropdown.classList.remove('active')); // Close all submenus
    if (languageMenu) {
      languageMenu.classList.remove('show'); // Close Google Translate dropdown
    }
  });

  // Close mobile menu when clicking overlay
  overlay.addEventListener('click', () => {
    navLinks.classList.remove('show'); // Hide menu
    overlay.classList.remove('show'); // Hide overlay
    hamburger.classList.remove('active'); // Reset hamburger icon
    dropdowns.forEach(dropdown => dropdown.classList.remove('active')); // Close all submenus
    if (languageMenu) {
      languageMenu.classList.remove('show'); // Close Google Translate dropdown
    }
  });
}

// Dropdown Menu Handling: Manages submenu behavior on mobile
if (dropdowns) {
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a'); // Main dropdown link
    if (link) {
      // Toggle submenu on mobile when clicking main link
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) { // Only on mobile (≤768px)
          e.preventDefault(); // Prevent default navigation
          const isActive = dropdown.classList.toggle('active'); // Toggle submenu visibility
          dropdowns.forEach(other => {
            if (other !== dropdown) other.classList.remove('active'); // Close other submenus
          });
          if (languageMenu) {
            languageMenu.classList.remove('show'); // Close Google Translate dropdown
          }
        }
      });
    }
  });
}

// Google Translate Toggle: Handles language dropdown visibility
if (languageToggle && languageMenu) {
  // Toggle Google Translate dropdown on button click
  languageToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    languageMenu.classList.toggle('show'); // Show/hide dropdown
  });

  // Close Google Translate dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!languageMenu.contains(e.target) && !languageToggle.contains(e.target)) {
      languageMenu.classList.remove('show'); // Hide dropdown
    }
  });
}

// Search Functionality: Handles search button click
const searchButton = document.querySelector('.search-button');
if (searchButton) {
  searchButton.addEventListener('click', () => {
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchInput.value.trim()) {
      alert(`Searching for: ${searchInput.value}`); // Display search query (placeholder for actual search)
      searchInput.value = ''; // Clear input
    }
  });
}

// Initialize on DOM Load: Ensures initial state is set
document.addEventListener('DOMContentLoaded', () => {
  if (languageMenu) {
    languageMenu.classList.remove('show'); // Ensure Google Translate dropdown is hidden initially
  }
  // Log initial theme state for debugging
  console.log(`Initial theme: ${body.classList.contains('dark') ? 'dark' : 'light'}`);
});

// Handle Resize: Adjusts menu behavior when switching between mobile and desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) { // On desktop (>768px)
    if (navLinks) navLinks.classList.remove('show'); // Close mobile menu
    if (hamburger) hamburger.classList.remove('active'); // Reset hamburger icon
    if (overlay) overlay.classList.remove('show'); // Hide overlay
    dropdowns.forEach(dropdown => dropdown.classList.remove('active')); // Close all submenus
    if (languageMenu) languageMenu.classList.remove('show'); // Close Google Translate dropdown
  }
});
