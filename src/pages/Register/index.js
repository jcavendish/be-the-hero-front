 import React, { useState } from 'react';
 import { Link, useHistory } from 'react-router-dom';
 import { FiArrowDownLeft } from 'react-icons/fi'

 import logoImg from '../../assets/logo.svg'
 import api from '../../services/api'

 import './style.css';

 export default () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await api.post("ongs", { name, email, whatsapp, city, uf });
      history.push(`/?id=${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero" />

          <h2>Cadastro</h2>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowDownLeft size={16} color="#E02041" /> Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={e => handleSubmit(e)}>
          <input 
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail da ONG" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="whatsapp" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="city" 
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="uf" 
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{width: 80}} 
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}