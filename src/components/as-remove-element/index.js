import Component from '../../core/Component';

class ASRemoveElement extends Component {
  constructor() {
    super('[data-as-remove-element]');
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('click', (e) => {
        const $removeElementTrigger = e.target.closest(this.selector);
        if (!$removeElementTrigger) return;

        const $removeEl = document.querySelector($removeElementTrigger.getAttribute('data-as-remove-element'));
        if ($removeEl) {
          // Toggle opacity class based on 'as-removing'
          if ($removeEl.classList.contains('as-removing')) {
            $removeEl.classList.remove('opacity-0');
          } else {
            $removeEl.classList.add('opacity-0');
          }
          
          // Toggle as-removing class
          $removeEl.classList.toggle('as-removing');

          // Remove element after transition duration
          setTimeout(() => {
            $removeEl.remove();
          }, 300); // Change 300 to match the transition duration in milliseconds
        }
      });
    });
  }
}

window.ASRemoveElement = new ASRemoveElement();
window.ASRemoveElement.init();
