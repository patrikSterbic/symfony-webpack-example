import ApplicationError from './ApplicationError';

class Application {
  constructor(container) {
    this.container = container;
    this.stack = [];
    this.widgetChildren = [];
    this.children = [];
  }

  begin() {
    return this.stack.push([]);
  }

  end() {
    this.widgetChildren = this.stack.pop();
    return this.widgetChildren;
  }

  widget(name, el, model) {
    const widget = this.container.create(
      `${name}Widget`,
      el,
      model,
      this.widgetChildren,
    );

    if (this.stack.length) {
      this.stack[this.stack.length - 1].push(widget);
    } else {
      this.children.push(widget);
    }

    this.widgetChildren = [];
    return this.widgetChildren;
  }

  processQueue(queue, parent, doBind = true) {
    queue.forEach(args => {
      const method = args.shift();
      this[method].apply(this, args);
    });

    if (doBind) {
      this.children.map(function(child) {
        if (parent) {
          child.setParent(parent);
        }
        child.bind();
        if (!child.__bound__) {
          throw new ApplicationError("You have to call parent's bind!");
        }
      });
    }
  }

  render() {
    // @TODO implement
  }

  findByType(clazz) {
    // @TODO implement
  }
}

export default Application;
