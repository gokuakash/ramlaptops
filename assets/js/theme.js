/* =========================================================
   Ramlaptops — shared Tailwind config + tiny page helpers.
   Each page just calls ramInit() after the Tailwind CDN script.
   ========================================================= */

const RAM_TAILWIND_CONFIG = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        "on-primary-fixed": "#0e1c2f",
        "surface-dim": "#cbdbf5",
        outline: "#75777d",
        "on-surface": "#0b1c30",
        "surface-container": "#e5eeff",
        "on-secondary-fixed": "#191c1e",
        "surface-tint": "#525f75",
        error: "#ba1a1a",
        "on-primary-container": "#77849c",
        "surface-container-lowest": "#ffffff",
        "primary-fixed": "#d6e3fe",
        "primary-fixed-dim": "#bac7e1",
        "surface-container-low": "#eff4ff",
        "on-secondary-container": "#626567",
        "secondary-fixed-dim": "#c4c7ca",
        "on-primary-fixed-variant": "#3a475c",
        "on-primary": "#ffffff",
        surface: "#f8f9ff",
        tertiary: "#000000",
        "on-tertiary-container": "#9d7e5e",
        secondary: "#5b5f61",
        "on-background": "#0b1c30",
        "inverse-surface": "#213145",
        "error-container": "#ffdad6",
        "tertiary-fixed-dim": "#e4c09c",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#d3e4fe",
        "inverse-primary": "#bac7e1",
        "tertiary-fixed": "#ffddba",
        "inverse-on-surface": "#eaf1ff",
        "secondary-fixed": "#e0e3e6",
        "primary-container": "#0e1c2f",
        "surface-container-high": "#dce9ff",
        "surface-bright": "#f8f9ff",
        "on-error-container": "#93000a",
        background: "#f8f9ff",
        "on-surface-variant": "#44474c",
        "tertiary-container": "#2a1702",
        "on-error": "#ffffff",
        "on-tertiary-fixed": "#2a1702",
        "secondary-container": "#e0e3e6",
        "outline-variant": "#c5c6cd",
        "on-secondary-fixed-variant": "#44474a",
        "on-secondary": "#ffffff",
        "surface-variant": "#d3e4fe",
        "on-tertiary-fixed-variant": "#5a4226",
        // Ramlaptops brand tokens (named, so we can reference without arbitrary values)
        ram: {
          navy: "#0e1c2f",
          blue: "#007aff",
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "container-max": "1280px",
        "section-gap": "80px",
        "margin-mobile": "16px",
        base: "8px",
        gutter: "24px",
      },
      fontFamily: {
        "headline-md": ["Inter"],
        "display-lg-mobile": ["Inter"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "display-lg": ["Inter"],
        "label-sm": ["JetBrains Mono"],
        "specs-table": ["Inter"],
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "800" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "label-sm": ["12px", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" }],
        "specs-table": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      },
    },
  },
};

// Apply config to Tailwind (CDN) if available; safe no-op otherwise.
function ramInit() {
  if (window.tailwind && typeof window.tailwind.config !== "undefined") {
    window.tailwind.config = RAM_TAILWIND_CONFIG;
  }

  // Header scroll shadow (used on landing + admin topbar).
  const top = document.getElementById("top-nav");
  if (top) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        top.classList.add("shadow-md");
        top.classList.remove("shadow-sm");
      } else {
        top.classList.remove("shadow-md");
        top.classList.add("shadow-sm");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle (landing).
  const mb = document.getElementById("mobile-menu-btn");
  const mm = document.getElementById("mobile-menu");
  if (mb && mm) {
    mb.addEventListener("click", () => mm.classList.toggle("hidden"));
  }

  // Generic "open / close" modal helpers, if the page declares them.
  window.ramOpenModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.classList.remove("opacity-0", "pointer-events-none", "scale-95");
  };
  window.ramCloseModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.classList.add("opacity-0", "pointer-events-none", "scale-95");
  };

  // Scroll reveal: adds .ram-in to every .ram-reveal as it enters the viewport.
  const reveals = document.querySelectorAll(".ram-reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = e.target.getAttribute("data-reveal-delay");
          if (d) e.target.style.transitionDelay = d + "ms";
          e.target.classList.add("ram-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    // Old browsers: just show everything.
    reveals.forEach((el) => el.classList.add("ram-in"));
  }

  // Admin login tab switcher.
  window.ramSwitchTab = (tabId) => {
    const login = document.getElementById("form-login");
    const signup = document.getElementById("form-signup");
    const t1 = document.getElementById("tab-login");
    const t2 = document.getElementById("tab-signup");
    if (!login || !signup || !t1 || !t2) return;

    const show = (el) => { el.classList.remove("hidden"); el.classList.add("block"); };
    const hide = (el) => { el.classList.add("hidden"); el.classList.remove("block"); };
    const setActive = (el) => {
      el.classList.add("font-bold", "text-primary", "border-primary");
      el.classList.remove("text-on-surface-variant", "border-transparent");
      el.setAttribute("aria-selected", "true");
    };
    const setInactive = (el) => {
      el.classList.remove("font-bold", "text-primary", "border-primary");
      el.classList.add("text-on-surface-variant", "border-transparent");
      el.setAttribute("aria-selected", "false");
    };

    if (tabId === "login") {
      show(login); hide(signup); setActive(t1); setInactive(t2);
    } else {
      show(signup); hide(login); setActive(t2); setInactive(t1);
    }
  };
}

// Auto-run after DOM is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ramInit);
} else {
  ramInit();
}
