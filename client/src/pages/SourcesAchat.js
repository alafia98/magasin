import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {Table, message } from 'antd'
import axios from 'axios'

const SourcesAchat = () => {
    const [sourcesAchat, setSourcesAchat] = useState([])
    const getSourcesAchat = async () => {
        try {
            const res = await axios.get('/api/v1/user/getSourcesAchat', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            if(res.data.success) {
                setSourcesAchat(res.data.data)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
    useEffect(() => {
        getSourcesAchat()
    }, [])

    const columns = [
        {title: "Code Source Achat", dataIndex:'sourceAchatId'},
        {title: "Nom Source Achat", dataIndex:'nomSourceAchat'},
        {title: "Actions", dataIndex:"actions", render: (text, record) => (
            <div className='d-flex'>
                <button className='btn btn-success'>Modifier</button>
                <button className='btn btn-danger'>Supprimer</button>
            </div>
        )}
    ]
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Sources d'Achat</h1>
        <Table columns={columns} dataSource={sourcesAchat}>

        </Table>
    </Layout>
  )
}

export default SourcesAchat;