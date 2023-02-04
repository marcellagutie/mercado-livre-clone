import React from 'react';
import { Routes, Route, } from 'react-router-dom';

import ErrorMessage from './components/ErrorMessage';
import ProductDetail from './pages/ProductDetail';
import ResultsSearch from './pages/ResultsSearch';
import Search from './pages/Search';

export default function Router() {

   return (
      <Routes>
         <Route path="/" exact element={<Search />}/>
         <Route path={`items`}  element={<ResultsSearch />} />
         <Route path="/items/:id" element={<ProductDetail/>} />
         <Route
            path="*"
            component={() => <ErrorMessage message="Está página não existe" />}
         />
      </Routes>
   );
}