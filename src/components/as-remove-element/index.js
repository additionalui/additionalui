/*
 * ASRemoveElement
 * @version: 1.9.0
 * @author: Additional Sheet
 * @license: Licensed under MIT (https://additionalui.com/docs/license)
 * Copyright 2023 Additional Sheet
 */

import Component from '../../core/Component';

class ASRemoveElement extends Component {
  constructor() {
    super('[data-as-remove-element]');
  }

  init() {
    document.addEventListener('click', (e) => {
      const $removeElementTrigger = e.target.closest(this.selector);
      if (!$removeElementTrigger) return;

      const $removeEl = document.querySelector($removeElementTrigger.getAttribute('data-as-remove-element'));
      if ($removeEl) {
        $removeEl.classList.add('as-removing');
        this.afterTransition($removeEl, () => {
          $removeEl.remove();
        });
      }
    });
  }
}

window.ASRemoveElement = new ASRemoveElement();
document.addEventListener('load', window.ASRemoveElement.init());
