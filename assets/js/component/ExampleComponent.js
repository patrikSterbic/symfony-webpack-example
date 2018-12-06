import Widget from '../app/Widget';

export default class ExampleComponent extends Widget {
  constructor(el, model, children, exampleService) {
    super(el, model, children);

    this.exampleService = exampleService;
  }

  bind() {
    super.bind();

    console.log('ExampleComponent', this);
  }
}
