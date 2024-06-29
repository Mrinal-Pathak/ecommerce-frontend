import React, { useState, useContext } from 'react'
import { LoginCheck,Server } from '../App';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { updateStatus } = useContext(LoginCheck);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass,setShowPass]=useState("password");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const {serverUrl}=useContext(Server);


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()


    try {

      // POST request options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })

      };
      // Make the POST request
      const response = await fetch(`${serverUrl}/api/auth/admin-login`, requestOptions);

      // Check if the request was successful
      if (!response.ok) {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 8000);
        throw new Error('please enter your correct information');
      }

      // Parse the JSON response
      let data = await response.json();
      localStorage.setItem("admintoken", data.authToken)
      updateStatus(true);
      navigate("/admin-dasboard");
      console.log(data)
    } catch (error) {

      console.error('There was a problem with the fetch operation:', error);

    }
  }
  return (
    <div>
      {alert && (<div className="alert alert-danger" role="alert">
        Wrong info! Please enter your correct information!
      </div>)}
      <div className='container d-flex flex-column'>
        <h2>Admin Login</h2>
        <form className='container d-flex flex-column my-4' onSubmit={handleSubmit} >
          <div class="form-floating mb-3">
            <input type="email" className="form-control" onChange={handleEmail} value={email} id="floatingInput" placeholder="name@example.com" required />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type={showPass} className="form-control" onChange={handlePassword} value={password} id="floatingPassword" placeholder="Password" minLength={6} />
            <label for="floatingPassword">Password</label>
            <div className="btn btn-success my-3" onClick={()=>{showPass==="password"?setShowPass("text"):setShowPass("password")}}>{showPass==="password"?"Show":"Hide"} Password</div>
          </div>


          <button type="submit" className="btn btn-primary my-3" >Login</button>
        </form>
        {/* <h6 className='btn' onClick={() => navigate("/signup")}>Create New account</h6> */}
      </div>
    </div>
  )
}

export default AdminLogin