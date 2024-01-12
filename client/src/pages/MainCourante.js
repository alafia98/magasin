import React from 'react'
import Layout from './../components/Layout';
import { Select } from 'antd';
const {Option} = Select
const MainCourante = () => {
    
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Main Courante</h1>
        <form style={{display:"flex", justifyContent:'space-evenly'}}>
            <Select style={{width:200}} showSearch>
                {/* selectionner option a partir de tableau dans mongoose */}
            </Select>
            <button type="submit" className="btn btn-success">Chercher</button>
        </form>
        {/* <h2 className="text-center" style={{paddingTop: '50px'}}>{afficher le nom a partir d'option}</h2> */}
        <table className="table table-striped" style={{border:"2px solid"}}>
                <thead>
                    <tr>
                        <th scope="col" rowspan="2">Observation</th>
                        <th scope="col" rowspan="2">Date</th>
                        <th scope="col" colspan="2">Janvier</th>
                        <th scope="col" colspan="2">Février</th>
                        <th scope="col" colspan="2">Mars</th>
                        <th scope="col" colspan="2">Avril</th>
                        <th scope="col" colspan="2">Mai</th>
                        <th scope="col" colspan="2">Juin</th>
                        <th scope="col" colspan="2">Juillet</th>
                        <th scope="col" colspan="2">Aout</th>
                        <th scope="col" colspan="2">Séptembre</th>
                        <th scope="col" colspan="2">Octobre</th>
                        <th scope="col" colspan="2">Novembre</th>
                        <th scope="col" colspan="2">Décembre</th>
                    </tr>
                    <tr>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                        <th>Entrées</th>
                        <th>Sorties</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({length:31}, (_, index) => (
                        <tr key={index+1}>
                            <td></td>
                            <td>{index+1}</td>
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
                        <td></td>
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

    </Layout>
  )
}

export default MainCourante