import Container from './app/Container';
import ExampleComponent from './component/ExampleComponent';
import RootComponent from './component/RootComponent';
import ExampleService from './service/ExampleService';

/* eslint-disable class-methods-use-this */

export default class ChipContainer extends Container {
  getExampleService() {
    return new ExampleService();
  }

  createExampleWidget(el, model, children) {
    return new ExampleComponent(el, model, children, this.getExampleService());
  }

  createRootWidget(el, model, children) {
    return new RootComponent(el, model, children, this.getExampleService());
  }
}

// Container depends on superclass property
ChipContainer.superclass = Container;
