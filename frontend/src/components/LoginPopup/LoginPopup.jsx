import React, { useContext, useState } from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"


function LoginPopup({ setShowLogin }) {

    const { url, setToken } = useContext(StoreContext)

    const [currtState, setCurrState] = useState("Iniciar Sesión")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url
        if (currtState === "Iniciar Sesión") {
            newUrl += "/api/user/login"

        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currtState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currtState === "Iniciar Sesión" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Tu nombre' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Tu email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Tu contraseña' required />
                </div>
                <button type='submit'>{currtState === "Registrarse" ? "Crear cuenta" : "Iniciar Sesión"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>Para continuar acepta los términos y condiciones</p>
                </div>
                {currtState === "Iniciar Sesión"
                    ? <p>¿Crear una nueva cuenta?<span onClick={() => setCurrState("Registrarse")}> Click aquí</span></p>
                    :
                    <p>¿Ya tienes una cuenta?<span onClick={() => setCurrState("Iniciar Sesión")}> Inicia sesión aquí</span></p>
                }

            </form>
        </div>
    )
}

export default LoginPopup
