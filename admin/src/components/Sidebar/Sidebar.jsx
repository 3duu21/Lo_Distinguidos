import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Agregar Producto</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.clipboard} alt="" />
          <p>Productos</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Pedidos</p>
        </NavLink>
        <NavLink to='/orderManual' className="sidebar-option">
          <img src={assets.order_delivery} alt="" />
          <p>Pedido Manual</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
