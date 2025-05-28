import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: username,
      password: password
    };
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center">Login to our Portal:</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input text='text' className="form-control" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="mb-5">
                <input type="password" className='form-control' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              {error && <div className="text-danger">{error}</div>}
              {loading ? (
                <button type="submit" className="btn btn-info d-block mx-auto" disabled>Logging in ...</button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">Login</button>
              )}
            </form>          
          </div>
        </div>
      </div>
    </>
  )
}

export default Login