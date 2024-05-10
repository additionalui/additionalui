/*
 * Util
 * @version: 1.9.0
 * @author: Additional Sheet
 * @license: Licensed under MIT (https://additionalui.com/docs/license)
 * Copyright 2023 Additional Sheet
 */

export default {
  historyIndex: -1,

  addHistory(index) {
    this.historyIndex = index;
  },

  existsInHistory(index) {
    return index > this.historyIndex;
  },

  clearHistory() {
    this.historyIndex = -1;
  },
};
