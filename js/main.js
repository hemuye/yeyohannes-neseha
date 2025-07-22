const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const translateIcon = document.getElementById('translate-icon');

// Hamburger menu toggle (slide from left)
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Google Translate custom icon trigger
if (translateIcon) {
  translateIcon.addEventListener('click', () => {
    // Toggle the visibility of the translate element
    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
      translateElement.style.display = translateElement.style.display === 'block' ? 'none' : 'block';
    }
    // Note: Google Translate widget needs to initialize separately; this just toggles visibility
  });
}

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