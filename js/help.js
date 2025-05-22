const HelpPopoverModule = (function () {
  let helpButton, helpPopover;

  function togglePopover() {
    const isVisible = helpPopover.style.display === 'block';
    helpPopover.style.display = isVisible ? 'none' : 'block';
  }

  function handleOutsideClick(event) {
    if (!helpButton.contains(event.target) && !helpPopover.contains(event.target)) {
      helpPopover.style.display = 'none';
    }
  }

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

document.addEventListener('DOMContentLoaded', () => {
  HelpPopoverModule.init();
});
