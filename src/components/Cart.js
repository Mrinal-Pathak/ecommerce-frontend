import React, { useState, useEffect ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCheck,Server } from '../App';


const Cart = () => {
  const [products, setProducts] = useState([]);
  const { status,updateStatus } = useContext(LoginCheck);
  const [cartItem,setCartItem]=useState([])
  const [total,setTotal]=useState(0)
  const navigate=useNavigate();
  const {serverUrl}=useContext(Server);

  const handleBuy=()=>{
    cartItem.forEach(async(index) => {
      try {
  

        // POST request options
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem("token")
          },
          body:JSON.stringify({productId:index.productId,status:"ordered"})
        };
        // console.log(props.serverUrl)
        // Make the POST request
        const response = await fetch(`${serverUrl}/api/order/addorder`, requestOptions);
  
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Parse the JSON response
        let data = await response.json();
        
        console.log(data)
  
        
      } catch (error) {
  
        console.error('There was a problem with the fetch operation:', error);
  
      }


      try {
  

        // POST request options
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem("token")
          },
  
        };
        const response = await fetch(`${serverUrl}/api/cart/removefromcart/${index._id}`, requestOptions);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        let data = await response.json();
        
        console.log(data)
    
        
      } catch (error) {
  
        console.error('There was a problem with the fetch operation:', error);
  
      }


    });
    setCartItem([]);
    setProducts([]);
    setTotal(0);
  }

  const removeCart=async(index)=>{
    try {
  

      // POST request options
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem("token")
        },

      };
      // Make the POST request
      const response = await fetch(`${serverUrl}/api/cart/removefromcart/${cartItem[index]._id}`, requestOptions);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      let data = await response.json();
      
      console.log(data)

      const updatedCartItems = cartItem.filter((_, i) => i !== index);
      const updatedProducts = products.filter((_, i) => i !== index);

      setCartItem(updatedCartItems);
      setProducts(updatedProducts);
      setTotal(updatedProducts.reduce((sum, product) => sum + product.price, 0));
    } catch (error) {

      console.error('There was a problem with the fetch operation:', error);

    }
  }

  useEffect(() => {
    if(localStorage.getItem("token")){
      updateStatus(true);
  }
    async function fetchData() {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        };

        const response1 = await fetch(`${serverUrl}/api/cart/fetchallitems`, requestOptions);

        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }

        const orders = await response1.json();
        setCartItem(orders)
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

  useEffect(() => {
    const calculatedTotal = products.reduce((sum, product) => sum + product.price, 0);
    setTotal(calculatedTotal);
  }, [products]);

  return (
    <div className=" container d-flex align-content-around flex-wrap my-4" >
      {products.map((product,index) =>(
        <div key={index} className="d-flex px-2 py-2 border border-dark-subtle justify-content-between" style={{ width: '100%' }}>
          <img src={product.img} className="" width={40} alt={product.name} />
          
            <h5 className="card-text">{product.name}
            </h5>
              <div className='d-flex'>
              <h4>₹{product.price}</h4>
          <button type="button" className="btn-close align-self-flex-end mx-3" aria-label="Close" onClick={()=>{removeCart(index)}}></button>
          </div>
        </div>
      ))}
      {status?(total!==0?(<div className="container d-flex my-4 justify-content-between">
      <h3>Total:{total}</h3>
      
      <button className='btn btn-danger' onClick={handleBuy}>Buy Now</button>
      </div>):(<div className='d-flex justify-content-center' style={{
        height:"80vh",
        width:"100%",
        alignItems:"center"
      }}>
        <h3>No Items in the Cart</h3>
      </div>)):(<div className='d-flex justify-content-center' style={{
        height:"80vh",
        width:"100%",
        alignItems:"center"
      }}><button className='btn btn-danger' onClick={()=>navigate("/login")}>Please Login First</button></div>)}
    </div>
  );
};

export default Cart;
