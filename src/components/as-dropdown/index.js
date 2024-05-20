import { createPopper } from '@popperjs/core';
import Component from '../../core/Component';

class ASDropdown extends Component {
  constructor() {
    super('.as-dropdown');

    this.dropdowns = document.querySelectorAll(this.selector);
    this.init();
  }

  init() {
    this.dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector('.as-dropdown-toggle');
      const menu = dropdown.querySelector('.as-dropdown-menu');

      button.addEventListener('click', () => {
        this.toggleDropdown(dropdown, menu);
      });
    });
  }

  toggleDropdown(dropdown, menu) {
    const isOpen = dropdown.classList.contains('open');
    if (isOpen) {
      dropdown.classList.remove('open');
      menu.classList.add('hidden');
    } else {
      dropdown.classList.add('open');
      menu.classList.remove('hidden');
      this.createPopperInstance(dropdown, menu);
    }
  }

  createPopperInstance(dropdown, menu) {
    if (dropdown._popper) {
      dropdown._popper.destroy();
    }

    const popperInstance = createPopper(dropdown, menu, {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    });

    dropdown._popper = popperInstance;
  }
}

new ASDropdown();
