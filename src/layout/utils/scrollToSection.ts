export const scrollToSection = (hash: string) => {
  if (!hash) return;

  // External or full page route
  if (!hash.startsWith("#")) {
    if (window.location.pathname !== hash) {
      window.location.href = hash;
    }
    return;
  }

  const id = hash.replace("#", "");
  const el = document.getElementById(id);

  if (el) {
    const yOffset = -90; // Header offset
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  } else {
    // If element is not on current page, redirect to root with hash
    const isRoot = window.location.pathname === "/" || window.location.pathname.match(/^\/[a-z]{2}(-[A-Z]{2})?$/);
    if (!isRoot) {
      window.location.href = `/${hash}`;
    }
  }
};

