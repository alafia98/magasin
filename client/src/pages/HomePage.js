import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const HomePage = () => {
  const [materialTotal, setMaterialTotal] = useState(0);
  const [serviceTotal, setServiceTotal] = useState(0);

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      // Assuming res.data contains materialTotal and serviceTotal
      setMaterialTotal(res.data.materialTotal);
      setServiceTotal(res.data.serviceTotal);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Layout>
        <div >
          {/* Card for Material Total */}
          <h1 className="text-center">Stock des articles par type</h1>
          <div style={{ display: 'grid', gridTemplateColumns:'repeat(3, 1fr)', justifyItems:'center'}}>
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Produis d'hygiène</h3>
              <p>{serviceTotal}</p>
            </div>

            {/* Card for Service Total */}
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Fourniture de bureau</h3>
              <p>{serviceTotal}</p>
            </div>

            {/* Card for Service Total */}
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Fourniture d'imprimée</h3>
              <p>{serviceTotal}</p>
            </div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Matériel d'informatique</h3>
              <p>{serviceTotal}</p>
            </div>
           
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Plomberie sanitaire</h3>
              <p>{serviceTotal}</p>
            </div>
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Eléctricité</h3>
              <p>{serviceTotal}</p>
            </div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Menuisier</h3>
              <p>{serviceTotal}</p>
            </div>
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Habillement et Linge</h3>
              <p>{serviceTotal}</p>
            </div>
            <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Construction</h3>
              <p>{serviceTotal}</p>
            </div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{padding: '20px', margin: '10px', width: '70%' }}></div>
            <div style={{ border: '1px solid', padding: '20px', margin: '10px', width: '70%' }}>
            <h3>Matériel médico techniques et Mobilier hospitalier</h3>
              <p>{serviceTotal}</p>
                </div>
                <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '70%' }}>
              <h3>Matériel technique et Mobilier de bureau</h3>
              <p>{serviceTotal}</p>
            </div>
                <div style={{ border: '1px solid', padding: '20px', margin: '10px', width: '70%' }}>
                <h3>Divers</h3>
              <p>{serviceTotal}</p>
                </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
