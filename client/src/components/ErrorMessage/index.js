import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

import Container from './styles';

export default function ErrorMessage({ message }) {
   return (
      <Container>
         <MdErrorOutline size={80} />
         <p>Error</p>
         <span>{message}</span>
      </Container>
   );
}