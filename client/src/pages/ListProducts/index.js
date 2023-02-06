import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import shipping from '../../assets/ic_shipping@2x.png.png';
import ErrorAlert from '../../components/ErrorAlert';
import Loading from '../../components/Loading';
import { Wrapper } from '../../styles/wrapper';
import Breadcrumb from '../../components/Breadcrumb';
import api from '../../services/api';

import { Container, Product, Description, Pagination } from './styles';

export default function ListProducts() {
   const [products, setProducts] = useState([]);
   const [isloading, setIsLoading] = useState(true);
   const [failure, setFailure] = useState({ status: false, message: '' });
   const [page, setPage] = useState(0);
   const URL = new URLSearchParams(window.location.search).get('search');
   const ITEMS_PER_PAGE = 4;

   useEffect(() => {
      setIsLoading(true);
      async function loadProduct() {
         setIsLoading(true);
         setFailure({ status: false, message: "" });

         try {
            const resp = await api.get(`/items?q=${URL}`);
            const [...searchs] = resp.data.message.items;
            const result =  searchs.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
            setProducts(result);
         } catch (err) {
            setFailure({ status: true, message: err.message });
         } finally {
            setIsLoading(false);
         }
      }

      loadProduct();
   }, [URL, page]);

   const showError = () => <ErrorAlert message={failure.message} />;

   const showLoading = () => <Loading />;

   const showSearch = (product, index) => {
      return (
         <>
            <Product>
               <img src={product.picture} alt={product.id} />
               <div>
                  <div>
                     <span>
                        $ {product.price.amount.toLocaleString(product.price.currency)}
                     </span>
                     {product.free_shiping ? (
                        <img src={shipping} alt={product.id} />
                     ) : (
                        ''
                     )}
                  </div>
                  <Description>{product.title}</Description>
                  <Description>Valor em {product.price.currency}</Description>
               </div>
               <small>{product.city}</small>
            </Product>
            {index === products.length - 1 ? '' : <hr />}
         </>
      );
   }

   return (
      <Wrapper>
        <Breadcrumb categories={["Busca"]} />
        <Container>
          {failure.status ? (
            showError()
          ) : isloading ? (
            showLoading()
          ) : (
            products.map((product, index) => (
              <Link key={product.id} to={`/items/${product.id}`}>
                {showSearch(product, index)}
              </Link>
            ))
          )}
          {!failure.status && (
            <Pagination>
              <button
                type="button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page - 1);
                }}
                disabled={page <= 0 || isloading}
              >
                Anterior
              </button>
              <span>{page + 1}</span>
              <button
                type="button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setPage(page + 1);
                }}
                disabled={isloading}
              >
                Próximo
              </button>
            </Pagination>
          )}
        </Container>
      </Wrapper>
    );

}
