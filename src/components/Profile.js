import React, { useState,useEffect,useContext } from 'react'
import { LoginCheck,Server } from '../App';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    const [data,setData]=useState({});
    const { updateStatus } = useContext(LoginCheck);
    const navigate=useNavigate();
    const {serverUrl}=useContext(Server);

    useEffect(() => {
        if(localStorage.getItem("token")){
            updateStatus(true);
        }
        const fetchData=async()=>{
        try {

            // POST request options
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem("token")
              }
      
            };
            // Make the POST request
            const response = await fetch(`${serverUrl}/api/auth/getuser`, requestOptions);
      
            // Check if the request was successful
            if (!response.ok) {
            //   setAlert(true);
            //   setTimeout(() => {
            //     setAlert(false);
            //   }, 8000);
              throw new Error('please enter your correct information');
            }
      
            // Parse the JSON response
            let userData = await response.json();
            // localStorage.setItem("token", data.authToken)
            // updateStatus(true);
            // navigate("/");
            setData(userData)
            console.log(userData)
          } catch (error) {
      
            console.error('There was a problem with the fetch operation:', error);
      
          }
        }
        fetchData();
    
      return () => {
      }
    }, [updateStatus,serverUrl])
    

  return (
    <div className='container d-flex flex-column'>
        <h2 className='my-4'>{data.name}</h2>
        <h7>Phone No.:- {data.phone}</h7>
        <h7>Email:- {data.email}</h7>
        <h7>Address:- {data.address}</h7>
        <button onClick={()=>navigate("/order")} className='btn btn-outline-primary my-3'>My Orders</button>
        <button onClick={()=>navigate("/cart")} className='btn btn-outline-primary '>My Cart</button>

    </div>
  )
}

export default Profile