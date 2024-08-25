import React, { useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()

    const { url } = useContext(StoreContext)

    console.log(url); 

    const verifyPayment = async () => {
    console.log(url + "/api/order/verify"); // Para depurar la URL
    try {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    } catch (error) {
        navigate("/");
    }
};


    useEffect(()=>{
        verifyPayment()
    },[])


    return (
        <div className='verify'>
            <div className="spinner"></div>

        </div>
    )
}

export default Verify
