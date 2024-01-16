import React, {useEffect, useState} from 'react'
import Layout from './../components/Layout';
import { Modal, message } from 'antd';
import axios from 'axios'
import TypeMaterielForm from './Form/TypeMaterielForm';

const TypeMateriels = () => {
    const [typeMateriels, setTypeMateriels] = useState([])
    const [nomTypeMateriel, setNomTypeMateriel] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedNomTypeMateriel, setUpdatedNomTypeMateriel] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/v1/user/ajouterTypeMateriel', {nomTypeMateriel}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(data?.success) {
                getAllTypeMateriels()
                message.success(`${nomTypeMateriel} is created`)
            } else {
                message.error(data.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in input form')
        }
    }
    const getAllTypeMateriels = async () => {
        try {
            const {data} = await axios.get('/api/v1/user/getTypeMateriels',  {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(data?.success) {
                setTypeMateriels(data?.typeMateriels)
            }

        } catch (error) {
            console.log(error);
            message.error('Something went wrong in getting type materiel')
        }
    }
    useEffect(() => {
        getAllTypeMateriels()
    }, [])
    const handleUpdate = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put(`/api/v1/user/modifierTypeMateriel/${selected._id}`, {nomTypeMateriel:updatedNomTypeMateriel}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(data.success) {
                message.success(`${updatedNomTypeMateriel} is updated`)
                setSelected(null)
                setUpdatedNomTypeMateriel("")
                setVisible(false)
                getAllTypeMateriels()
            } else {
                message.error(data.message)
            }
        } catch (error) {
            message.error('Something went wrong');
        }
    }
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Types de Matériels</h1>
        <div className='p-3'>
            <TypeMaterielForm handleSubmit={handleSubmit}
             value={nomTypeMateriel} setValue={setNomTypeMateriel} />
        </div>
        <div id='content'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nom TM</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {typeMateriels?.map((typeMateriel) => (
                        <tr>
                            <td key={typeMateriel._id}>{typeMateriel.nomTypeMateriel}</td>
                            <td >
                                <button className="btn btn-primary" onClick={() => {setVisible(true);
                                    setUpdatedNomTypeMateriel(typeMateriel.nomTypeMateriel); setSelected(typeMateriel)}}>Modifier</button>
                            </td>                        
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                <TypeMaterielForm value={updatedNomTypeMateriel} setValue={setUpdatedNomTypeMateriel} handleSubmit={handleUpdate} />
            </Modal>
        </div>
    </Layout>
  )
}

export default TypeMateriels