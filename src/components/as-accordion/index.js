/*
 * ASAccordion
 * @version: 1.9.0
 * @author: Additional Sheet
 * @license: Licensed under MIT (https://additionalui.com/docs/license)
 * Copyright 2023 Additional Sheet
 */

import Component from '../../core/Component';

class ASAccordion extends Component {
  constructor() {
    super('.as-accordion');
  }

  init() {
    document.addEventListener('click', (e) => {
      const $targetEl = e.target;
      const $accordionEl = $targetEl.closest(this.selector);
      const $accordionToggleEl = $targetEl.closest('.as-accordion-toggle');
      const $accordionGroupEl = $targetEl.closest('.as-accordion-group');
      if ($accordionEl && $accordionGroupEl && $accordionToggleEl) {
        this._hideAll($accordionEl);

        this.show($accordionEl);
      }
    });
  }

  show($accordionEl) {
    if ($accordionEl.classList.contains('active')) {
      return this.hide($accordionEl);
    }

    $accordionEl.classList.add('active');

    const $accordionContentEl = $accordionEl.querySelector('.as-accordion-content');

    $accordionContentEl.style.display = 'block';
    $accordionContentEl.style.height = 0;
    setTimeout(() => {
      $accordionContentEl.style.height = `${$accordionContentEl.scrollHeight}px`;
    });

    this.afterTransition($accordionContentEl, () => {
      if (!$accordionEl.classList.contains('active')) return;
      $accordionContentEl.style.height = '';

      this._fireEvent('open', $accordionEl);
      this._dispatch('open.hs.accordion', $accordionEl, $accordionEl);
    });
  }

  hide($accordionEl) {
    const $accordionContentEl = $accordionEl.querySelector('.as-accordion-content');

    $accordionContentEl.style.height = `${$accordionContentEl.scrollHeight}px`;
    setTimeout(() => {
      $accordionContentEl.style.height = 0;
    });

    this.afterTransition($accordionContentEl, () => {
      if ($accordionEl.classList.contains('active')) return;
      $accordionContentEl.style.display = '';

      this._fireEvent('hide', $accordionEl);
      this._dispatch('hide.hs.accordion', $accordionEl, $accordionEl);
    });

    $accordionEl.classList.remove('active');
  }

  _hideAll($currentaccordionEl) {
    const $accordionGroupEl = $currentaccordionEl.closest('.as-accordion-group');

    if ($accordionGroupEl.hasAttribute('data-as-accordion-always-open')) return;

    $accordionGroupEl.querySelectorAll(this.selector).forEach(($accordionEl) => {
      if ($currentaccordionEl !== $accordionEl) {
        this.hide($accordionEl);
      }
    });
  }
}

window.ASAccordion = new ASAccordion();
document.addEventListener('load', window.ASAccordion.init());
