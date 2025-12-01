// --- Tabs ---
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

tabLogin?.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
});

tabRegister?.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
});

// --- Notification Modal ---
const notifyModal = document.getElementById("notifyModal");
const notifyTitle = document.getElementById("notifyTitle");
const notifyText = document.getElementById("notifyText");
const closeBtn = notifyModal?.querySelector(".close");

closeBtn?.addEventListener("click", () => { notifyModal.style.display = "none"; });
window.addEventListener("click", (e) => { if(e.target === notifyModal) notifyModal.style.display = "none"; });

function showNotification(title, text) {
    notifyTitle.textContent = title;
    notifyText.textContent = text;
    notifyModal.style.display = "flex";

    // Auto close after 3s
    setTimeout(() => { notifyModal.style.display = "none"; }, 3000);
}

// --- Forgot / Reset Password ---
const forgotPassword = document.getElementById("forgotPassword");
const resetPassword = document.getElementById("resetPassword");

forgotPassword?.addEventListener("click", (e) => {
    e.preventDefault();
    showNotification("Forgot Password", "Password reset link sent to your email!");
});

resetPassword?.addEventListener("click", (e) => {
    e.preventDefault();
    showNotification("Reset Password", "Reset instructions sent to your email!");
});

// --- Login Submit ---
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await login(email, password); // frontend.js
    if(res.ok){
        localStorage.setItem("userEmail", email);
        window.location.href = "dashboard.html";
    } else {
        showNotification("Login Failed", res.data.message);
    }
});

// --- Register Submit ---
registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if(password !== confirm){
        showNotification("Register Failed", "Passwords do not match!");
        return;
    }

    // Pass confirm password to register function
    const res = await register(email, password, confirm); // <-- FIXED
    if(res.ok){
        showNotification("Register Success", "Registration completed! Please login manually.");
        // Optionally: switch to login tab automatically
        // tabLogin.click();
    } else {
        showNotification("Register Failed", res.data.message);
    }
});
