/*
 * ASAccordion
 * @version: 2.5.5
 */
import Component from '../../core/Component';

class ASAccordion extends Component {
  constructor() {
    super('.as-accordion');
  }

  init() {
    document.addEventListener('click', (e) => {
      const $targetEl = e.target.closest('.as-accordion-toggle');
      if ($targetEl) {
        const $accordionEl = $targetEl.closest(this.selector);
        if ($accordionEl) {
          const $accordionGroupEl = $targetEl.closest('.as-accordion-group');
          if ($accordionEl.classList.contains('as-accordion-active')) {
            this.hide($accordionEl);
          } else {
            this._hideAll($accordionEl, $accordionGroupEl);
            this.show($accordionEl);
          }
        }
      }
    });
  }

  show($accordionEl) {
    $accordionEl.classList.add('as-accordion-active');
    const $accordionContentEl = $accordionEl.querySelector('.as-accordion-content');
    // Change text color of accordion title to indigo
    const $accordionToggleEl = $accordionEl.querySelector('.as-accordion-toggle');
    $accordionToggleEl.classList.add('text-indigo-600');
    this._toggleIcons($accordionEl, true);

    $accordionContentEl.style.display = 'block';
    $accordionContentEl.style.height = `${$accordionContentEl.scrollHeight}px`;

    this.afterTransition($accordionContentEl, () => {
      $accordionContentEl.style.height = '';
      this._fireEvent('open', $accordionEl);
      this._dispatch('open.hs.accordion', $accordionEl, $accordionEl);
    });
  }

  hide($accordionEl) {
    $accordionEl.classList.remove('as-accordion-active');
    const $accordionToggleEl = $accordionEl.querySelector('.as-accordion-toggle');
    $accordionToggleEl.classList.remove('text-indigo-600');
    const $accordionContentEl = $accordionEl.querySelector('.as-accordion-content');
    this._toggleIcons($accordionEl, false);

    $accordionContentEl.style.height = `${$accordionContentEl.scrollHeight}px`;
    setTimeout(() => $accordionContentEl.style.height = '0px');

    this.afterTransition($accordionContentEl, () => {
      if (!$accordionEl.classList.contains('as-accordion-active')) {
        $accordionContentEl.style.display = 'none';
      }
      $accordionContentEl.style.height = '';
      this._fireEvent('hide', $accordionEl);
      this._dispatch('hide.hs.accordion', $accordionEl, $accordionEl);
    });
  }

  _toggleIcons($accordionEl, isActive) {
    const $plusIcon = $accordionEl.querySelector('[data-icon="plus"]');
    const $minusIcon = $accordionEl.querySelector('[data-icon="minus"]');

    if (isActive) {
      $plusIcon.classList.add('hidden');
      $minusIcon.classList.remove('hidden');
    } else {
      $plusIcon.classList.remove('hidden');
      $minusIcon.classList.add('hidden');
    }
  }

  _hideAll($currentAccordionEl, $accordionGroupEl) {
    if ($accordionGroupEl.hasAttribute('data-as-accordion-always-open')) return;

    $accordionGroupEl.querySelectorAll(this.selector).forEach(($accordionEl) => {
      if ($currentAccordionEl !== $accordionEl && $accordionEl.classList.contains('as-accordion-active')) {
        this.hide($accordionEl);
      }
    });
  }
}

window.ASAccordion = new ASAccordion();
document.addEventListener('DOMContentLoaded', () => window.ASAccordion.init());
