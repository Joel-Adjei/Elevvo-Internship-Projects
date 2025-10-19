// Initialize theme based on user preference or default to light mode
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  htmlElement.classList.add('dark');
} else {
  htmlElement.classList.remove('dark');
}

// Theme toggle functionality for both desktop and mobile
function toggleTheme() {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Add event listeners for both theme toggle buttons
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
});

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuToggle && mobileMenu) {
  // Open mobile menu
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    hamburgerIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  });
}

// Close mobile menu using the close button in the menu
if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    // Restore body scroll
    document.body.style.overflow = 'auto';
  });
}

// Close mobile menu when clicking on navigation links
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    // Restore body scroll
    document.body.style.overflow = 'auto';
  });
});

// Close mobile menu when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnToggle = mobileMenuToggle.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnToggle) {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      // Restore body scroll
      document.body.style.overflow = 'auto';
    }
  }
});