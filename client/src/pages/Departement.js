import React from 'react'
import Layout from "./../components/Layout"
import {Col, Form, Input, Row, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Departement = () => {
    const navigate = useNavigate()
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/admin/departement', values)
            if(res.data.success) {
                message.success('Departement Successfully!')
                navigate('/')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
    // const handleFinish = async (values) => {
    //     try {
    //         const response = await fetch('/societe', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ ...values, status: 'pending' }),
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             console.log('Société added successfully:', data);
    //         } else {
    //             console.error('Error adding société:', data);
    //         }
    //     } catch (error) {
    //         console.error('Error adding société:', error);
    //     }
    // };
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Départements</h1>
        <Form layout="vertical" onFinish={onfinishHandler} className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Code Département</span>} name ="societeId" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Nom Département</span>} name ="nomSociete" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item >
                        <button className="btn btn-primary form-btn" type="Submit">Ajouter</button>      
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default Departement;