import React from 'react';
import { Routes, Route, } from 'react-router-dom';

import ErrorAlert from './components/ErrorAlert';
import DetailProduct from './pages/DetailProduct';
import ListProducts from './pages/ListProducts';
import Search from './pages/Search';

export default function Router() {

   return (
      <Routes>
         <Route path="/" exact element={<Search />}/>
         <Route path={`items`}  element={<ListProducts />} />
         <Route path="/items/:id" element={<DetailProduct/>} />
         <Route
            path="*"
            component={() => <ErrorAlert message="Está página não existe" />}
         />
      </Routes>
   );
}