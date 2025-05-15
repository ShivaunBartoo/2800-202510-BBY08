const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('mouseenter', () => {
    tabs.forEach(t => t.classList.add('tabs-hovered'));
  });
  tab.addEventListener('mouseleave', () => {
    tabs.forEach(t => t.classList.remove('tabs-hovered'));
  });
});