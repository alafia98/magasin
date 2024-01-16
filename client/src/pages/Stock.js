import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './../components/Layout'

const Stock = () => {
  const [stock, setStock] = useState({});
  useEffect(() => {
    // Fonction pour récupérer le stock depuis le backend
    const fetchStock = async () => {
      try {
        const response = await axios.get('/api/v1/user/stock', 
          {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
        setStock(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du stock:', error);
      }
    };
    // Appeler la fonction pour récupérer le stock au chargement de la page
    fetchStock();
  }, []);
  return (
    <Layout>
      <div>
      <h2>Stock des materiels</h2>
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Quantité en stock</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(stock).map(([materiel, quantites]) => (
            <tr key={materiel}>
                  {Object.entries(quantites).map(([cle, valeur]) => (
                    <tr key={cle}>
                      <td>{cle} : </td>
                      <td>{valeur}</td>
                    </tr>
                    // <li key={cle}>{`${cle}: ${valeur}`}</li>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  )
}

export default Stock