import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext)

  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Informacion del envío</p>
        <div className="multi-fields">
          <input type="text" placeholder='Nombre: '></input>
          <input type="text" placeholder='Apellido: '></input>
        </div>
        <input type="email" placeholder='Email:' />
        <input type="text" placeholder='Dirección: ' />
        <input type="text" placeholder='Celular: ' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Precio del pedido</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button>Proceder a pagar</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
