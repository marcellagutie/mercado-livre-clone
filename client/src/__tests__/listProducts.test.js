import React from 'react';
import renderer from 'react-test-renderer';

import ListProducts from '../pages/ListProducts';

it('renders correctly the list', () => {
  const tree = renderer.create(<ListProducts />).toJSON();
  expect(tree).toMatchSnapshot();
});
