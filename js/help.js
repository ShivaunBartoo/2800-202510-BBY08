// This script manages the help popover functionality for the help button.
// It toggles the display of a help popover and closes it when clicking outside.

const HelpPopoverModule = (function () {
  let helpButton, helpPopover;

  /**
   * Toggles the visibility of the help popover.
   */
  function togglePopover() {
    const isVisible = helpPopover.style.display === 'block';
    helpPopover.style.display = isVisible ? 'none' : 'block';
  }

  /**
   * Handles clicks outside the help button and popover to close the popover.
   */
  function handleOutsideClick(event) {
    // If the click is not on the help button or inside the popover, hide the popover
    if (!helpButton.contains(event.target) && !helpPopover.contains(event.target)) {
      helpPopover.style.display = 'none';
    }
  }

  /**
   * Initializes the help popover by attaching event listeners.
   */
  function init() {
    helpButton = document.getElementById('help-button');
    helpPopover = document.getElementById('help-popover');

    if (helpButton && helpPopover) {
      helpButton.addEventListener('click', togglePopover);
      document.addEventListener('click', handleOutsideClick);
    }
  }

  return { init };
})();

// Initializes the help popover module when the DOM is loaded.
document.addEventListener('DOMContentLoaded', () => {
  HelpPopoverModule.init();
});
