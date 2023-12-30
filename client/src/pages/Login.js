import React from 'react';
import '../styles/RegisterStyles.css';
import {Form, Input, message} from 'antd';
import {useDispatch} from 'react-redux';
import {showLoading, hideLoading} from "../redux/features/alertSlice";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token", res.data.token)
        message.success('Login Successfully')
        navigate('/')
      } else {
        message.error(res.data.message)
      }
     } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wong')
    }
  }
  return (
    <>
        <div className="form-container" style={{display:'flex', justifyContent:'space-evenly'}}>
        <img src={require('../assets/logo.png')} alt='L.G.S.A.M' style={{width:'30%'}} />
          <Form layout='vertical' onFinish={onfinishHandler} className="card p-4" style={{width:'30%'}}>
            <h3 className='text-center'>Login Form</h3>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <button className='btn btn-primary' type="submit">Login</button>
          </Form>
        </div>
    </>
  )
}

export default Login