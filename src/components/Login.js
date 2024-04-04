import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [user, setuser] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: user.email, password: user.password})
        });
        const json = await response.json()
        if(json.authtoken){
            localStorage.setItem('token', json.authtoken)
            navigate('/')
        }
        if(json.error) {
            alert('Login failed')
        }
    }

    const change = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <form className='m-5' onSubmit={submit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={change} id="email" name='email' aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={change} id="password" name='password' />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login