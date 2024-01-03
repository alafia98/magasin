import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout"
import {message} from 'antd';
import axios from 'axios';

const Materiels = () => {
    const [materiels, setMateriels] = useState([])
    const getMateriels = async () => {
        try {
            const res = await axios.get('/api/v1/user/getMateriels', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(res.data.success) {
                setMateriels(res.data.data)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
    useEffect(() => {
        getMateriels()
    }, [])
    const columns = [
        {title: "Code Matériel", dataIndex:'materielId'},
        {title: "Nom Matériel", dataIndex:'nomMateriel'},
        {title: "Type Matériel", dataIndex:'typeMateriel'},
        {title: "Nom Matériel", dataIndex:'nomMateriel'},
        {title: "Actions", dataIndex:"actions", render: (text, record) => (
            <div className='d-flex'>
                <button className='btn btn-success'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
            </div>
        )}
    ]
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Matériels</h1>
        
    </Layout>
  )
}

export default Materiels;