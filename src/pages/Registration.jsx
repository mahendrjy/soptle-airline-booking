'use client'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

const Registration = () => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  )
  const { user, setUser } = useContext(AppContext)
  const [isUser, setIsUser] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.name) {
      navigate('/booking')
    }
  }, [navigate, user])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
  }, [isUser])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    if (isUser) {
      const userExist = users.find(
        (user) => user.email === email
      )
      if (userExist) {
        if (userExist.password === password) {
          setUser({
            name: userExist.name,
            email: userExist.email,
          })
        } else {
          setError('Login failed - wrong password')
        }
      } else {
        setError('Login failed - user not found')
      }
    } else {
      const user = users.find((user) => user.email === email)
      if (user) {
        setError('User already exists')
      } else {
        setUsers((prev) => [...prev, { name, email, password }])
        setIsUser(true)
      }
    }
  }

  if (user?.name) return null

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          {isUser
            ? 'Sign in to your account'
            : 'Create your account'}
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isUser && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {isUser ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            {isUser ? 'New to us?' : 'Already a user?'}{' '}
            <button
              className="font-semibold leading-6 text-blue-400 hover:text-blue-300"
              onClick={() => setIsUser(!isUser)}
            >
              {isUser
                ? 'Create an account'
                : 'Sign in to your account'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default Registration
