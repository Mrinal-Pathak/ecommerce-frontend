import React,{useContext} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { LoginCheck } from '../App';

const Navbar = () => {
    const { status, updateStatus } = useContext(LoginCheck);
    const navigate=useNavigate();
    const logouthandle=()=>{

        localStorage.removeItem("token");
        updateStatus(false)
        console.log("in th function")
    }
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">E commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/order">My Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
                        </li>
                        
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                        
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    {(status)?
                    (<div>
                        <button className='btn btn-outline-primary mx-3'  onClick={()=>navigate("/profile")}>Profile</button>
                    <button className="btn btn-outline-danger" onClick={logouthandle}>Logout</button>
                    </div>):
                    (<button className="btn btn-outline-success" onClick={()=>navigate("/login")}>Login</button>)}


                </div>
            </div>
        </nav>
    )
}

export default Navbar


