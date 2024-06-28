import React, { useEffect,useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginCheck,Server } from '../App';






const AdminDasboard = () => {
    const navigate=useNavigate();
    const [products, setProducts] = useState([]);
    const [cartItem,setCartItem]=useState([]);
    const { updateStatus } = useContext(LoginCheck);
    const {serverUrl}=useContext(Server);



    async function fetchData() {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('admintoken'),
          },
        };

        const response1 = await fetch(`${serverUrl}/api/order/fetchallorderadmin`, requestOptions);

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




    const markDelivered=async(id)=>{
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('admintoken'),
                },
                body:JSON.stringify({status:"Delivered"})
              }; 
              console.log(id)
              const response1 = await fetch(`${serverUrl}/api/order/updateorder/${id}`, requestOptions);
  
          if (!response1.ok) {
            throw new Error('Network response was not ok');
          }

          fetchData();      
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {
      if(!localStorage.getItem("admintoken")){
        console.log("your are not loged in")
        navigate("/admin-login");
      }
      if(localStorage.getItem("token")){
        updateStatus(true);
    }

      async function fetchData() {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('admintoken'),
            },
          };
  
          const response1 = await fetch(`${serverUrl}/api/order/fetchallorderadmin`, requestOptions);
  
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
    
      return () => {
        
      }
    }, [navigate,updateStatus,serverUrl])
    
  return (
    <div className='container'>
        <button className="btn btn-danger my-3" onClick={()=>{localStorage.removeItem("admintoken");navigate("/admin-login")}}>Log out Admin</button>
        <button className="btn btn-primary mx-3 my-3" onClick={()=>navigate("/add-product")}>Add New Product</button>
        <div className=" container d-flex align-content-around flex-wrap my-4">
      {products.map((product, index) => (
        <div key={index} className="d-flex px-2 py-2 border border-dark-subtle justify-content-between" style={{ width: '100%' }}>
          <img src={product.img} className="" width={40} alt={product.name} />
            <h5 className="card-text">{product.name}</h5>
            
            <div>
                {cartItem[index].status!=="Delivered"&&(<button onClick={()=>markDelivered(cartItem[index]._id)} className="btn btn-success">Mark Delivered</button>)}
            <h5>{cartItem[index].status}</h5>
            <p>{cartItem[index].user}</p>
            <p>{cartItem[index].date.split('T')[0]}</p>
            </div>
        </div>
      ))}
      {!cartItem[0]&&(<div className='d-flex justify-content-center' style={{
        height:"80vh",
        width:"100%",
        alignItems:"center"
      }}><h3>No Any Order Yet!</h3></div>)}
    </div>
    </div>
  )
}

export default AdminDasboard