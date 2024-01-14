import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout"
import { Modal, Select, message } from 'antd'
import axios from 'axios'
const {Option} = Select

const Materiels = () => {
    const [typeMateriels, setTypeMateriels] = useState([])
    const [materiels, setMateriels] = useState([])
    const [nomMateriel, setNomMateriel] = useState("")
    const [typeMateriel, setTypeMateriel] = useState("")
    const [model, setModel] = useState("")
    const [serie, setSerie] = useState("")
    const [reference, setReference] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedNomMateriel, setUpdatedNomMateriel] = useState("")
    const [updatedTypeMateriel, setUpdatedTypeMateriel] = useState("")
    const [updatedModel, setUpdatedModel] = useState("")
    const [updatedSerie, setUpdatedSerie] = useState("")
    const [updatedReference, setUpdatedReference] = useState("")
    const [updatedUnite, setUpdatedUnite] = useState("")
    const [unite, setUnite] = useState("")

    const getAllTypeMateriels = async () => {
        try {
            const {data} = await axios.get('/api/v1/user/getTypeMateriels',  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(data?.success) {
                setTypeMateriels(data.typeMateriels)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getting type materiel')
        }
    }
    useEffect(() => {
        getAllTypeMateriels()
    }, [])

    const getAllMateriels = async () => {
        try {
            const {data} = await axios.get('/api/v1/user/getMateriels',  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(data?.success) {
                setMateriels(data.materiels)
            }

        } catch (error) {
            console.log(error);
            message.error('Something ent wrong in getting  materiel')
        }
    }
    useEffect(() => {
        getAllMateriels()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/v1/user/ajouterMateriel',
            {nomMateriel, typeMateriel, model, unite, serie, reference},
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}},)
            if(data?.success) {
                getAllMateriels()
                getAllTypeMateriels()
                message.success(`${nomMateriel} iscreated`)
            } else {
                message.error(data.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in input form')
        }
    }
    const handleUpdate = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put(`/api/v1/user/modifierMateriel/${selected._id}`, {
                nomMateriel:updatedNomMateriel, typeMateriel:updatedTypeMateriel, model:updatedModel, serie:updatedSerie, reference:updatedReference}, 
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            if(data.success) {
                message.success(`${updatedNomMateriel} is updated`)
                setSelected(null)
                setUpdatedNomMateriel("")
                setVisible(false)
                getAllMateriels()
            } else {
                message.error(data.message)
            }
        } catch (error) {
            message.error('Something went wrong');
        }
    }
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Matériels</h1>
        <div className="p-3">
            <div className="mb-3">
                <input type="text" placeholder="Entrer le nom"
                value={nomMateriel} onChange={(e) => setNomMateriel(e.target.value)} />
            </div>
            <Select placeholder="Selectionner un type" size="large"
            showSearch className="form-select mb-3" onChange={(value) => {setTypeMateriel(value)}}>
                {typeMateriels?.map((typeMateriel) => (
                    <Option key={typeMateriel._id} value={typeMateriel._id}>{typeMateriel.nomTypeMateriel}</Option>
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
            <div className="mb-3">
                <input type="text" placeholder="Entrer le modèle"
                value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Entrer la Série"
                value={serie} onChange={(e) => setSerie(e.target.value)} />
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Entrer la référence"
                value={reference} onChange={(e) => setReference(e.target.value)} />
            </div>
            <div className="mb-3">
                <button className="btn btn-success" onClick={handleSubmit}>Ajouter</button>
            </div>
        </div>
        <div className=''>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nom Matériel</th>
                        <th scope="col">Type Matériel</th>
                        <th scope="col">Unité</th>
                        <th scope="col">Modèle</th>
                        <th scope="col">Série</th>
                        <th scope="col">Référence</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {materiels.map((materiel) => (
                        <tr key={materiel._id}>
                            <td>{materiel.nomMateriel}</td>
                            <td>{materiel.typeMateriel}</td>
                            <td>{materiel.unite}</td>
                            <td>{materiel.model}</td>
                            <td>{materiel.serie}</td>
                            <td>{materiel.reference}</td>
                            <td >
                                <button className="btn btn-primary" handleSubmit={handleUpdate} onClick={() => {setVisible(true);
                                    setSelected(materiel)}}>Modifier</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                <div className="p-3">
                    <div className="mb-3">
                        <input type="text" placeholder="Entrer le nom"
                        value={updatedNomMateriel} onChange={(e) => setUpdatedNomMateriel(e.target.value)} />
                    </div>
                    <Select placeholder="Selectionner un type" size="large"
                    showSearch className="form-select mb-3" onChange={(value) => {setUpdatedTypeMateriel(value)}}>
                        {typeMateriels?.map((type) => (
                            <Option key={type._id} value={type._id}>{type.nomTypeMateriel}</Option>
                        ))}
                    </Select>
                    <Select placeholder="Selectionner une unitée" size="large"
                        showSearch className="form-select mb-3" onChange={(value) => {setUpdatedUnite(value)}}>
                        <Option value="Unité">Unité</Option>
                        <Option value="Litre">Litre</Option>
                        <Option value="Sachet">Sachet</Option>
                        <Option value="Kg">Kg</Option>
                        <Option value="Paquet">Paquet</Option>
                        <Option value="Boite">Boite</Option>
                    </Select>
                    <div className="mb-3">
                        <input type="text" placeholder="Entrer le modèle"
                        value={updatedModel} onChange={(e) => setUpdatedModel(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Entrer le modèle"
                        value={updatedSerie} onChange={(e) => setUpdatedSerie(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Entrer le modèle"
                        value={updatedReference} onChange={(e) => setUpdatedReference(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success" onClick={handleSubmit}>Modifier</button>
                    </div>
                </div>
            </Modal>
    </Layout>
  )
}

export default Materiels;