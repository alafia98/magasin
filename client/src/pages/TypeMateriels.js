import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {Table, message } from 'antd'
import axios from 'axios'

const TypeMateriels = () => {
    const [typeMateriels, setTypeMateriels] = useState([])
    const getTypeMateriels = async () => {
        try {
            const res = await axios.get('/api/v1/user/getTypeMateriels', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(res.data.success) {
                setTypeMateriels(res.data.data)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
    useEffect(() => {
        getTypeMateriels()
    }, [])

    const columns = [
        {title: "Code Type Matériel", dataIndex:'typeMaterielId'},
        {title: "Nom Type Matériel", dataIndex:'nomTypeMateriel'},
        {title: "Actions", dataIndex:"actions", render: (text, record) => (
            <div className='d-flex'>
                <button className='btn btn-success'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
            </div>
        )}
    ]
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Types des Matériels</h1>
        <Table columns={columns} dataSource={typeMateriels}>

        </Table>
    </Layout>
  )
}

export default TypeMateriels;