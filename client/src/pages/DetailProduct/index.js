import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import ErrorAlert from '../../components/ErrorAlert';
import Loading from '../../components/Loading';
import Breadcrumb from '../../components/Breadcrumb';
import { Wrapper } from '../../styles/wrapper';
import { Container, Detail, Buy, Price } from './styles';

const DetailProduct = () => {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [failure, setFailure] = useState({ status: false, message: '' });
  const url = window.location.pathname;
  const id = url.split('/').pop();

  useEffect(() => {
    const loadProduct = async () => {
      window.scrollTo(0, 0);
      try {
        const { data } = await api.get(`/items/${id}`);
        setProduct({ id, author: data.message.author, item: data.message.item });
        setIsLoading(false);
      } catch (err) {
        setFailure({ status: true, message: err.message });
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const rootCategories = useMemo(() => {
    return product ? [...product.item.categories] : ['Buscando...'];
  }, [product]);

  const showError = () => <ErrorAlert message={failure.message} />;
  const showLoading = () => <Loading />;

  const showPrice = (value, currency, type = '$') => (
    <Price>
      <span>{type}</span>
      {value.toLocaleString(currency)}
      <small>00</small>
    </Price>
  );

  const showProduct = selectedProduct => (
   <>
      <Detail>
      <img src={selectedProduct.item.picture} alt={selectedProduct.item.title} />
      <section>
         <strong>Detalhes do Produto</strong>
         <p>{selectedProduct.item.description}</p>
      </section>
      </Detail>
      <Buy>
      <div>
         <small>
            {selectedProduct.item.condition} - {selectedProduct.item.sold_quantity} vendidos
         </small>
      </div>
      <strong>{selectedProduct.item.title}</strong>
      {showPrice(selectedProduct.item.price.amount, selectedProduct.item.price.currency)}
      <button type="button">Comprar</button>
      </Buy>
   </>
  );

  return (
    <Wrapper>
      <Breadcrumb categories={rootCategories} />
      <Container>
        {failure.status ? showError() : isLoading ? showLoading() : showProduct(product)}
      </Container>
    </Wrapper>
  );
};

export default DetailProduct;
