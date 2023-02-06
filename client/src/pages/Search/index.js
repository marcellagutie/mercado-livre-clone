import React from 'react';

import { Wrapper } from '../../styles/wrapper';
import Breadcrumb from '../../components/Breadcrumb';

export default function Search() {
   return (
      <Wrapper>
         <Breadcrumb categories={['Home']} />
      </Wrapper>
   );
}
