// This script manages the tab hover effect for the content tabs on the page.
// It adds or removes a CSS class to all tabs when any tab is hovered, enabling a group hover effect.

const tabs = document.querySelectorAll('.tab');

// Adds mouseenter and mouseleave event listeners to each tab
tabs.forEach(tab => {
  // On mouse enter, add the 'tabs-hovered' class to all tabs
  tab.addEventListener('mouseenter', () => {
    tabs.forEach(t => t.classList.add('tabs-hovered'));
  });
  // On mouse leave, remove the 'tabs-hovered' class from all tabs
  tab.addEventListener('mouseleave', () => {
    tabs.forEach(t => t.classList.remove('tabs-hovered'));
  });
});