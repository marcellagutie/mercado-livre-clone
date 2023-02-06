import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { Container } from './styles';

export default function Breadcrumb({ categories }) {
   const categoryLink = categories.map((category, index) => (
      <span key={`category-${index}`}>
         <a href="/">{category.name}</a>
         {index === categories.length - 1 ? '' : <MdKeyboardArrowRight />}
      </span>
   ));

   return <Container>{categoryLink}</Container>;
}