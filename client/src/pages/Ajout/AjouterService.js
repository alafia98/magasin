import React from 'react'
import Layout from '../../components/Layout'
import { Form, Col, Input, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const AjouterService = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/ajouterService', {...values}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success('Service Successfully!')
                navigate('/services')
              } else {
                message.error(res.data.message)
              }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Somthing went wrong')
        }
    }
  return (
    <Layout>
        <h1 className="text-center">Ajouter un Service</h1>
        <Form layout="vertical" onFinish={handleFinish}>
            <Row>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Code Service" name="serviceId" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Nom Service" name="nomService" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
            </Row>
            <div className='d-flex justify-content-end mb-3'>
                <button className='btn btn-primary' type='submit'>Ajouter</button>
            </div>
        </Form>
    </Layout>
  )
}

export default AjouterService