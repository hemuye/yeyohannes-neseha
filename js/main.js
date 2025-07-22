const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const toggleLangButton = document.getElementById('toggle-lang');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('show');
});

// Language toggle state
let currentLang = localStorage.getItem('language') || 'en';

// Load language files
async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) throw new Error('Language file not found');
    const translations = await response.json();
    
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    // Update button text based on current language
    toggleLangButton.textContent = lang === 'en' ? 'EN | አማ' : 'አማ | EN';

    // Save language preference
    localStorage.setItem('language', lang);
    currentLang = lang;
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

// Toggle language on button click
toggleLangButton.addEventListener('click', () => {
  const newLang = currentLang === 'en' ? 'am' : 'en';
  loadLanguage(newLang);
});

// Load initial language
loadLanguage(currentLang);