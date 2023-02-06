import React from 'react';
import renderer from 'react-test-renderer';

import Search from '../pages/Search';

it('renders correctly the empty page', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});