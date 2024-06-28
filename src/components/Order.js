import React, { useState, useEffect,useContext } from 'react';
import { LoginCheck,Server } from '../App';
import { useNavigate } from 'react-router-dom';


const Order = () => {
  const [products, setProducts] = useState([]);
  const { status,updateStatus } = useContext(LoginCheck);
  const [cartItem,setCartItem]=useState([])
  const navigate=useNavigate();
  const {serverUrl}=useContext(Server);

  useEffect(() => {
    if(localStorage.getItem("token")){
      updateStatus(true);
  }
    async function fetchData() {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        };

        const response1 = await fetch(`${serverUrl}/api/order/fetchallorder`, requestOptions);

        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }

        const orders = await response1.json();
        setCartItem(orders);

        const productsData = await Promise.all(
          orders.map(async (order) => {
            const response2 = await fetch(`${serverUrl}/api/product/findproduct/${order.productId}`, requestOptions);
            if (!response2.ok) {
              throw new Error('Network response was not ok');
            }
            const productData = await response2.json();
            return productData;
          })
        );

        setProducts(productsData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    fetchData();
  }, [updateStatus,serverUrl]);

  return (
    <div className=" container d-flex align-content-around flex-wrap my-4">
      {products.map((product, index) => (
        <div key={index} className="d-flex px-2 py-2 border border-dark-subtle justify-content-between" style={{ width: '100%' }}>
          <img src={product.img} className="" width={40} alt={product.name} />
            <h5 className="card-text">{product.name}</h5>
            <div>
            <h5>{cartItem[index].status}</h5>
            <h9>{cartItem[index].date.split('T')[0]}</h9>
            </div>
        </div>
      ))}
      {(
        !status?(<div className='d-flex justify-content-center' style={{
          height:"80vh",
          width:"100%",
          alignItems:"center"
        }}><button className='btn btn-danger' onClick={()=>navigate("/login")}>Please Login First</button></div>)
      :!cartItem[0]&&(<div className='d-flex justify-content-center' style={{
        height:"80vh",
        width:"100%",
        alignItems:"center"
      }}><h3>No Any Order Yet!</h3></div>))}
    </div>
  );
};

export default Order;
