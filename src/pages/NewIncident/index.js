import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowDownLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

import './styles.css'

export default () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  const history = useHistory();

  const ongId = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("incidents", { title, description, value }, {
        headers: {
          'Authorization': ongId
        }
      })
      history.push("/profile")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero" />

          <h2>Cadastrar novo caso</h2>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowDownLeft size={16} color="#E02041" /> Voltar para Home
          </Link>
        </section>

        <form onSubmit={e => handleSubmit(e)}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição do caso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}