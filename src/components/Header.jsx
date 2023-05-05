import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import { useContext } from 'react'

const Header = () => {
  const { user, setUser } = useContext(AppContext)
  const location = useLocation()

  const handleLogout = () => {
    setUser({ name: '', email: '' })
  }

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-6">
        {location.pathname === '/admin' && user?.name ? (
          <Link
            to="/registration"
            className="text-sm leading-6 text-gray-50 hover:text-gray-400"
          >
            Customer Registration
          </Link>
        ) : (
          <Link
            to="/admin"
            className="text-sm leading-6 text-gray-50 hover:text-gray-400"
          >
            Admin
          </Link>
        )}

        {user.name ? (
          <button
            onClick={handleLogout}
            className="text-sm leading-6 text-gray-50 hover:text-gray-400"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/registration"
            className="text-sm leading-6 text-gray-50 hover:text-gray-400"
          >
            Customer Registration
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
