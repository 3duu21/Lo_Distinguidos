import React, { useState, useContext, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

function Myorders() {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)

    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])
    return (
        <div className='myorders'>
            <h2>Mis pedidos</h2>
            <div className="container">
                {data.slice().reverse().map((order, index) => {
                    return (
                        <div key={index} className="myorders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity+" ,"
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Productos: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Actualizar estado</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Myorders
