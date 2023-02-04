import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { MainContainer } from '../../components/MainContainer/styles';
import Navigation from '../../components/Navigation';
import api from '../../services/api';

import { Container, Detail, Buy, Price } from './styles';

export default function ProductDetail() {
   const [product, setProduct] = useState();
   const [isloading, setIsLoading] = useState(true);
   const [failure, setFailure] = useState({ status: false, message: '' });
   const url = useLocation().pathname;
   const id = url.split('/').pop();

   useEffect(() => {

      async function loadProduct() {
         window.scrollTo(0, 0);

         try {
            const resp = await api.get(`/items/${id}`).catch(() => {
               throw new Error('Produto não encontrado');
            });

            const { author, item } = resp.data.message;
            setProduct({ id, author, item });
            setIsLoading(false);

         } catch (err) {
            setFailure({ status: true, message: err.message });
            setIsLoading(false);
         }
      }

      loadProduct();
   }, [id]);

   const rootCategories = useMemo(() => {
      if (product) {
         return [...product.item.categories];
      }
      return ['Buscando...'];
   }, [product]);

   function showError() {
      return <ErrorMessage message={failure.message} />;
   }

   function showLoading() {
      return <Loading />;
   }

   function showPrice(value, currency, type = '$') {
      return (
         <Price>
            <span>{type}</span>
            {value.toLocaleString(currency)}
            <small>00</small>
         </Price>
      );
   }

   function showProduct(p) {
      return (
         <>
            <Detail>
               <img src={p.item.picture} alt={p.item.title} />
               <section>
                  <strong>Detalhes do Produto</strong>
                  <p>{p.item.description}</p>
               </section>
            </Detail>
            <Buy>
               <div>
                  <small>
                     {p.item.condition} - {p.item.sold_quantity} vendidos
                  </small>
               </div>
               <strong>{p.item.title}</strong>
               {showPrice(p.item.price.amount, p.item.price.currency)}
               <button type="button">Comprar</button>
            </Buy>
         </>
      );
   }

   return (
      <MainContainer>
         <Navigation categories={rootCategories} />
         <Container>
            {failure.status
               ? showError()
               : isloading
               ? showLoading()
               : showProduct(product)}
         </Container>
      </MainContainer>
   );
}