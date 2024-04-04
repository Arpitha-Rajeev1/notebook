import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()
    let location = useLocation()
    let token = localStorage.getItem('token')

    const submit = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {!token && location.pathname === '/login' && <form className="d-flex">
                    <Link type="button" to='/signup' className="mx-3 btn btn-warning">Sign up</Link>
                </form>}
                {!token && location.pathname === '/signup' && <form className="d-flex">
                    <Link type="button" to='/login' className="mx-3 btn btn-success">Login</Link>
                </form>}
                {token && <form className="d-flex">
                    <button type="button" onClick={submit} className="mx-3 btn btn-danger">Logout</button>
                </form> 
                }
            </div>
        </nav>
    )
}

export default Navbar