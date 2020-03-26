import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css'

import api from '../../services/api'

export default () => {

  const [incidents, setIncidents] = useState([]);
  
  const ongId = localStorage.getItem("id");
  const ongName = localStorage.getItem("name");

  const history = useHistory();

  useEffect(() => {
    const getIncidents = async () => {
      try {
        const response = await api.get("profile", {
          headers: {
            "Authorization": ongId
          }
        })
        
        setIncidents(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getIncidents();
  }, [ongId])

  const handleDelete = async(id) => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          'Authorization': ongId
        }
      });
    } catch (error) {
      console.log(error);
    }
    setIncidents(incidents.filter(incident => incident.id !== id));
  }

  const handleClick = () => {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="be the hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
        <button 
          type="button"
          onClick={handleClick}
        >
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h2>Casos cadastrados</h2>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            
            <strong>VALOR:</strong>
            <p>{incident.value}</p>

            <button onClick={() => handleDelete(incident.id)} type="button">
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}