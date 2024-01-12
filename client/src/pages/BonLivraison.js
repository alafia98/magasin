import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout';
import { Select, message } from 'antd';
import axios from 'axios';
import { format } from 'date-fns';
// import BonLivraisonController from '../../../controllers/bonLivraisonController';
const {Option} = Select;

const BonLivraison = () => {
  const [bonLivraison, setBonLivraison] = useState([])
    const [article, setArticle] = useState("")
    const [date, setDate] = useState("")
    const [unite, setUnite] = useState('');
    const [prixUnitaire, setPrixUnitaire] = useState('');
    const [quantite, setQuantite] = useState('');
    const [prixTotal, setPrixTotal] = useState(''); 

    const getAllLivraisons = async () => {
      try {
          const {data} = await axios.get('/api/v1/user/getBonLivraison',  {
              headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          })
          if(data?.success) {
            setBonLivraison(data.bonLivraison)
          }

      } catch (error) {
          console.log(error);
          message.error('Something went wrong in getting  bon livraison')
      }
  }
  useEffect(() => {
      getAllLivraisons()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const {data} = await axios.post('/api/v1/user/ajouterBonLivraison',
        {date, article, unite, prixUnitaire, quantite, prixTotal},
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}},)
        if(data?.success) {
            getAllLivraisons()
            message.success(`${article} is created`)
        } else {
            message.error(data.message)
        }
    } catch (error) {
        console.log(error);
        message.error('Something went wrong in input form')
    }
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
        <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Article" value={article} onChange={(e) => setArticle(e.target.value)} />
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
                    {bonLivraison.map((bonLivraison) => (
                        <tr key={bonLivraison._id}>
                            <td>{bonLivraison.code}</td>
                            <td>{format(new Date(bonLivraison.date), 'dd/MM/yyyy')}</td>
                            <td>{bonLivraison.article}</td>
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

export default BonLivraison

    // <Layout>
    //     <form style={{display:"flex", justifyContent:'space-evenly'}}>
    //         <input type='date'/>
    //         <Select placeholder="Selectionner le nom d'article" size="large" showSearch 
    //             className="form-select mb-3"  onChange={handleChange}>
    //             {materiels.map((type) => (
    //                 <Option key={type._id} value={type._id}>{type.nomMateriel}</Option>
    //             ))}
    //         </Select>
    //         <Select placeholder="Selectionner une unitée" size="large"
    //             showSearch className="form-select mb-3" onChange={(value) => {setUnite(value)}}>
    //             <Option value="Unité">Unité</Option>
    //             <Option value="Litre">Litre</Option>
    //             <Option value="Sachet">Sachet</Option>
    //             <Option value="Kg">Kg</Option>
    //             <Option value="Paquet">Paquet</Option>
    //             <Option value="Boite">Boite</Option>
    //         </Select>
    //         <input type="number" placeholder="Saisir le prix unitaire" />
    //         <input type="number" placeholder="Saisir la quantité" />
    //         <input type="number" placeholder="Saisir le prix total" />
    //         <button type='submit' className="btn btn-success">Ajouter</button>
    //     </form>
    //     <table className="table table-striped" style={{border:"2px solid"}}>
    //         <thead>
    //             <tr>
    //                 <th>Code</th>
    //                 <th>Date</th>
    //                 <th>Désignation</th>
    //                 <th>Unité</th>
    //                 <th>Prix Unitaire</th>
    //                 <th>Quantité</th>
    //                 <th>Prix Total</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {selectedMateriel && (
    //                 <tr>
    //                     <td>{}</td>
    //                 </tr>
    //             )}
    //         </tbody>
    //     </table>
    // </Layout>