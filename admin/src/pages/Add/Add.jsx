import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({ url }) {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Burger Distinguidas",
        size: "Simple"
    });
    const [availableSizes, setAvailableSizes] = useState(["Simple", "Doble", "Triple"]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        // Actualizar el campo correspondiente en el estado
        setData(data => ({ ...data, [name]: value }));
    
        if (name === "category") {
            if (value === "Burger Distinguidas") {
                setAvailableSizes(["Simple", "Doble", "Triple"]);
                setData(data => ({ ...data, size: "Simple" }));
            } else if (value === "Churrascos 2 X 9.990" || value === "Otros") {
                setAvailableSizes(["Normal"]);  // Aquí establecemos "Normal" como el tamaño válido
                setData(data => ({ ...data, size: "Normal" }));
            } else {
                setAvailableSizes(["Normal", "XL"]);
                setData(data => ({ ...data, size: "Normal" }));
            }
        }
    };
    

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("size", data.size);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Burger Distinguidas",
                size: "Simple"
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Subir imagen</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" name='image' id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Nombre del producto</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Escribir aquí' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Descripción del producto</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" required rows="6" placeholder='Escribir las caracteristicas del producto aquí'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Categoria del producto</p>
                        <select onChange={onChangeHandler} name="category" value={data.category} required>
                            <option value="Burger Distinguidas">Burger Distinguidas</option>
                            <option value="Churrascos 2 X 9.990">Churrascos 2 X 9.990</option>
                            <option value="Completo">Completo</option>
                            <option value="Ass">Ass</option>
                            <option value="Churrasco">Churrasco</option>
                            <option value="Lomito">Lomito</option>
                            <option value="Pollo">Pollo</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
                    <div className="add-category flex-col">
                        <p>Tamaño del producto</p>
                        <select onChange={onChangeHandler} name="size" value={data.size}>
                            {availableSizes.length > 0 ? (
                                availableSizes.map((size, index) => (
                                    <option key={index} value={size}>{size}</option>
                                ))
                            ) : (
                                <option value="">Normal</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="add-price">
                    <p>Precio del producto</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" required name="price" placeholder='$20' />
                </div>
                <button type='submit' className='add-btn'>Agregar</button>
            </form>
        </div>
    );
}

export default Add;
