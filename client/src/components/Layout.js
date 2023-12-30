import React from 'react'
import "../styles/LayoutStyles.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AdminMenu} from './../Data/data';
import {message} from 'antd';

const Layout = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()

    // logout function
    const handleLogout = () => {
        localStorage.clear()
        message.success('Logout Successfully')
        navigate('/login')
    }

  return (
    <>
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        <img src={require('../assets/sante.jpg')} alt='sante' style={{width:'100%'}} />
                    </div>
                    <div className='menu'>
                        {AdminMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    
                                    <div key={menu.path} className={`menu-item ${isActive ? "active" : ""}`}>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <Link to='/login'>Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <div className="header-content">
                            <i className='fa-solid fa-bell'></i>
                        </div>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout
