import React from 'react'
import Layout from "./../components/Layout"
import {Col, Form, Input, Row, message} from 'antd';
import axios from 'axios';

const TypeMateriel = () => {
    const onfinishHandler = async (values) => {
        try {
            const res = await axios.post('/api/v1/admin/typeMateriel', values)
            if(res.data.success) {
                message.success('Type Materiel Successfully!')
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
        <h1 className="text-center" style={{paddingTop: '50px'}}>Les Types de Matériel</h1>
        <Form layout="vertical" onFinish={onfinishHandler} className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Code de type</span>} name ="societeId" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Nom de type</span>} name ="nomSociete" required rules={[{required:true}]}>
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

export default TypeMateriel;