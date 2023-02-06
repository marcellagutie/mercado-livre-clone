import React from 'react';
import renderer from 'react-test-renderer';

import DetailProduct from '../pages/DetailProduct';

it('renders correctly the details', () => {
  const tree = renderer.create(<DetailProduct />).toJSON();
  expect(tree).toMatchSnapshot();
});