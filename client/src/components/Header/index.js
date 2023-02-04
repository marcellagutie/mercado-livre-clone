import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import search from '../../assets/ic_Search.png';
import Logo from '../../assets/Logo_ML.png';

import { Container } from './styles';

export default function Header() {
   const [varInput, setVarInput] = useState('');
   const navigate = useNavigate();

   const handleSearch = useCallback(
      e => {
         e.preventDefault();
         navigate(`items?search=${varInput}`);
         setVarInput('');
      },
      [navigate, varInput]
   );

   return (
      <Container>
         <nav>
            <Link to="/">
               <img src={Logo} alt="Search" />
            </Link>
            <form
               onSubmit={e => {
                  handleSearch(e);
               }}
            >
               <div>
                  <input
                     type="text"
                     placeholder="Buscar..."
                     value={varInput}
                     onChange={e => setVarInput(e.target.value)}
                  />
                  <button type="submit">
                     <img src={search} alt="Search" />
                  </button>
               </div>
            </form>
         </nav>
      </Container>
   );
}
