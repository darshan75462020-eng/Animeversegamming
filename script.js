// Load EmailJS (make sure email.min.js is included in your HTML)
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("yTcR3f4pZu9PTXQtw"); // 👈 Replace with your actual EmailJS Public Key
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const result = await emailjs.send(
      "service_9f27of9", // 👈 Replace with your EmailJS Service ID
      "template_ehxr3lk", // 👈 Replace with your EmailJS Template ID
      {
        name: name,
        email: email,
        message: message,
      }
    );

    console.log("Email sent:", result.text);
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  } catch (error) {
    console.error("EmailJS error:", error);
    alert("Failed to send message. Please try again later.");
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
