import React from 'react'
import "../styles/LayoutStyles.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AdminMenu} from './../Data/data';
import {message} from 'antd';
import { useSelector } from 'react-redux';

const Layout = ({children}) => {
    const {user} = useSelector((state) => state.user)
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
                        {AdminMenu.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && "active"}`}>
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
                        <ul className="header-content" >
                            <li><Link to='/bonlivraison'>Bon Livraison</Link></li>
                            <li><Link to='/boncommande'>Bon Commande</Link></li>
                            <li><Link to='/maincourante'>Main Courante</Link></li>
                            <li><Link to='/inventaire'>Inventaire</Link>
                                <ul style={{width:"20vw"}}>
                                    <li ><Link to='/inventaire/medical'>Materiel Médical et Médico-Technique</Link></li>
                                    <li ><Link to='/inventaire/technique'>Matériel Technique et Mobilier be Bureau</Link></li>
                                </ul>
                            </li>
                            <li><Link to='/profile'>{user?.name}</Link></li>
                        </ul>
                    </div>
                    <div className='body'>{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout
