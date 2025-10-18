const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
let isOpen = false;

function toggleSidebar() {
  isOpen = !isOpen;

  if (isOpen) {
    sidebar.classList.add("open");
    toggleBtn.classList.add("open");
    overlay.classList.add("active");

    toggleBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
  } else {
    sidebar.classList.remove("open");
    toggleBtn.classList.remove("open");
    overlay.classList.remove("active");

    toggleBtn.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="3" x2="9" y2="21"></line>
                        </svg>
                `;
  }
}


toggleBtn.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", toggleSidebar);

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768 && isOpen) {
      toggleSidebar();
    }
  });
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen) {
    toggleSidebar();
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isOpen) {
    overlay.classList.remove("active");
  } else if (window.innerWidth <= 768 && isOpen) {
    overlay.classList.add("active");
  }
});
