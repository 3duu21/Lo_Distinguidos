import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState('home')

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")

    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} className='logo' alt='Logo' /></Link>
            <ul className='navbar-menu'>
                <a href="/" onClick={() => setMenu("home")} className={menu == 'home' ? 'active' : ''}>Inicio</a>
                <a href="/#Menu" onClick={() => setMenu("menu")} className={menu == 'menu' ? 'active' : ''}>Menú</a>
                <a href="/#Contacto" onClick={() => setMenu("contact")} className={menu == 'contact' ? 'active' : ''}>Contacto</a>
            </ul>
            <div className="navbar-right">
                {/* <img src={assets.search_icon} alt="" /> */}
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
                    :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Mis pedidos</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Cerrar sesión</p></li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar
