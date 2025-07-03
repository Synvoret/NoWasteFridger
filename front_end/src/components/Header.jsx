import { useContext } from 'react'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-center justify-content-center">
        <Link className="navbar-brand text-light" to="/">
          <img src="/public/nowastefridgerv1.png" alt="Logo" className="logo" style={{ transform: 'rotate(-5deg)', height: '160px'}} />
        </Link>
      </nav>
    </>
  )
}

export default Header