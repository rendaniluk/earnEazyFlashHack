// Use const for immutable references
const username = document.querySelector(".username");
const pwords = document.querySelector(".password");
const company = document.querySelector(".company");

document.querySelector(".loginBtn").addEventListener("click", async (event) => {
  event.preventDefault();

  const creds = {
    user: username.value.trim(),      // ✅ Trim whitespace
    company: company.value.trim(),
    password: pwords.value
  };

  // Basic validation
  if (!creds.user || !creds.password) {
    alert("Please fill in all fields"); // Or better UI feedback
    return;
  }

  try {
    const response = await fetch("https://api.rehive.com/3/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds)
    });

    const results = await response.json();

    if (results.status === "success") {
      localStorage.setItem("token", results.data.token);
      localStorage.setItem("email", creds.user);
      window.location.replace("./account-page.html");
    } else {
      console.error("Login failed:", results);
      alert(results.message || "Login failed"); // User feedback
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error. Please try again.");
  }
});
