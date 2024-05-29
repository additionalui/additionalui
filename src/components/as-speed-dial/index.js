import Component from '../../core/Component';

class ASSpeedDial extends Component {
  constructor() {
    super('[data-dial-init]');
  }

  init() {
    this.elements = document.querySelectorAll(this.selector);
    this.elements.forEach(element => {
      const toggleButton = element.querySelector('[data-dial-toggle]');
      const menu = document.getElementById(toggleButton.getAttribute('aria-controls'));

      const openOnHover = element.hasAttribute('data-dial-hover');

      if (openOnHover) {
        // Bind hover events to the toggle button
        toggleButton.addEventListener('mouseenter', () => this.openMenu(toggleButton, menu));
        toggleButton.addEventListener('mouseleave', () => this.delayedCloseMenu(toggleButton, menu));
      } else {
        // Bind click event to the toggle button
        toggleButton.addEventListener('click', () => this.toggleMenu(toggleButton, menu));
      }

      // Handle hover events for hover-based tooltips
      const hoverButtons = menu.querySelectorAll('[data-tooltip-hover-target]');
      hoverButtons.forEach(button => {
        button.addEventListener('mouseenter', () => this.showTooltip(button));
        button.addEventListener('mouseleave', () => this.hideTooltip(button));
      });

      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!element.contains(event.target)) {
          this.closeMenu(toggleButton, menu);
        }
      });

      // Prevent menu from closing when hovering over menu items
      menu.addEventListener('mouseenter', () => this.preventClose());
      menu.addEventListener('mouseleave', () => this.delayedCloseMenu(toggleButton, menu));
    });
  }

  toggleMenu(toggleButton, menu) {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      this.closeMenu(toggleButton, menu);
    } else {
      this.openMenu(toggleButton, menu);
    }
  }

  openMenu(toggleButton, menu) {
    toggleButton.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    this.showTooltips(menu);
  }

  closeMenu(toggleButton, menu) {
    toggleButton.setAttribute('aria-expanded', 'false');
    menu.classList.add('hidden');
    this.hideTooltips(menu);
  }

  showTooltip(button) {
    const tooltip = document.getElementById(button.getAttribute('data-tooltip-target'));
    tooltip.classList.remove('invisible', 'opacity-0');
  }

  hideTooltip(button) {
    const tooltip = document.getElementById(button.getAttribute('data-tooltip-target'));
    tooltip.classList.add('invisible', 'opacity-0');
  }

  showTooltips(menu) {
    const buttons = menu.querySelectorAll('[data-tooltip-target]');
    buttons.forEach(button => this.showTooltip(button));
  }

  hideTooltips(menu) {
    const buttons = menu.querySelectorAll('[data-tooltip-target]');
    buttons.forEach(button => this.hideTooltip(button));
  }

  delayedCloseMenu(toggleButton, menu) {
    this.closeTimeout = setTimeout(() => this.closeMenu(toggleButton, menu), 500);
  }

  preventClose() {
    clearTimeout(this.closeTimeout);
  }
}

window.ASSpeedDial = new ASSpeedDial();
window.ASSpeedDial.init();
