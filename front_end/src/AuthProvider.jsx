import { useState, useContext, createContext } from 'react'

// Create context for authentication
const AuthContext = createContext();

function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken') ? true : false
  );
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext };