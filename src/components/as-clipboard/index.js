import Component from '../../core/Component';

class ASClipboard extends Component {
  constructor() {
    super('[data-copy-to-clipboard-target]');
  }

  init() {
    this.elements = document.querySelectorAll(this.selector);
    this.elements.forEach(element => {
      const button = element.closest('button');
      if (button) {
        button.addEventListener('click', this.copyToClipboard.bind(this, element));
      }
    });
  }

  copyToClipboard(element, event) {
    event.preventDefault();

    const inputId = element.dataset.copyToClipboardTarget;
    const input = document.getElementById(inputId);

    if (input) {
      input.select();
      input.setSelectionRange(0, 99999); // For mobile devices

      navigator.clipboard.writeText(input.value).then(() => {
        const button = input.closest('.grid').querySelector('button');
        const defaultMessage = button.querySelector('#default-message');
        const successMessage = button.querySelector('#success-message');

        defaultMessage.classList.add('hidden');
        successMessage.classList.remove('hidden');

        setTimeout(() => {
          defaultMessage.classList.remove('hidden');
          successMessage.classList.add('hidden');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      console.error(`No input element found with ID: ${inputId}`);
    }
  }
}

window.ASClipboard = new ASClipboard();
window.ASClipboard.init();
