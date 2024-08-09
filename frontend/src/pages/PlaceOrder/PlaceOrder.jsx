import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate  } from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comuna: "Maipu",
    address: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data
      window.location.replace(session_url)
    } else {
      alert("Error")
    }

  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount()===0){
      navigate('/')
    }
  }, [token])


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Informacion del envío</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Nombre: '></input>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Apellido: '></input>
        </div>
        <div className="multi-fields">
          <select name='comuna' onChange={onChangeHandler} value={data.comuna} id=""><option value="">Maipu</option></select>
          <input required name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Dirección: ' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email:' />
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Celular: ' />
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
            <button type='submit'>Proceder a pagar</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
