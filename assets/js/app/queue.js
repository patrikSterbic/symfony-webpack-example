/* global document */
/* global window */

/* eslint-disable no-param-reassign */

(function queue(chip) {
  let scriptIndex = null;
  chip.queue = [];

  chip.begin = function begin() {
    chip.queue.push(['begin']);
    if (scriptIndex !== null) {
      scriptIndex += 1;
    }
  };

  chip.end = function end() {
    chip.queue.push(['end']);
  };

  chip.open = function open() {
    scriptIndex = document.body.getElementsByTagName('script').length;
  };

  chip.close = function close() {
    scriptIndex = null;
  };

  chip.move = function move() {
    if (scriptIndex !== null) {
      scriptIndex += 1;
      return scriptIndex;
    }
  };

  chip.getScriptIndex = function getScriptIndex() {
    if (scriptIndex !== null) {
      scriptIndex += 1;
      return scriptIndex;
    } else {
      return document.body.getElementsByTagName('script').length - 1;
    }
  };

  chip.widget = function widget(name, model = {}) {
    const scripts = document.body.getElementsByTagName('script');
    const el = scripts[chip.getScriptIndex()].parentNode;
    chip.queue.push(['widget', name, el, model]);
  };

  chip.widgetParent = function widgetParent(name, model = {}) {
    const scripts = document.body.getElementsByTagName('script');
    const el = scripts[chip.getScriptIndex()].parentNode.parentNode;
    chip.queue.push(['widget', name, el, model]);
  };

  chip.widgetPrev = function widgetPrev(name, model = {}) {
    const scripts = document.body.getElementsByTagName('script');
    let el = scripts[chip.getScriptIndex()];
    do {
      el = el.previousSibling;
    } while (el && el.nodeType !== 1);
    return chip.queue.push(['widget', name, el, model]);
  };
})((window.chip = window.chip || {}));
