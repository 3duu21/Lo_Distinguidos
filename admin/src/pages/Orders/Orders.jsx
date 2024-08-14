import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'

function Orders({ url }) {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")

    if (response.data.success) {
      setOrders(response.data.data)

    } else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
    }

  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Lista de pedidos</h3>
      <div className="order-list">
        {orders.slice().reverse().map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.lenght - 1) {
                    return item.name + " (" + item.size + ")" + " x " + item.quantity
                  }
                  else {
                    return item.name + " (" + item.size + ")" + " x " + item.quantity + " / "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.address}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Productos: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Procesando pedido">Procesando pedido</option>
              <option value="Entrega local">Entrega local</option>
              <option value="Entrega delivery">Entrega delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
