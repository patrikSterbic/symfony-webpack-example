import Widget from '../app/Widget';

export default class RootComponent extends Widget {
  constructor(el, model, children, exampleService) {
    super(el, model, children);

    this.exampleService = exampleService;
  }

  bind() {
    super.bind();

    console.log('RootComponent', this);
  }
}
