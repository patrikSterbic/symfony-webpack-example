import ContainerError from './ContainerError';

const ucfirst = s => s.charAt(0).toUpperCase() + s.substring(1);

class Container {
  constructor(options = {}) {
    this.options = options;
    this.parameters = this.options;
    this.services = {};

    let prot = this.constructor.prototype;

    // Dynamically remaps container methods so that:
    // - each container.get*() method is mapped to container.get() call
    // - each container.create*() method is mapped to container.create() call
    const methodsMapper = propertyName => {
      if (typeof prot[propertyName] !== 'function') {
        return;
      }

      const methodName = propertyName;

      if (methodName.substring(0, 3) === 'get' && methodName.length > 3) {
        this[methodName] = () =>
          this.get.apply(
            this,
            [methodName.substring(3)].concat([].slice.call(arguments, 0)),
          );
      } else if (
        methodName.substring(0, 6) === 'create' &&
        methodName.length > 6
      ) {
        this[methodName] = () =>
          this.create.apply(
            this,
            [methodName.substring(6)].concat([].slice.call(arguments, 0)),
          );
      }
    };

    while (prot.constructor !== Object) {
      Object.getOwnPropertyNames(prot).forEach(methodsMapper);

      if (!prot.constructor.superclass) {
        break;
      }

      prot = prot.constructor.superclass.prototype;
    }
  }

  get(id) {
    const caseSensitiveId = ucfirst(id);

    if (!this.services[caseSensitiveId]) {
      const methodName = `get${caseSensitiveId}`;
      if (!this.constructor.prototype[methodName]) {
        throw new ContainerError(
          `Service '${caseSensitiveId}' does not exist.`,
        );
      }
      this.services[caseSensitiveId] = this.constructor.prototype[
        methodName
      ].call(this);
    }

    return this.services[caseSensitiveId];
  }

  create(id) {
    const methodName = `create${ucfirst(id)}`;
    console.log(methodName);

    if (!this.constructor.prototype[methodName]) {
      throw new ContainerError(`Factory '${id}' does not exist.`);
    }
    return this.constructor.prototype[methodName].apply(
      this,
      [].slice.call(arguments, 1),
    );
  }

  set(id, service) {
    this.services[ucfirst(id)] = service;

    this[`get${ucfirst(id)}`] = () => this.get(id);
  }
}

export default Container;
