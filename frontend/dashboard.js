// --- Sidebar navigation ---
const sections = document.querySelectorAll(".section");
const sidebarItems = document.querySelectorAll(".sidebar ul li");

sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
        sidebarItems.forEach((i) => i.classList.remove("active"));
        sections.forEach((s) => (s.style.display = "none"));

        item.classList.add("active");
        const sectionId = item.getAttribute("data-section");
        if (sectionId) document.getElementById(sectionId).style.display = "block";
    });
});

// --- Logout ---
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
});

// --- Payment Detail Modal ---
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal .close");
const viewBtns = document.querySelectorAll(".viewBtn");

viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        modal.style.display = "flex";
    });
});

closeBtn?.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
    if (e.target == modal) modal.style.display = "none";
});
