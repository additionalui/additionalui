import Component from '../../core/Component';

class ASOverlay_bkp extends Component {
  constructor() {
    super('[data-as-overlay]');
    this.backdrop = null;
    this.openNextOverlay = false;
  }

  init() {
    this.backdrop = document.createElement('div');
    this.backdrop.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-50', 'z-40', 'hidden');
    document.body.appendChild(this.backdrop);

    document.addEventListener('click', (event) => {
      const closeOverlayTriggerEl = event.target.closest('[data-as-overlay-close]');
      if (closeOverlayTriggerEl) {
        const modal = closeOverlayTriggerEl.closest('.as-overlay.open');
        if (modal) {
          this.close(modal);
        }
      } else {
        const overlayToggleEl = event.target.closest('[data-as-overlay]');
        if (overlayToggleEl) {
          const overlayId = overlayToggleEl.getAttribute('data-as-overlay');
          const modal = document.querySelector(overlayId);
          if (modal) {
            this.toggle(modal);
          }
        }
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const modal = document.querySelector('.as-overlay.open');
        if (modal) {
          this.close(modal);
        }
      }
    });
  }

  toggle($overlayEl) {
    if (!$overlayEl) return;
    $overlayEl.classList.contains('hidden') ? this.open($overlayEl) : this.close($overlayEl);
  }

  open($overlayEl) {
    if (!$overlayEl) return;

    const $openedOverlayEl = document.querySelector('.as-overlay.open');
    const disabledScroll = this.getClassProperty($overlayEl, '--body-scroll', 'false') !== 'true';

    if ($openedOverlayEl) {
      this.openNextOverlay = true;
      this.close($openedOverlayEl).then(() => {
        this.open($overlayEl);
        this.openNextOverlay = false;
      });
    }

    if (disabledScroll) {
      document.body.style.overflow = 'hidden';
    }

    this._buildBackdrop($overlayEl);
    this._checkTimer($overlayEl);
    this._autoHide($overlayEl);

    $overlayEl.classList.remove('hidden');
    $overlayEl.classList.add('open', 'pointer-events-auto', 'opacity-100');
    $overlayEl.setAttribute('aria-overlay', 'true');
    $overlayEl.setAttribute('tabindex', '-1');

    setTimeout(() => {
      if ($overlayEl.classList.contains('hidden')) return;
      this._fireEvent('open', $overlayEl);
      this._dispatch('open.as.overlay', $overlayEl, $overlayEl);
      this._focusInput($overlayEl);
    }, 50);
  }

  close($overlayEl) {
    return new Promise((resolve) => {
      if (!$overlayEl) return;

      $overlayEl.classList.remove('open', 'pointer-events-auto', 'opacity-100');
      $overlayEl.classList.add('hidden');
      $overlayEl.removeAttribute('aria-overlay');
      $overlayEl.removeAttribute('tabindex', '-1');

      this.afterTransition($overlayEl, () => {
        this._destroyBackdrop();
        document.body.style.overflow = '';
        this._fireEvent('close', $overlayEl);
        this._dispatch('close.as.overlay', $overlayEl, $overlayEl);
        resolve($overlayEl);
      });
    });
  }

  _autoHide($overlayEl) {
    const autoHideTime = parseInt(this.getClassProperty($overlayEl, '--auto-hide', '0'));

    if (autoHideTime) {
      $overlayEl.autoHide = setTimeout(() => {
        this.close($overlayEl);
      }, autoHideTime);
    }
  }

  _checkTimer($overlayEl) {
    if ($overlayEl.autoHide) {
      clearTimeout($overlayEl.autoHide);
      delete $overlayEl.autoHide;
    }
  }

  _onBackdropClick($overlayEl) {
    const closeOnBackdrop = this.getClassProperty($overlayEl, '--overlay-backdrop', 'true') !== 'static';

    if (closeOnBackdrop) {
      this.close($overlayEl);
    }
  }

  _buildBackdrop($overlayEl) {
    const backdropSelector = $overlayEl.getAttribute('data-as-overlay-backdrop-container');
    if (!backdropSelector) return;

    let $backdropEl = document.querySelector(backdropSelector);
    if (!$backdropEl) return;

    $backdropEl = $backdropEl.cloneNode(true);
    $backdropEl.classList.remove('hidden');

    const closeOnBackdrop = this.getClassProperty($overlayEl, '--overlay-backdrop', 'true') !== 'static';
    const disableBackdrop = this.getClassProperty($overlayEl, '--overlay-backdrop', 'true') === 'false';

    if (closeOnBackdrop) {
      $backdropEl.addEventListener('click', () => this.close($overlayEl), true);
    }

    $backdropEl.setAttribute('data-as-overlay-backdrop-template', '');
    document.body.appendChild($backdropEl);

    setTimeout(() => {
      $backdropEl.classList = 'transition duration fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 as-overlay-backdrop';
    });
  }

  _destroyBackdrop() {
    const $backdropEl = document.querySelector('[data-as-overlay-backdrop-template]');

    if (!$backdropEl) return;

    if (this.openNextOverlay) {
      $backdropEl.style.transitionDuration = `${parseFloat(window.getComputedStyle($backdropEl).transitionDuration.replace(/[^\d.-]/g, '')) * 1.8}s`;
    }

    $backdropEl.classList.add('opacity-0');

    this.afterTransition($backdropEl, () => {
      $backdropEl.remove();
    });
  }

  _focusInput($overlayEl) {
    const $inputWithAutoFocusEl = $overlayEl.querySelector('[autofocus]');
    if ($inputWithAutoFocusEl) {
      $inputWithAutoFocusEl.focus();
    }
  }

  getClassProperty($element, propertyName, defaultValue) {
    const computedStyle = window.getComputedStyle($element);
    return computedStyle.getPropertyValue(propertyName).trim() || defaultValue;
  }
}

window.ASOverlay_bkp = new ASOverlay_bkp();
document.addEventListener('DOMContentLoaded', () => window.ASOverlay_bkp.init());
