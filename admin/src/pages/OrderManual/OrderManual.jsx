import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './OrderManual.css';

function OrderManual({ url }) {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]); // Estado para la lista filtrada
  const [cart, setCart] = useState([]);
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      setFilteredList(response.data.data); // Inicializar la lista filtrada
    } else {
      toast.error('Error al obtener la lista de productos');
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredList(
      list.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      )
    );
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    toast.success(`${item.name} agregado al carrito`);
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
    toast.info('Producto removido del carrito');
  };

  const handleOrderSubmit = async () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    const orderData = {
      address: {
        firstName: customerFirstName,
        lastName: customerLastName,
        phone: customerPhone,
        address: "Pedido Manual",
      },
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      })),
      amount: cart.reduce((total, item) => total + item.price * item.quantity, 0) + 3000,
    };

    try {
      const response = await axios.post(`${url}/api/order/orderManual`, orderData);
      if (response.data.success) {
        toast.success('Orden realizada con éxito');
        setCart([]);
        setCustomerFirstName("");
        setCustomerLastName("");
        setCustomerPhone("");
      } else {
        toast.error('Error al realizar la orden');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al realizar la orden');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h3>Información del Cliente</h3>
      <div className="customer-info">
        <input
          className='input-form'
          type="text"
          placeholder="Nombre"
          value={customerFirstName}
          onChange={(e) => setCustomerFirstName(e.target.value)}
          required
        />
        <input
          className='input-form'
          type="text"
          placeholder="Apellido"
          value={customerLastName}
          onChange={(e) => setCustomerLastName(e.target.value)}
          required
        />
        <input
          className='input-form'
          type="text"
          placeholder="Celular"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          required
        />
      </div>

      <div className="cart">
        <h3>Carrito</h3>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className='cart-item'>
              <p>{item.name} (x{item.quantity}) {item.size}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFromCart(item._id)} className='eliminar'>Eliminar</p>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <button onClick={handleOrderSubmit} className='realizar-pedido'>Realizar Pedido</button>
        )}
        {/* Calcular el total */}
        {cart.length > 0 && (
          <b>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</b>
        )}
      </div>
      <p>MENÚ</p>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
        className='input-form'
      />
      <div className="list-table">
        <div className="list-table-format title">
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Categoria</b>
          <b>Precio</b>
          <b>Tamaño</b>
          <b>Acción</b>
        </div>
        {filteredList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p>{item.size}</p>
            <p onClick={() => addToCart(item)} className='agregar'>Agregar</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderManual;
