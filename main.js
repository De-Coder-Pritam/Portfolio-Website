var typed = new Typed("#text",{
    strings:["Backend Engineer","Full Stack Developer","Java Developer","DevOps Engineer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})
vals = [85, 90, 80, 70, 60];
let v = document.querySelectorAll(".Technical-bars .bar .progress-line .fill");
v.forEach((e, i) => {
    e.style.width = vals[i] + "%";
    let p = e.parentElement.parentElement.querySelector(".percent-label");
    p.innerHTML = vals[i] + "%";
});


// Animate technical progress bars when the Skills section enters the viewport.
// Also run immediately if the Skills section is already visible.
(function () {
  const skillsContainer = document.getElementById("Skills");
  if (!skillsContainer) return;

  const bars = skillsContainer.querySelectorAll(".progress-line");

  // Start all bars at 0
  bars.forEach((bar) => {
    const fill = bar.querySelector(".fill");
    if (fill) fill.style.width = "0%";
  });

  // Function to animate bars
  const fillBars = () => {
    bars.forEach((bar) => {
      const percent = parseInt(bar.getAttribute("data-progress"), 10) || 0;
      const fill = bar.querySelector(".fill");
      const label = bar.parentElement.querySelector(".percent-label");
      if (fill) fill.style.width = percent + "%";
      if (label) label.textContent = percent + "%";
    });
  };

  // Animate immediately if visible
  const rect = skillsContainer.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    setTimeout(fillBars, 300);
    return;
  }

  // Otherwise use IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsContainer);
})();
document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle ? themeToggle.querySelector('i') : null;

  // Default theme setup
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);

  if (icon) updateIcon(savedTheme);

  // Click listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (icon) updateIcon(next);
    });
  }

  // Helper: update the icon
  function updateIcon(theme) {
    if (theme === 'light') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
});

// ===== Hamburger Toggle =====
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navbar.classList.toggle('active');
});

// Close menu on link click (for mobile)
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navbar.classList.remove('active');
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("messageModal");
  const closeBtn = modal ? modal.querySelector(".close-btn") : null;

  // Defensive checks — will log helpful errors
  if (!form) {
    console.error("contactForm element not found. Make sure your HTML contains id='contactForm'");
    return;
  }
  if (!modal) {
    console.error("messageModal element not found. Make sure the modal HTML is present.");
    return;
  }
  if (!closeBtn) {
    console.error("close button inside modal not found.");
  }

  // Helper to show modal
  function showModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    // optionally auto close after 3.5s:
    // setTimeout(hideModal, 3500);
  }

  function hideModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // Submit handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // grab trimmed values
	console.log("Contact form submitted, validating...");
    const name = (document.getElementById("name") || {}).value || "";
    const email = (document.getElementById("email") || {}).value || "";
    const subject = (document.getElementById("subject") || {}).value || "";
    const message = (document.getElementById("message") || {}).value || "";

    // simple validation
    if (name.trim() && email.trim() && subject.trim() && message.trim()) {
      // show modal
      showModal();
      // reset form
      try { form.reset(); } catch (err) { /* ignore */ }
      console.info("Contact form: all fields present — showing modal");
    } else {
      // highlight missing fields and show alert
      alert("Please fill in all fields before submitting.");
      console.warn("Contact form submission failed — some fields empty");
    }
  });

  // close button
  if (closeBtn) closeBtn.addEventListener("click", hideModal);

  // close on Escape
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") hideModal();
  });

  // Optional: close when clicking outside the modal
  window.addEventListener("click", function (ev) {
    if (ev.target === modal) hideModal();
  });

  console.log("Contact modal handler initialized");
});

function handleSubmit() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  
  // Validate fields
  if (!name || !email || !subject || !message) {
    alert("⚠️ Please fill in all fields before submitting!");
    return false; // stop form submission
  }

  // Show the modal
  const modal = document.getElementById("messageModal");
  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  // Reset form
  document.getElementById("contactForm").reset();

  // Return false to prevent reload
  return false;
}

// Close modal function
function closeModal() {
  const modal = document.getElementById("messageModal");
  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
}


