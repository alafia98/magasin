

import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout';
import { Select, message } from 'antd';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
const {Option} = Select

const MainCourante = () => {
    const [quantities, setQuantities] = useState(Array.from({ length: 31 }, () => ({ entry: 0, exit: 0 })));

    const handleDayClick = (day) => {
        // Prompt the user to enter the quantity for the selected day
        const entryQuantity = prompt(`Enter quantity for day ${day} (Entry):`);
        const exitQuantity = prompt(`Enter quantity for day ${day} (Exit):`);

        // Update the quantities state with the entered values
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[day - 1] = { entry: entryQuantity || 0, exit: exitQuantity || 0 };
            return newQuantities;
        });
    };


    const [bonLivraisons, setBonLivraisons] = useState([])
    const [bonLivraison, setBonLivraison] = useState('')
    const [entries, setEntries] = useState([])
    const fetchBonLivraisons = async () => {
        try {
            const {data} = await axios.get('/api/v1/user/getBonLivraisons', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(data?.success) {
                setBonLivraisons(data.bonLivraisons)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getting type materiel')
        }
      };
    
      const handleSearch = () => {
        const selectedBonLivraison = bonLivraisons.find((livraison) => livraison._id === bonLivraison)
        if(selectedBonLivraison) {
            setEntries([{
                materiel : selectedBonLivraison.materiel,
                prixUnitaire : selectedBonLivraison.prixUnitaire,
                dateEntree :  selectedBonLivraison.dateEntree,
                quantite : selectedBonLivraison.quantite,
            }])
        } else {
            setEntries([])
        }
      };
        useEffect(() => {
            fetchBonLivraisons();
        }, []);
    
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Main Courante</h1>
        <form style={{display:"flex", justifyContent:'space-evenly'}} onSubmit={(e) => {e.preventDefault(); handleSearch();}}>
            <Select placeholder="Selectionner un type" size="large" showSearch 
                onChange={(value) => {setBonLivraison(value)}}>
                {bonLivraisons?.map((bonLivraison) => (
                    <Option key={bonLivraison._id} value={bonLivraison._id}>{bonLivraison.materiel}</Option>
                ))}
            </Select>
            <button type="submit" className="btn btn-success">Chercher</button>
        </form>
        {entries.length>0 && (
        <div id="content" className="text-center" style={{ paddingTop: '20px' }}>
          <h2>{entries[0].materiel}</h2>
            <table className="table table-striped" style={{border:"2px solid"}}>
                <thead>
                    <tr>
                        <th scope="col" rowspan="2">Observation</th>
                        <th scope="col" rowspan="2">Date</th>
                        {Array.from({ length: 12 }, (_, index) => (
                            <React.Fragment key={index}>
                                <th scope="col" colSpan="2">
                                    {new Intl.DateTimeFormat('fr', { month: 'long' }).format(new Date(2024, index, 1))}
                                </th>
                            </React.Fragment>
                        ))}
                    </tr>
                    <tr>
                        {Array.from({ length: 12 }, (_, index) => (
                        <React.Fragment key={index}>
                            <th>Entrées</th>
                            <th>Sorties</th>
                        </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {Array.from({ length: 31 }, (_, index) => (
                            <tr key={index+1}>
                                <td>obs</td>
                                <td><button type="submit" style={{border:'none'}} onClick={() => handleDayClick(index + 1)}>{index+1}</button></td>
                                {Array.from({ length: 12 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        <td>{quantities[index].entry}</td>
                                        <td>{quantities[index].exit}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                            
                ))}
                </tbody>
                <tfooter>
                    <tr>
                        <td colspan="2">Totaux</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">Prix de l'Unité</td>
                        <td>{entries[0].prixUnitaire}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Décompte</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">Réstants le 1ère</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">Totaux des restants et des entrées</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">Totaux des sorties</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">Balance :</td>
                        <td></td>
                    </tr>
                </tfooter>
            </table>
        </div>
      )}
    </Layout>
  )
}

export default MainCourante

                   {/* {entries.map((entry, index) => (
                    <tr key={index}>
                        <td></td>
                        {Array.from({ length: 31 }, (_, index) => (
                            <tr key={index+1}>
                                <td><button type="submit">{index+1}</button></td>
                            </tr>
                            ))}
                        <td>{format(new Date(entry.dateEntree), 'dd/MM/yyyy')}</td>
                        <td>{entry.quantite}</td>
                    </tr>
                   ))} */}