import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout"
import {Button, Table, message} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Societes = () => {
    const [societes, setSocietes] = useState([])
    const getSocietes = async () => {
        try {
            const res = await axios.get('/api/v1/user/getSocietes', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(res.data.success) {
                setSocietes(res.data.data)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
    useEffect(() => {
        getSocietes()
    }, [])

    // antd table col
    const columns = [
        {title: "Code Société", dataIndex:'societeId'},
        {title: "Nom Société", dataIndex:'nomSociete'},
        {title: "Adresse", dataIndex:'adresse'},
        {title: "Email", dataIndex:'email'},
        {title: "Fax ou Télé", dataIndex:'fax'},
        {title: "Nom Contact", dataIndex:'nomContact'},
        {title: "Fonction", dataIndex:'fonction'},
        {title: "N° Téléphone", dataIndex:'phone'},
        {title: "Observation", dataIndex:'observation'},
        {title: "Actions", dataIndex:"actions", render: (text, record) => (
            <div className='d-flex'>
                <button className='btn btn-success'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
            </div>
        )}
    ]
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Sociétés</h1>
        <Link to='/ajouterSociete'>
            <Button type="primary">Ajouter nouvelle Société</Button>
        </Link>
        <Table id='content' columns={columns} dataSource={societes}></Table>
    </Layout>
  )
}

export default Societes;