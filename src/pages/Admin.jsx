import { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import Seat from '../components/Seat'

function countBookedSeats(data) {
  let count = 0
  data.forEach((route) => {
    route.availableSeats.forEach((seat) => {
      if (!seat.available) {
        count++
      }
    })
  })
  return count
}

const Admin = () => {
  const { routes } = useContext(AppContext)
  const [showFlightWiseListing, toggleFlightWiseListing] =
    useState(false)

  return (
    <div>
      <button
        onClick={() =>
          toggleFlightWiseListing(!showFlightWiseListing)
        }
        className="bg-gray-50 text-gray-800 font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Number of booking today: {countBookedSeats(routes)}
      </button>
      {showFlightWiseListing && (
        <div className="mt-10">
          {routes?.map((route) => (
            <div key={route?.routeId} className="mb-10">
              <h3 className="text-xl mb-4">{`${route?.from} - ${route?.to}`}</h3>
              <div className="flex flex-wrap">
                {route?.availableSeats
                  .slice(0, 10)
                  .map((seat) => {
                    const { seat: seatNum, available } = seat
                    const isSelected =
                      routes?.availableSeats?.includes(
                        `${route?.routeId}-${seatNum}`
                      )
                    return (
                      <Seat
                        showCursor={false}
                        key={seatNum}
                        id={seatNum}
                        onSelect={() => {}}
                        isAvailable={available}
                        isSelected={isSelected}
                      />
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin
