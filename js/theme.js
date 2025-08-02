// theme.js
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return false;

    const icon = themeToggle.nextElementSibling.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Set initial state
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    updateIcon(savedTheme);

    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    }

    return true;
}

// Try immediately
if (!initTheme()) {
    // If not found, wait for replacements to complete
    document.addEventListener('replaceComplete', function() {
        initTheme();
    });
}

// Keep trying until the button exists (with maximum attempts)
let attempts = 0;
const maxAttempts = 50; // Stop after 5 seconds (100ms * 50)
const interval = setInterval(() => {
    attempts++;
    if (initTheme() || attempts >= maxAttempts) {
        clearInterval(interval);
    }
}, 100);

// Fallback for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    if (!initTheme()) {
        setTimeout(initTheme, 300);
    }
});