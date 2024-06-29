import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Server} from '../App'

const Signup = () => {

    const [info, setInfo] = useState({ name: "", phone: "", email: "", password: "", cpassword: "", address: "" })
    const navigate = useNavigate();
    const [alert, setAlert] = useState("");
    const [showPass,setShowPass]=useState("password");
    const {serverUrl}=useContext(Server);


    const createAccount = async (e) => {
        e.preventDefault();
        if (info.password === info.cpassword) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: info.name,
                        email: info.email,
                        password: info.password,
                        address: info.address,
                        phone: info.phone
                    })
                };

                const response1 = await fetch(`${serverUrl}/api/auth/createuser`, requestOptions);

                if (!response1.ok) {
                    setAlert("Email Already Exist!");
                    setTimeout(() => {
                        setAlert("");
                    }, 5000);
                    throw new Error('Network response was not ok');
                }

                // const authToken = await response1.json();


                navigate("/login")
            } catch (error) {

                console.error('There was a problem with the fetch operation:', error);
            }
        } else {
            console.log("password is not same");
            setAlert("Password is not same");
                    setTimeout(() => {
                        setAlert("");
                    }, 5000);
        }
    }

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            {alert && (<div className="alert alert-danger" role="alert">
                {alert}
            </div>)}
            <form className="row g-3 my-4" onSubmit={createAccount}>
                <div className="col-md-6">
                    <label htmlFor="inputName4" className="form-label">Name</label>
                    <input type="text" name="name" value={info.name} onChange={handleChange} className="form-control" id="inputName4" required minLength={3} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" name="email" value={info.email} onChange={handleChange} className="form-control" id="inputEmail4" required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type={showPass} name="password" value={info.password} onChange={handleChange} className="form-control" id="inputPassword4" required minLength={6} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Conform Password</label>
                    <input type={showPass} name="cpassword" value={info.cpassword} onChange={handleChange} className="form-control" id="inputcPassword4" required minLength={6}/>
                </div>
                <div className="btn btn-success my-3" onClick={()=>{showPass==="password"?setShowPass("text"):setShowPass("password")}}>{showPass==="password"?"Show":"Hide"} Password</div>
                <div className="col-md-6">
                    <label htmlFor="inputPhone4" className="form-label">Phone No.</label>
                    <input type="tel" name="phone" value={info.phone} onChange={handleChange} className="form-control" id="inputPhone4" required />
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" name="address" value={info.address} onChange={handleChange} className="form-control" id="inputAddress" placeholder="Enter Address Here" required minLength={3}/>
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Signup