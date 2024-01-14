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
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* Card for Material Total */}
          <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '200px' }}>
            <h3>Material Total</h3>
            <p>{materialTotal}</p>
          </div>

          {/* Card for Service Total */}
          <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '200px' }}>
            <h3>Service Total</h3>
            <p>{serviceTotal}</p>
          </div>

           {/* Card for Service Total */}
           <div style={{ border: '1px solid', padding: '10px', margin: '10px', width: '200px' }}>
            <h3>Societe Total</h3>
            <p>{serviceTotal}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
