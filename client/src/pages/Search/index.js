import React from 'react';

import { MainContainer } from '../../components/MainContainer/styles';
import Navigation from '../../components/Navigation';

export default function Search() {
   return (
      <MainContainer>
         <Navigation categories={['Home']} />
      </MainContainer>
   );
}