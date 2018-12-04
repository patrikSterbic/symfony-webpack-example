import React from 'react';

const testImage = require('../../images/reference_image.jpg');

const TestComponent = () => (
  <div className="container">
    <div className="test-component">
      <h1>Hello From React</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        nostrum incidunt aspernatur laboriosam inventore voluptates itaque
        quisquam rerum vero iusto fuga culpa temporibus iste obcaecati ad
        dignissimos, ducimus saepe nulla?
      </p>
      <img className="ref-image" src={testImage} alt="Ref image" />
      <p>Photo by Rec Fury on Unsplash</p>
      <button type="button" class="btn btn-primary">
        Show more
      </button>
    </div>
  </div>
);

export default TestComponent;
