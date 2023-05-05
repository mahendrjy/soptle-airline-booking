import { useState, useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const FlightSearch = ({ setRoute }) => {
  const { routes } = useContext(AppContext)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const uniqueFroms = [
    ...new Set(routes.map((route) => route.from)),
  ]
  const uniqueTo = [...new Set(routes.map((route) => route.to))]

  const handleOriginChange = (event) => {
    setOrigin(event.target.value)
  }

  const handleDestinationChange = (event) => {
    setDestination(event.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const route = routes.find((route) => {
      return route.from === origin && route.to === destination
    })
    setRoute(route)
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Search Flights</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label
            className="block text-gray-50 font-bold mb-2"
            htmlFor="origin"
          >
            Origin
          </label>
          <select
            className="rounded w-full py-2 px-3 text-gray-800"
            id="origin"
            value={origin}
            onChange={handleOriginChange}
          >
            <option value="">Select origin</option>
            {uniqueFroms.map((from) => (
              <option key={from} value={from}>
                {from}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-50 font-bold mb-2"
            htmlFor="destination"
          >
            Destination
          </label>
          <select
            className="rounded w-full py-2 px-3 text-gray-800"
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">Select destination</option>
            {uniqueTo.map((to) => (
              <option key={to} value={to}>
                {to}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={
            origin.length === 0 || destination.length === 0
          }
          className="bg-gray-50 text-gray-800 font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default FlightSearch
