console.log("rafting.js loaded");

// ═══════════════════════════════════════════════
// Navigation Toggle (Hamburger)
// ═══════════════════════════════════════════════
function toggleMenu() {
  const hamButton = document.querySelector("#menu");
  const navigation = document.querySelector(".navigation");
  if (!hamButton || !navigation) return;

  hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
  });

  // Close menu when a link is clicked
  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      hamButton.classList.remove("open");
    });
  });
}

// ═══════════════════════════════════════════════
// Header Scroll Effect
// ═══════════════════════════════════════════════
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ═══════════════════════════════════════════════
// Scroll-Based Reveal Animation
// ═══════════════════════════════════════════════
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════
// Footer Date Update
// ═══════════════════════════════════════════════
function updateFooterDates() {
  const year = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastModified");
  const date = new Date();

  if (year) year.textContent = date.getFullYear();
  if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// ═══════════════════════════════════════════════
// Track Visits Using localStorage
// ═══════════════════════════════════════════════
function updateVisitCounter() {
  try {
    let reviewCount = localStorage.getItem("reviewCount");
    reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
    localStorage.setItem("reviewCount", reviewCount);
    console.log(`This page has been visited ${reviewCount} times.`);
  } catch (e) {
    // localStorage unavailable (private mode etc.)
  }
}

// ═══════════════════════════════════════════════
// Subscribe Form Feedback
// ═══════════════════════════════════════════════
function initSubscribeForm() {
  const form = document.querySelector("#subscribe-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.textContent;
    btn.textContent = "✓ Subscribed!";
    btn.style.background = "#22c55e";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ═══════════════════════════════════════════════
// Trip Data
// ═══════════════════════════════════════════════
const trips = [
  { name: "Extreme Trips",          duration: "2 days",   difficulty: "Challenging", season: "Spring, Summer",       price: "₦5,000" },
  { name: "Family Fun Float",       duration: "Half day", difficulty: "Easy",        season: "Spring, Summer, Fall", price: "₦1,500" },
  { name: "Canyon Explorer",        duration: "10 hours", difficulty: "Moderate",    season: "Summer, Fall",         price: "₦1,500" },
  { name: "River Exhilaration",     duration: "6 hours",  difficulty: "Extreme",     season: "Spring",               price: "₦2,000" },
  { name: "Gentle Float Trips",     duration: "1 day",    difficulty: "Easy",        season: "Spring, Summer, Fall", price: "₦1,500" },
  { name: "Scenic Morning Float",   duration: "3 hours",  difficulty: "Easy",        season: "Year-round",           price: "₦800"   }
];

// Difficulty badge color
const difficultyColor = {
  "Easy":        "#22c55e",
  "Moderate":    "#f59e0b",
  "Challenging": "#f97316",
  "Extreme":     "#ef4444"
};

// ═══════════════════════════════════════════════
// Build Trips Table
// ═══════════════════════════════════════════════
function buildTripTable() {
  const container = document.getElementById("tripTableContainer");
  if (!container) return;

  if (trips.length === 0) {
    container.innerHTML = "<p>No trips available right now.</p>";
    return;
  }

  let heading = container.querySelector(".trip-table-heading");
  if (!heading) {
    heading = document.createElement("h2");
    heading.classList.add("trip-table-heading");
    heading.textContent = "Trip Overview";
    container.prepend(heading);
  }

  const table = document.createElement("table");
  table.classList.add("trip-table");
  table.setAttribute("role", "table");

  // Header
  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  ["Trip Name", "Duration", "Difficulty", "Season", "Price"].forEach(text => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = text;
    headerRow.appendChild(th);
  });

  // Body
  const tbody = document.createElement("tbody");
  trips.forEach(trip => {
    const tr = tbody.insertRow();
    Object.entries(trip).forEach(([key, value]) => {
      const td = tr.insertCell();
      if (key === "difficulty") {
        const badge = document.createElement("span");
        badge.textContent = value;
        badge.style.cssText = `
          background: ${difficultyColor[value] ?? "#6b7280"}22;
          color: ${difficultyColor[value] ?? "#6b7280"};
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: var(--font-display, sans-serif);
        `;
        td.appendChild(badge);
      } else {
        td.textContent = value;
      }
    });
  });

  table.appendChild(tbody);

  const existing = container.querySelector("table.trip-table");
  if (existing) existing.remove();

  container.appendChild(table);
}

// ═══════════════════════════════════════════════
// Init on DOMContentLoaded
// ═══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  toggleMenu();
  initHeaderScroll();
  initScrollReveal();
  updateFooterDates();
  updateVisitCounter();
  initSubscribeForm();
  buildTripTable();
});