import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {Button, Table, message } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Services = () => {
    const [services, setServices] = useState([])
    const getServices = async () => {
        try {
            const res = await axios.get('/api/v1/user/getServices', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(res.data.success) {
                setServices(res.data.data)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
    useEffect(() => {
        getServices()
    }, [])

    const columns = [
        {title: "Code Service", dataIndex:'serviceId'},
        {title: "Nom Service", dataIndex:'nomService'},
        {title: "Actions", dataIndex:"actions", render: (text, record) => (
            <div className='d-flex'>
                <button className='btn btn-success'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
            </div>
        )}
    ]
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Services</h1>
        <Link to='/ajouterService'>
            <Button type="primary">Ajouter nouvelle Société</Button>
        </Link>
        <Table id='content' columns={columns} dataSource={services}></Table>
    </Layout>
  )
}

export default Services;