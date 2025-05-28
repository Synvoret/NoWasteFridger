import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const userData = {
      username: username,
      email: email,
      password: password
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData)
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center">Create account:</h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <input text='text' className="form-control" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <small>{errors.username && <div className="text-danger">{errors.username}</div>}</small>
              </div>
              <div className="mb-3">
                <input type="email" className='form-control' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* <small>{errors.email && <div className="text-danger">{errors.email}</div>}</small> */}
              </div>
              <div className="mb-5">
                <input type="password" className='form-control' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <small>{errors.password && <div className="text-danger">{errors.password}</div>}</small>
              </div>
              {success && <div className="alert alert-success">Registration succssful</div>}
              {loading ? (
                <button type="submit" className="btn btn-info d-block mx-auto" disabled>Please wait</button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">Register</button>
              )}
            </form>          
          </div>
        </div>
      </div>
    </>
  )
}

export default Register