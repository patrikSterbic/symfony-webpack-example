import $ from 'jquery';

export default class Widget {
  constructor(el, model, children) {
    this.model = model || {};
    this.children = children || [];
    this.el = $(el);
    this.parent = null;

    this.children.map(child => child.setParent(this));
  }

  setEl(el) {
    this.el = el;
  }

  setModel(model) {
    this.model = model;
  }

  setParent(parent) {
    this.parent = parent;
  }

  setChildren(children) {
    this.children = children;

    return this.children.map(child => child.setParent(this));
  }

  bind() {
    this.__bound__ = true;

    this.children.forEach(child => {
      child.bind();

      if (!child.__bound__) {
        throw new Error("You have to call parent's bind!");
      }
    });
  }

  unbind() {
    this.__bound__ = false;

    this.children.forEach(child => {
      child.unbind();
    });
  }

  findByType(clazz) {
    // @TODO implement
  }

  findParentByType(clazz) {
    // @TODO implement
  }

  moveChildren(oldIndex, newIndex) {
    const moveItem = this.children[oldIndex];
    this.children.splice(oldIndex, 1);
    return this.children.splice(newIndex, 0, moveItem);
  }

  reload() {
    // @TODO implement
  }

  replaceWith(widget = null) {
    if (widget) {
      widget.setParent(this.parent);
      widget.el.insertAfter(this.el);
    }

    // Replace current widget with new one in widget tree
    const index = this.parent.children.indexOf(this);

    if (index !== -1) {
      if (widget) {
        this.parent.children.splice(index, 1, widget);
      } else {
        this.parent.children.splice(index, 1);
      }
    }
    this.unbind();
    return this.el.remove();
  }

  remove() {
    return this.replaceWith(null);
  }
}
