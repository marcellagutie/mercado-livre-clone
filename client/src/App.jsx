import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Router from './router';
import GlobalStyle from './styles/globalStyles';

function App() {
   return (
      <BrowserRouter>
         <Header />
         <GlobalStyle />
         <Router />
      </BrowserRouter>
   );
}

export default App;
