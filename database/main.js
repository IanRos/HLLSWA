
// Minimal JS: set year and add a tiny keyboard UX for quick scroll to links
(function() {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Press 'L' to jump to links grid
  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'l' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const el = document.getElementById('links');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
