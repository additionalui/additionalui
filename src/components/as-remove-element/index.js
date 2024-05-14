import Component from '../../core/Component';

class ASRemoveElement extends Component {
  constructor() {
    super('[data-hs-remove-element]');
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('click', (e) => {
        const $removeElementTrigger = e.target.closest(this.selector);
        if (!$removeElementTrigger) return;

        const $removeEl = document.querySelector($removeElementTrigger.getAttribute('data-hs-remove-element'));
        if ($removeEl) {
          // Toggle opacity class based on 'hs-removing'
          if ($removeEl.classList.contains('hs-removing')) {
            $removeEl.classList.remove('opacity-0');
          } else {
            $removeEl.classList.add('opacity-0');
          }
          
          // Toggle hs-removing class
          $removeEl.classList.toggle('hs-removing');

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
