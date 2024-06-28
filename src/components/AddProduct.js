import React, { useEffect, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginCheck,Server } from '../App';

const AddProduct = () => {

    const [details,setDetails]=useState({productId:"",price:"",name:"",description:"",img:""})

    const navigate = useNavigate();
    const [alert, setAlert] = useState("");
    const { updateStatus } = useContext(LoginCheck);
    const {serverUrl}=useContext(Server);

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }


    const addProduct = async (e) => {
        e.preventDefault();
        
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token':localStorage.getItem("admintoken")
                    },
                    body: JSON.stringify(details)
                };

                const response1 = await fetch(`${serverUrl}/api/product/addproduct`, requestOptions);

                if (!response1.ok) {
                    setAlert("Product Id Already Exist!");
                    setTimeout(() => {
                        setAlert("");
                    }, 5000);
                    throw new Error('Network response was not ok');
                }else{
                    setAlert("Product Added successfully");
                    setTimeout(() => {
                        setAlert("");
                    }, 5000);
                    setDetails({productId:"",price:"",name:"",description:"",img:""})
                }

                // const authToken = await response1.json();


             
            } catch (error) {

                console.error('There was a problem with the fetch operation:', error);
            }       
        
    }

    useEffect(() => {
      if(!localStorage.getItem("admintoken")){
        navigate("/admin-login")
      }
      if(localStorage.getItem("token")){
        updateStatus(true);
    }
    
      return () => {
        
      }
    }, [navigate,updateStatus])
    


  return (
    <div className='container'>
        {alert && (<div className="alert alert-danger" role="alert">
                {alert}
            </div>)}
            <button className="btn btn-danger my-3" onClick={()=>{localStorage.removeItem("admintoken");navigate("/admin-login")}}>Logout Admin</button>
            <button className="btn btn-success mx-3 my-3" onClick={()=>navigate("/admin-dasboard")}>Go to Dasboard</button>
        <form className="row g-3 my-4" onSubmit={addProduct}>
                <div className="col-md-6">
                    <label htmlFor="inputName4" className="form-label">Product Id</label>
                    <input type="text" name="productId" value={details.productId} onChange={handleChange} className="form-control" id="inputProductId4" required minLength={3} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                    <input type="text" name="name" value={details.name} onChange={handleChange} className="form-control" id="inputName4" required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Price</label>
                    <input type="number" name="price" value={details.price} onChange={handleChange} className="form-control" id="inputPrice4" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Image URL</label>
                    <input type="text" name="img" value={details.img} onChange={handleChange} className="form-control" id="inputcImg4"  />
                </div>
                
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Description</label>
                    <input type="text" name="description" value={details.description} onChange={handleChange} className="form-control" id="inputDescription" placeholder="Enter Description Here" required minLength={6}/>
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Add product</button>
                </div>
            </form>
    </div>
  )
}

export default AddProduct