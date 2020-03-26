import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi/'
import {Link, useHistory} from 'react-router-dom'

import './style.css'

import herosImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import query from '../../helper/query'

export default () => {

  const [id, setId] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('session', {id});
      localStorage.setItem("id", id);
      localStorage.setItem("name", response.data.name);
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo" />

        <form onSubmit={e => handleLogin(e)}>
          <h2>Faça seu logon</h2>

          <input 
            placeholder="Seu ID" 
            value={id} 
            onChange={e => setId(e.target.value)}
          />
          <button 
            className="button" 
            type="submit"
          >
              Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
        {query('id') ? <p style={{marginTop: 20}}>ID: {query('id')}</p> : null}
      </section>
      <img src={herosImg} alt="Heroes" />
    </div>
  )
}