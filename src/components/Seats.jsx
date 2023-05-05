import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import Seat from './Seat'

const Seats = ({ route, setRoute }) => {
  const { setRoutes } = useContext(AppContext)
  const { routeId, from, to, availableSeats } = route
  const [selectedSeats, setSelectedSeats] = useState([])

  useEffect(() => {
    setSelectedSeats(availableSeats)
  }, [availableSeats])

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.seat === seatId) {
          return { ...seat, available: !seat.available }
        }
        return seat
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setRoutes((prevRoutes) => {
      const updatedRoutes = prevRoutes.map((r) =>
        r.routeId === route.routeId
          ? { ...r, availableSeats: selectedSeats }
          : r
      )
      return updatedRoutes
    })
    setRoute(null)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-20">
      <div key={routeId}>
        <h3 className="text-xl mb-4">{`${from} - ${to}`}</h3>
        <div className="flex flex-wrap">
          {selectedSeats.slice(0, 10).map((seat) => {
            const { seat: seatNum, available } = seat
            const isSelected = selectedSeats.includes(
              `${routeId}-${seatNum}`
            )
            return (
              <Seat
                key={seatNum}
                id={seatNum}
                isAvailable={available}
                onSelect={handleSeatSelect}
                isSelected={isSelected}
              />
            )
          })}
        </div>
      </div>
      <button
        className="bg-gray-50 text-gray-800 font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
        type="submit"
      >
        Book Tickets
      </button>
    </form>
  )
}

export default Seats
