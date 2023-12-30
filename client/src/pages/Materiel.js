import React from 'react'
import Layout from "./../components/Layout"
import {Col, Form, Input, Row, Select, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Materiel = () => {
    const { Option } = Select;
    const navigate = useNavigate()
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/admin/materiel', values)
            if(res.data.success) {
                message.success('Materiel Successfully!')
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
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Matériels</h1>
        <Form layout="vertical" onFinish={onfinishHandler} className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Code de matériel</span>} name ="societeId" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Nom de matériel</span>} name ="nomSociete" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Type de matériel</span>} name ="nomSociete" required rules={[{required:true}]}>
                        <Select defaultValue='Séléctionner'>
                            <Option value='Séléctionner'>Séléctionner</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Marque</span>} name ="marque" >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Modèle</span>} name ="modèle">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Réfférence</span>} name ="réfférence">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Origine</span>} name ="origine" >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>N° de Série</span>} name ="serie" >
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

export default Materiel;