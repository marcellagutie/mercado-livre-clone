import React from 'react';

import { Wrapper } from '../../styles/wrapper';
import Navigation from '../../components/Navigation';

export default function Search() {
   return (
      <Wrapper>
         <Navigation categories={['Home']} />
      </Wrapper>
   );
}
