import React, { useEffect, useState,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Server} from '../App'

const Product = () => {
  const { id } = useParams();
  const [data, setdata] = useState({})
  const navigate = useNavigate();
  const [alert,setAlert]=useState(false);
  const {serverUrl}=useContext(Server);

  const addToCart = async () => {
    if ((localStorage.getItem("token"))) {
      try {

        // POST request options
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          },
          body: JSON.stringify({ productId: id })

        };
        // console.log(props.serverUrl)
        // Make the POST request
        const response = await fetch(`${serverUrl}/api/cart/addtocart`, requestOptions);

        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        let data = await response.json();

        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        console.log(data)
      } catch (error) {

        console.error('There was a problem with the fetch operation:', error);

      }
    } else {
      navigate("/login")
    }
  }

  useEffect(() => {
    async function fetchData() {


      try {

        // POST request options
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        };
        // console.log(props.serverUrl)
        // Make the POST request
        const response = await fetch(`${serverUrl}/api/product/findproduct/${id}`, requestOptions);

        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        let data = await response.json();
        setdata(data);

        console.log(data)
      } catch (error) {

        console.error('There was a problem with the fetch operation:', error);

      }
    }
    fetchData();

    return () => {


    }
  }, [id,serverUrl]);

  return (
    <>
      {alert&&(<div id="alert" className={`alert alert-success d-flex justify-content-center `} role="alert">
        Added to Cart!
      </div>)}
      <div className="container d-flex flex-wrap my-5">
        <img src={data.img} className='img-thumbnail img-fluid mx-4' alt="..." style={{
          height: "auto",
          width: "40vh",
          // aspectRatio:"fill"
        }}></img>
        <div>
          <h2>{data.name}</h2>
          <h3>₹{data.price}</h3>
          <button className="btn btn-danger" onClick={addToCart}>Add to Cart</button>
          <p>{data.description}</p>
        </div>
      </div>
    </>
  )
}

export default Product