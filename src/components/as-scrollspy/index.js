/*
 * ASScrollspy
 * @version: 1.9.0
 * @author: Additional Sheet
 * @license: Licensed under MIT (https://additionalui.com/docs/license)
 * Copyright 2023 Additional Sheet
 */

import Component from '../../core/Component';

class ASScrollspy extends Component {
  constructor() {
    super('[data-as-scrollspy] ');

    this.activeSection = null;
  }

  init() {
    document.querySelectorAll(this.selector).forEach(($scrollspyEl) => {
      const $scrollspyContentEl = document.querySelector($scrollspyEl.getAttribute('data-as-scrollspy'));
      const links = $scrollspyEl.querySelectorAll('[href]');
      const sections = $scrollspyContentEl.children;
      const $scrollableEl = $scrollspyEl.getAttribute('data-as-scrollspy-scrollable-parent')
        ? document.querySelector($scrollspyEl.getAttribute('data-as-scrollspy-scrollable-parent'))
        : document;

      Array.from(sections).forEach(($sectionEl) => {
        if (!$sectionEl.getAttribute('id')) return;

        $scrollableEl.addEventListener('scroll', (ev) =>
          this._update({
            $scrollspyEl,
            $scrollspyContentEl,
            links,
            $sectionEl,
            sections,
            ev,
          })
        );
      });

      links.forEach(($link) => {
        $link.addEventListener('click', (e) => {
          e.preventDefault();
          if ($link.getAttribute('href') === 'javascript:;') return;
          this._scrollTo({ $scrollspyEl, $scrollableEl, $link });
        });
      });
    });
  }

  _update({ ev, $scrollspyEl, sections, links, $sectionEl }) {
    const globalOffset = parseInt(this.getClassProperty($scrollspyEl, '--scrollspy-offset', '0'));
    const userOffset = this.getClassProperty($sectionEl, '--scrollspy-offset') || globalOffset;
    const offsetScrollableParent = ev.target === document ? 0 : parseInt(ev.target.getBoundingClientRect().top);
    const topOffset = parseInt($sectionEl.getBoundingClientRect().top) - userOffset - offsetScrollableParent;
    const height = $sectionEl.offsetHeight;

    if (topOffset <= 0 && topOffset + height > 0) {
      if (this.activeSection === $sectionEl) return;

      links.forEach(($el) => {
        $el.classList.remove('active');
      });

      const $relatedLinkEl = $scrollspyEl.querySelector(`[href="#${$sectionEl.getAttribute('id')}"]`);
      if ($relatedLinkEl) {
        $relatedLinkEl.classList.add('active');

        const $groupEl = $relatedLinkEl.closest('[data-as-scrollspy-group]');
        if ($groupEl) {
          const $parentLinkEl = $groupEl.querySelector('[href]');
          if ($parentLinkEl) $parentLinkEl.classList.add('active');
        }
      }

      this.activeSection = $sectionEl;
    }
  }

  _scrollTo({ $scrollspyEl, $scrollableEl, $link }) {
    const $sectionEl = document.querySelector($link.getAttribute('href'));
    const globalOffset = parseInt(this.getClassProperty($scrollspyEl, '--scrollspy-offset', '0'));
    const userOffset = this.getClassProperty($sectionEl, '--scrollspy-offset') || globalOffset;
    const offsetScrollableParent = $scrollableEl === document ? 0 : $scrollableEl.offsetTop;
    const topOffset = $sectionEl.offsetTop - userOffset - offsetScrollableParent;
    const $viewEl = $scrollableEl === document ? window : $scrollableEl;

    this._fireEvent('scroll', $scrollspyEl);
    this._dispatch('scroll.hs.scrollspy', $scrollspyEl, $scrollspyEl);

    window.history.replaceState(null, null, $link.getAttribute('href'));

    $viewEl.scrollTo({
      top: topOffset,
      left: 0,
      behavior: 'smooth',
    });
  }
}

window.ASScrollspy = new ASScrollspy();
document.addEventListener('load', window.ASScrollspy.init());