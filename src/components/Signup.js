import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    
    const navigate = useNavigate()
    const [user, setuser] = useState({ name: '', email: '', password: '' })

    const submit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
        });
        const json = await response.json()
        
        if (json.authToken) {
            localStorage.setItem('token', json.authToken)
            navigate('/')
        }
        if (json.error || json.errors) {
            if(json.error) alert(json.error)
            if(json.errors) alert(json.errors[0].msg)
        }
    }

    const change = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className='m-5'>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" onChange={change} id="name" name='name' aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={change} id="email" name='email' aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={change} id="password" name='password' />
            </div>

            <button type="submit" onSubmit={submit} className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup