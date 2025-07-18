document.addEventListener("DOMContentLoaded", () => {
    // Load just the <header> content from header.html
    fetch("header.html")
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const header = doc.querySelector("header");
            if (header) {
                document.querySelector("header").innerHTML = header.innerHTML;

                // ✅ Run both enhancements
                highlightCurrentPage();
                toggleLoginButton();
            }
        })
        .catch(error => console.error("Error loading header:", error));

    // Load footer
    fetch("footer.html")
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const footer = doc.querySelector("footer");
            if (footer) {
                document.querySelector("footer").innerHTML = footer.innerHTML;
            }
        })
        .catch(error => console.error("Error loading footer:", error));
});

// ✅ Highlight the current menu item
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll("header ul li a");

    links.forEach(link => {
        const href = link.getAttribute("href").split("?")[0].split("#")[0];
        if (href === currentPage) {
            link.parentElement.classList.add("current_page_item");
        } else {
            link.parentElement.classList.remove("current_page_item");
        }
    });
}

// ✅ Hide login button only on login.html
function toggleLoginButton() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const loginButton = document.querySelector("header .loginbutton");

    if (loginButton) {
        if (currentPage === "login.html") {
            loginButton.style.display = "none";
        } else {
            loginButton.style.display = "block"; // or "inline-block" if needed
        }
    }
}
