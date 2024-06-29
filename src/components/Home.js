import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginCheck, Server } from '../App';


const Home = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true)
    const { updateStatus } = useContext(LoginCheck);
    const { serverUrl } = useContext(Server);

    // let products=useRef();
    let navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const showProduct = (id) => {
            navigate(`/product/${id}`)
        }

        if (localStorage.getItem("token")) {
            updateStatus(true);
        }

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
                const response = await fetch(`${serverUrl}/api/product/fetchallproduct`, requestOptions);

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the JSON response
                let data = await response.json();
                setLoading(false);
                setProducts(data.map(list => {
                    return (
                        <div className='my-2' onClick={() => showProduct(list.productId)} style={{ cursor: 'pointer' }}>
                            <div className="card" style={{ width: "18rem", height: "25rem" }}>
                                <img src={list.img} className="card-img-top" height={300} alt="..." />
                                <div className="card-body">
                                    <p className="card-text">{list.name}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                )
                console.log(data)
            } catch (error) {

                console.error('There was a problem with the fetch operation:', error);

            }
        }

        fetchData();

        return () => {


        }
    }, [updateStatus, navigate, serverUrl]);



    return (
        <div className='container my-5 d-flex align-content-around flex-wrap justify-content-between'>
            {loading ? (<div className='d-flex justify-content-center' style={{height:"100vh",width:"100vw"}}><div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div></div>) : products}
        </div>
    )
}

export default Home