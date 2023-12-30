import React from 'react'
import Layout from "./../components/Layout"
import {Col, Form, Input, Row, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Societe = () => {
    const navigate = useNavigate()
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/admin/societe', values)
            if(res.data.success) {
                message.success('Societe Successfully!')
                navigate('/')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Sociétés</h1>
        <Form layout="vertical" onFinish={onfinishHandler} className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Code Société</span>} name ="societeId" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Nom Société</span>} name ="nomSociete" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Adresse</span>} name ="adresse">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Ville</span>} name ="ville">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Région</span>} name ="region">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Nom Contact</span>} name ="nomContact">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Fonction</span>} name ="fonction">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>N° Téléphone</span>} name ="phone">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Email</span>} name ="email">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item ></Form.Item>
                    <Form.Item >
                        <button className="btn btn-primary form-btn" type="Submit">Ajouter</button>      
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default Societe;