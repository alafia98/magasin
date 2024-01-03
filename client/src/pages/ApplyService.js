import React from 'react'
import Layout from "../components/Layout"
import {Col, Form, Input, Row, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {showLoading, hideLoading} from '../redux/features/alertSlice';
import axios from 'axios';

const ApplyService = () => {
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-service', {...values, userId: user._id}, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success(res.data.success)
                navigate('/')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something Went Wrong')
        }
    }
  return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Ajouter un Service</h1>
        <Form layout="vertical" onFinish={handleFinish} className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Code Service</span>} name ="serviceId" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label={<span style={{ fontSize:'1.5rem'}}>Nom Service</span>} name ="nomService" required rules={[{required:true}]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item >
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

export default ApplyService;