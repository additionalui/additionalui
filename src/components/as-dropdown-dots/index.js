import Component from '../../core/Component';

class ASDropdownDots extends Component {
  constructor() {
    super('[data-dropdown-toggle]');
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const dropdownButtons = document.querySelectorAll(this.selector);
      
      dropdownButtons.forEach(button => {
        const dropdownId = button.getAttribute('data-dropdown-toggle');
        const dropdownMenu = document.getElementById(dropdownId);
        
        // Toggle dropdown menu visibility
        button.addEventListener('click', () => {
          dropdownMenu.classList.toggle('hidden');
        });

        // Hide dropdown menu when clicking outside
        document.addEventListener('click', (event) => {
          if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
          }
        });
      });
    });
  }
}

window.ASDropdownDots = new ASDropdownDots();
window.ASDropdownDots.init();
