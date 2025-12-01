const API_URL = "http://127.0.0.1:5000"; // your Flask backend URL

// --- Login Function ---
async function login(email, password) {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        return { ok: res.ok, data };
    } catch (err) {
        return { ok: false, data: { message: "Cannot connect to server" } };
    }
}

// --- Register Function ---
async function register(email, password, confirmPassword) {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email, 
                password, 
                confirm_password: confirmPassword  // include confirm password
            })
        });
        const data = await res.json();
        return { ok: res.ok, data };
    } catch (err) {
        return { ok: false, data: { message: "Cannot connect to server" } };
    }
}

// --- Example Usage ---
// Register
// const result = await register("admin@example.com", "123456", "123456");
// console.log(result);

// Login
// const loginResult = await login("admin@example.com", "123456");
// console.log(loginResult);
