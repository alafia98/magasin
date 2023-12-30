import React from 'react'
import Layout from "./../components/Layout"
import {Col, Form, Input, Row,  message} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TypeUnite = () => {
    const navigate = useNavigate()
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/admin/typeUnite', values)
            if(res.data.success) {
                message.success("Type d'unité Successfully!")
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
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Unités</h1>
        <Form layout="vertical" onFinish={onfinishHandler} className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Code Unité</span>} name ="societeId" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Type Unité</span>} name ="nomSociete" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{display:'flex', justifyContent:'center'}}>
                <button className="btn btn-primary form-btn" type="Submit">Ajouter</button>      
            </Row>
        </Form>
    </Layout>
  )
}

export default TypeUnite;