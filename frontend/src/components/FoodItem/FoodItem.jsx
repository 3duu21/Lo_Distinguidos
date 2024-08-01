import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

    const [size, setSize] = useState('simple');
    const [addons, setAddons] = useState({
        carne: false,
        tocino: false,
        cheddar: false,
        huevo: false,
        palta: false,
        champiñones: false,
        pepinillos: false,
        cebollaCaramelizada: false,
    });

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleAddonChange = (event) => {
        const { name, checked } = event.target;
        setAddons((prevAddons) => ({
            ...prevAddons,
            [name]: checked,
        }));
    };

    const handleSubmit = () => {
        const selectedAddons = Object.keys(addons).filter((addon) => addons[addon]);
        console.log('Selected size:', size);
        console.log('Selected addons:', selectedAddons);
    };

    return (
        <div className='food-item'>
            <div className="foot-item-image-container">
                <img className='food-item-image' src={url+"/images/"+image} alt="" />
                {
                    !cartItems[id]
                        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} />
                        : <div className='food-item-counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">${price}</p>
                {/* <div className="options">
                    <div className="size-options">
                        <label>
                            <input
                                type="radio"
                                value="simple"
                                checked={size === 'simple'}
                                onChange={handleSizeChange}
                                className="radio-button"
                            />
                            Simple
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="doble"
                                checked={size === 'doble'}
                                onChange={handleSizeChange}
                                className="radio-button"
                            />
                            Doble
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="triple"
                                checked={size === 'triple'}
                                onChange={handleSizeChange}
                                className="radio-button"
                            />
                            Triple
                        </label>
                    </div>

                    <div className="addon-options">
                        {Object.keys(addons).map((addon) => (
                            <label key={addon}>
                                <input
                                    type="checkbox"
                                    name={addon}
                                    checked={addons[addon]}
                                    onChange={handleAddonChange}
                                    className="checkbox"
                                />
                                {addon.charAt(0).toUpperCase() + addon.slice(1)}
                            </label>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default FoodItem
