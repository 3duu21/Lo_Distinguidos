import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    const [selectedSize, setSelectedSize] = useState('')

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value)
    }

    // Definir los tamaños disponibles según la categoría seleccionada
    const sizeOptions = () => {
        if (category === "Burger Distinguidas") {
            return (
                <>
                    <option value="Simple">Simple</option>
                    <option value="Doble">Doble</option>
                    <option value="Triple">Triple</option>
                </>
            )
        } else if (category === "Churrascos 2 X 9.990" || category === "Bebestibles") {
            return null
        } else {
            return (
                <>
                    <option value="Normal">Normal</option>
                    <option value="XL">XL</option>
                </>
            )
        }
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Los mejores sabores para tí</h2>

            {/* Solo muestra el filtro de tamaño si hay opciones disponibles */}
            {sizeOptions() && (
                <div className="filter">
                    <p>Filtrar por tamaño:</p>
                    <select onChange={handleSizeChange} value={selectedSize}>
                        <option value="">Todos</option>
                        {sizeOptions()}
                    </select>
                </div>
            )}

            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (
                        (category === "All" || category === item.category) &&
                        (selectedSize === "" || selectedSize === item.size)
                    ) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} size={item.size} image={item.image} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
