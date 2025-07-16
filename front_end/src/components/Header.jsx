import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Header = () => {
      return (
        <nav className="navbar container align-items-center justify-content-center">
          <Link className="navbar-brand text-light" to="/">
            <img 
              src="/public/nowastefridgerv1.png" 
              alt="Logo" 
              className="logo" 
              style={{ transform: 'rotate(-5deg)', height: '160px'}} 
            />
          </Link>
        </nav>
      )
};




