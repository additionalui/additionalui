import Component from '../../core/Component';

class ASOverlay extends Component {
    constructor() {
        super('[data-as-overlay]');
    }

    init() {
        // Create the backdrop
        const backdrop = document.createElement('div');
        backdrop.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-50', 'z-40', 'hidden');
        document.body.appendChild(backdrop);

        // Function to open the modal
        const openModal = (modal) => {
            modal.classList.remove('hidden');
            modal.classList.add('as-overlay-open', 'opacity-100', 'pointer-events-auto');
            backdrop.classList.remove('hidden');
            setTimeout(() => {
                this._focusInput(modal);
            }, 50);
        };

        // Function to close the modal
        const closeModal = (modal) => {
            modal.classList.add('hidden');
            modal.classList.remove('as-overlay-open', 'opacity-100', 'pointer-events-auto');
            backdrop.classList.add('hidden');
        };

        // Event listener for closing the modal
        document.addEventListener('click', (event) => {
            const closeButton = event.target.closest('[data-as-overlay-close]');
            if (closeButton) {
                const modalId = closeButton.getAttribute('data-as-overlay-close');
                const modal = document.querySelector(modalId);
                if (modal) {
                    closeModal(modal);
                }
            } else {
                const modal = document.querySelector('.as-overlay-open');
                if (modal) {
                    const dialog = modal.querySelector('.as-overlay-body');
                    if (!dialog.contains(event.target) && !modal.classList.contains('static')) {
                        closeModal(modal);
                    }
                }
            }
        });

        // Event listener for opening the modal
        document.addEventListener('click', (event) => {
            const modalButton = event.target.closest('[data-as-overlay]');
            if (modalButton) {
                const modalId = modalButton.getAttribute('data-as-overlay');
                const modal = document.querySelector(modalId);
                if (modal) {
                    openModal(modal);
                }
            }
        });
    }
    _focusInput($overlayEl) {
        const $inputWithAutoFocusEl = $overlayEl.querySelector('[autofocus]');
        if ($inputWithAutoFocusEl) {
            $inputWithAutoFocusEl.focus();
        }
    }
}

window.ASOverlay = new ASOverlay();
window.ASOverlay.init();
