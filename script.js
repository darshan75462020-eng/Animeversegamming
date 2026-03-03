

let lastSubmissionTime = 0;
// Load EmailJS (make sure email.min.js is included in your HTML)
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("yTcR3f4pZu9PTXQtw"); // 👈 Replace with your actual EmailJS Public Key
  document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", function(e) {
  if (e.key === "F12" || 
     (e.ctrlKey && e.shiftKey && e.key === "I") ||
     (e.ctrlKey && e.key === "U")) {
    e.preventDefault();
  }
});
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const now = Date.now();
if (now - lastSubmissionTime < 30000) {
  alert("Please wait 30 seconds before sending another message.");
  return;
}
lastSubmissionTime = now;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Strict validation patterns
  const namePattern = /^[a-zA-Z ]{2,50}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messagePattern = /^[a-zA-Z0-9 .,!?'"()-]{10,500}$/;

  if (!namePattern.test(name)) {
    alert("Invalid name format.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Invalid email format.");
    return;
  }

  if (!messagePattern.test(message)) {
    alert("Message contains invalid characters.");
    return;
  }

  try {
    const result = await emailjs.send(
      "service_9f27of9",
      "template_ehxr3lk",
      { name, email, message }
    );

    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  } catch (error) {
    alert("Failed to send message.");
  }
});

// Active link highlight on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  let current = "";
  sections.forEach((section) => {
    const top = window.scrollY;
    if (top >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
