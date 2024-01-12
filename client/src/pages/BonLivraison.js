import React, { useState } from 'react'
import Layout from './../components/Layout';
import { Select } from 'antd';
// import BonLivraisonController from '../../../controllers/bonLivraisonController';
const {Option} = Select;

const BonLivraison = () => {
    const [code, setCode] = useState("")
    const [article, setArticle] = useState("")
    const [unite, setUnite] = useState('');
    const [prixUnitaire, setPrixUnitaire] = useState('');
    const [quantite, setQuantite] = useState('');
    const [prixTotal, setPrixTotal] = useState(''); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bonLivraisonData = {code,article,unite,prixUnitaire,quantite,prixTotal};
        // try {
        //     const result = await BonLivraisonController.addBonLivraison(bonLivraisonData);
        //     console.log('Bon Livraison added successfully:', result);
        //     // Réinitialiser les champs du formulaire ou effectuer d'autres actions nécessaires après la soumission réussie
        //   } catch (error) {
        //     // Gérer l'erreur, afficher une alerte, etc.
        //   }
    }
  return (
    <Layout>
      <form style={{ display: 'flex', justifyContent: 'space-evenly' }} onSubmit={handleSubmit}>
        {/* Champs du formulaire */}
        <input type="text" placeholder="Article" value={article} onChange={(e) => setArticle(e.target.value)} />
        <Select placeholder="Sélectionner une unité" size="large" showSearch onChange={(value) => setUnite(value)}>
          {/* Options d'unité */}
        </Select>
        <input type="number" placeholder="Prix Unitaire" value={prixUnitaire} onChange={(e) => setPrixUnitaire(e.target.value)} />
        <input type="number" placeholder="Quantité" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
        <input type="number" placeholder="Prix Total" value={prixTotal} onChange={(e) => setPrixTotal(e.target.value)} />
        <button type="submit" className="btn btn-success">
          Ajouter
        </button>
      </form>
      {/* Tableau des bons de livraison */}
    </Layout>
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
  )
}

export default BonLivraison