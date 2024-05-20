/*
 * ASCollapse
 * @version: 2.5.3
 * @author: Additional Sheet
 * @license: Licensed under MIT (https://additionalui.com/docs/license)
 * Copyright 2023 Additional Sheet
 */

import Component from '../../core/Component';

class ASCollapse extends Component {
  constructor() {
    super('[data-as-collapse]');
  }

  init() {
    document.addEventListener('click', (e) => {
      const $targetEl = e.target;
      const $collapseToggleEl = $targetEl.closest(this.selector);

      if ($collapseToggleEl) {
        const collapseEls = document.querySelectorAll($collapseToggleEl.getAttribute('data-as-collapse'));

        this.toggle(collapseEls);
      }
    });
  }

  toggle($collapseEls) {
    if (!$collapseEls.length) return;

    [...$collapseEls].forEach(($collapseEl) => {
      $collapseEl.classList.contains('hidden') ? this.show($collapseEl) : this.hide($collapseEl);
    });
  }

  show($collapseEl) {
    $collapseEl.classList.add('open');
    $collapseEl.classList.remove('hidden');
    $collapseEl.style.height = 0;

    document.querySelectorAll(this.selector).forEach(($toggleEl) => {
      if ($collapseEl.closest($toggleEl.getAttribute('data-as-collapse'))) {
        $toggleEl.classList.add('open');
      }
    });

    $collapseEl.style.height = `${$collapseEl.scrollHeight}px`;

    this.afterTransition($collapseEl, () => {
      if (!$collapseEl.classList.contains('open')) return;

      $collapseEl.style.height = '';

      this._fireEvent('open', $collapseEl);
      this._dispatch('open.hs.collapse', $collapseEl, $collapseEl);
    });
  }

  hide($collapseEl) {
    $collapseEl.style.height = `${$collapseEl.scrollHeight}px`;

    setTimeout(() => {
      $collapseEl.style.height = 0;
    });

    $collapseEl.classList.remove('open');

    this.afterTransition($collapseEl, () => {
      if ($collapseEl.classList.contains('open')) return;
      $collapseEl.classList.add('hidden');
      $collapseEl.style.height = null;

      this._fireEvent('hide', $collapseEl);
      this._dispatch('hide.hs.collapse', $collapseEl, $collapseEl);

      $collapseEl.querySelectorAll('.as-mega-menu-content.block').forEach(($megaMenuEl) => {
        $megaMenuEl.classList.remove('block');
        $megaMenuEl.classList.add('hidden');
      });
    });

    document.querySelectorAll(this.selector).forEach(($toggleEl) => {
      if ($collapseEl.closest($toggleEl.getAttribute('data-as-collapse'))) {
        $toggleEl.classList.remove('open');
      }
    });
  }
}

window.ASCollapse = new ASCollapse();
document.addEventListener('load', window.ASCollapse.init());
