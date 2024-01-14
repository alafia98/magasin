import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout';
import { Select, message } from 'antd';
import axios from 'axios';
import { format } from 'date-fns';
const {Option} = Select;

const BonLivraisons = () => {
  const [materiels, setMateriels] = useState([])
  const [bonLivraisons, setBonLivraisons] = useState([])
  const [dateEntree, setDateEntree] = useState("")
  const [materiel, setMateriel] = useState("")
  const [unite, setUnite] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [quantite, setQuantite] = useState('');
  const [prixTotal, setPrixTotal] = useState(''); 

    const getAllMateriels = async () => {
      try {
        const {data} = await axios.get('/api/v1/user/getMateriels', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        if(data?.success) {
          setMateriels(data.materiels)
        }
      } catch (error) {
        console.log(error);
        message.error('Something went wrong in getting articles')
      }
    }
  const getAllBonLivraisons = async () => {
      try {
          const {data} = await axios.get('/api/v1/user/getBonLivraisons',  {
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          if(data?.success) {
            setBonLivraisons(data.bonLivraisons)
          }

      } catch (error) {
          console.log(error);
          message.error('Something went wrong in getting  bon livraison')
      }
  }
  
  useEffect(() => {
    getAllBonLivraisons()
      getAllMateriels()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
      try {
        // const selectedMaterielObj = materiels.find((materiel) => materiel.nomMateriel === selectedMateriel)
        const {data} = await axios.post('/api/v1/user/ajouterBonLivraison',
                { dateEntree, materiel, unite, prixUnitaire, quantite, prixTotal },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        if(data?.success) {
          getAllBonLivraisons();
          message.success(`${materiel} is created`);
        } else {
          message.error(data.message);
        }
      } catch (error) {
        console.log(error);
        message.error('Something went wrong in input form');
      }
//     try {
//         const {data} = await axios.post('/api/v1/user/ajouterBonLivraison',
//         {dateEntree, article, unite, prixUnitaire, quantite, prixTotal},
//         {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}},)
//         if(data?.success) {
//             getAllLivraisons()
//             message.success(`${article} is created`)
//         } else {
//             message.error(data.message)
//         }
//     } catch (error) {
//         console.log(error);
//         message.error('Something went wrong in input form')
//     }
}

const calculatePrixTotal = () => {
  const prixUnitaireNumber = parseFloat(prixUnitaire);
  const quantiteNumber = parseFloat(quantite);

  // Vérifiez si les valeurs sont des nombres valides
  if (!isNaN(prixUnitaireNumber) && !isNaN(quantiteNumber)) {
    const total = prixUnitaireNumber * quantiteNumber;
    setPrixTotal(total.toFixed(2)); // Fixez le nombre de décimales selon vos besoins
  } else {
    setPrixTotal(''); // Réinitialisez le prix total si les valeurs ne sont pas valides
  }
};
useEffect(() => {
  calculatePrixTotal();
}, [prixUnitaire, quantite]);

  return (
    <Layout>
      <form style={{ display: 'flex', justifyContent: 'space-evenly' }} onSubmit={handleSubmit}>
        {/* Champs du formulaire */}
        <input type="date" placeholder="Date" value={dateEntree} onChange={(e) => setDateEntree(e.target.value)} />
        {/* <input type="text" placeholder="Article" value={article} onChange={(e) => setArticle(e.target.value)} /> */}
        <Select placeholder="Selectionner un materiel" size="large" showSearch 
        onChange={(value) => setMateriel(value)}>
          {materiels.map((materiel) => (
            <Option key={materiel._id} value={materiel._id}>
              {materiel.nomMateriel}
            </Option>
          ))}
        </Select>
        <Select placeholder="Selectionner une unitée" size="large"
            showSearch className="form-select mb-3" onChange={(value) => {setUnite(value)}}>
                <Option value="Unité">Unité</Option>
                <Option value="Litre">Litre</Option>
                <Option value="Sachet">Sachet</Option>
                <Option value="Kg">Kg</Option>
                <Option value="Paquet">Paquet</Option>
                <Option value="Boite">Boite</Option>
        </Select>
        <input type="number" placeholder="Prix Unitaire" value={prixUnitaire} onChange={(e) => setPrixUnitaire(e.target.value)} />
        <input type="number" placeholder="Quantité" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
        <input type="number" placeholder="Prix Total" value={prixTotal} disabled />
        <button type="submit" className="btn btn-success">Ajouter</button>
      </form>
      
      <div className=''>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Date</th>
                        <th scope="col">Article</th>
                        <th scope="col">Unité</th>
                        <th scope="col">Prix Unitaire</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Prix Total</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bonLivraisons.map((bonLivraison) => (
                        <tr key={bonLivraison._id}>
                            <td>{bonLivraison.code}</td>
                            <td>{format(new Date(bonLivraison.dateEntree), 'dd/MM/yyyy')}</td>
                            <td>{bonLivraison.nomMateriel}</td>
                            <td>{bonLivraison.unite}</td>
                            <td>{bonLivraison.prixUnitaire}</td>
                            <td>{bonLivraison.quantite}</td>
                            <td>{bonLivraison.prixTotal}</td>
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

export default BonLivraisons