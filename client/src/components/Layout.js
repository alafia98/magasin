import React, { useState } from 'react'
import "../styles/LayoutStyles.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AdminMenu} from './../Data/data';
import {message} from 'antd';

const Layout = ({children}) => {
    const location = useLocation()
    const navigate = useNavigate()

    // State to manage submenu visibility
    const [isAjouterMenuOpen, setIsAjouterMenuOpen] = useState(false);

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
                            const hasSubmenus = menu.submenus && menu.submenus.length > 0;
                            return (
                                <>
                                    <div key={menu.path} className={`menu-item ${isActive ? "active" : ""}`}>
                                        <div className="menu-link" onClick={() => hasSubmenus && setIsAjouterMenuOpen(!isAjouterMenuOpen)}>{menu.name}</div>
                                        {hasSubmenus && isAjouterMenuOpen && (
                                            <div className="submenu">
                                                {menu.submenus.map((submenu) => (
                                                    <div key={submenu.path} className="submenu-item">
                                                        <Link to={submenu.path}>{submenu.name}</Link>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
                            <div>Header</div>
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
