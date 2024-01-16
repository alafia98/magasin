import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout';
import { format } from 'date-fns';
import { Select, message } from 'antd';
import axios from 'axios';
const {Option} = Select;

const BonCommande = () => {
  // const [materiels, setMateriels] = useState([])
  const [bonCommandes, setBonCommandes] = useState([])
  const [materiel, setMateriel] = useState("")
  const [dateSortie, setDateSortie] = useState("")
  const [unite, setUnite] = useState('');
  const [qteDemandee, setQteDemandee] = useState('');
  const [qteLivree, setQteLivree] = useState('');
  // const getAllMateriels = async () => {
  //   try {
  //     const {data} = await axios.get('/api/v1/user/getMateriels', {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     })
  //     if(data?.success) {
  //       setMateriels(data.materiels)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     message.error('Something went wrong in getting articles')
  //   }
  // }
  const getAllBonCommandes = async () => {
    try {
        const {data} = await axios.get('/api/v1/user/getBonCommandes',  {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        if(data?.success) {
          setBonCommandes(data.bonCommandes)
        }

    } catch (error) {
        console.log(error);
        message.error('Something went wrong in getting  bon Commande')
    }
}
  useEffect(() => {
    getAllBonCommandes()
    // getAllMateriels()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        const {data} = await axios.post('/api/v1/user/ajouterBonCommande',
                { dateSortie, materiel, unite, qteDemandee, qteLivree },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        if(data?.success) {
          getAllBonCommandes();
          message.success(`${materiel} is created`);
        } else {
          message.error(data.message);
        }
      } catch (error) {
        console.log(error);
        message.error('Something went wrong in input form');
      }
}

  return (
    <Layout>
      <form style={{ display: 'flex', justifyContent: 'space-evenly' }} onSubmit={handleSubmit}>
        <input type="date" placeholder="Date" value={dateSortie} onChange={(e) => setDateSortie(e.target.value)} />
        {/* <Select placeholder="Selectionner un materiel" size="large" showSearch 
          onChange={(value) => setMateriel(value)}>
          {materiels.map((materiel) => (
            <Option key={materiel._id} value={materiel._id}>
              {materiel.nomMateriel}
            </Option>
          ))}
        </Select> */}
        <input type="text" placeholder="Materiel" value={materiel} onChange={(e) => setMateriel(e.target.value)} />
        <Select placeholder="Selectionner une unitée" size="large"
            showSearch className="form-select mb-3" onChange={(value) => {setUnite(value)}}>
                <Option value="Unité">Unité</Option>
                <Option value="Litre">Litre</Option>
                <Option value="Sachet">Sachet</Option>
                <Option value="Kg">Kg</Option>
                <Option value="Paquet">Paquet</Option>
                <Option value="Boite">Boite</Option>
        </Select>
        <input type="number" placeholder="Prix Unitaire" value={qteDemandee} onChange={(e) => setQteDemandee(e.target.value)} />
        <input type="number" placeholder="Quantité" value={qteLivree} onChange={(e) => setQteLivree(e.target.value)} />
        <button type="submit" className="btn btn-success">Ajouter</button>
      </form>

      <div id="content" className=''>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Article</th>
                        <th scope="col">Unité</th>
                        <th scope="col">Quantité Demandé</th>
                        <th scope="col">Quantité Livré</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bonCommandes.map((bonCommande) => (
                        <tr key={bonCommande._id}>
                            <td>{format(new Date(bonCommande.dateSortie), 'dd/MM/yyyy')}</td>
                            <td>{bonCommande.materiel}</td>
                            <td>{bonCommande.unite}</td>
                            <td>{bonCommande.qteDemandee}</td>
                            <td>{bonCommande.qteLivree}</td>
                            <td >
                                {/* <button className="btn btn-primary" handleSubmit={handleUpdate} onClick={() => {setVisible(true);setSelected(materiel)}}>Modifier</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    </Layout>
  )
}

export default BonCommande