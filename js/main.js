const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const toggleLangButton = document.getElementById('toggle-lang');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Language toggle state
let currentLang = localStorage.getItem('language') || 'en';

// Load language files
async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    if (!response.ok) throw new Error('Language file not found');
    const translations = await response.json();
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    toggleLangButton.textContent = lang === 'en' ? 'EN | አማ' : 'አማ | EN';
    localStorage.setItem('language', lang);
    currentLang = lang;
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

toggleLangButton.addEventListener('click', () => {
  const newLang = currentLang === 'en' ? 'am' : 'en';
  loadLanguage(newLang);
});

loadLanguage(currentLang);

// Q&A Form Handling (Temporary Console Log)
const qaForm = document.getElementById('qa-form');
const qaMessage = document.getElementById('qa-message');

if (qaForm) {
  qaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(qaForm);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    qaMessage.textContent = 'Thank you! Your question has been received.';
    qaForm.reset();
    setTimeout(() => {
      qaMessage.textContent = '';
    }, 3000);
  });
}