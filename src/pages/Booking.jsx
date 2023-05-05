import { useContext, useEffect, useState } from 'react'
import FlightSearch from '../components/FlightSearch'
import Seats from '../components/Seats'
import { AppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const Booking = () => {
  const [route, setRoute] = useState(null)
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.name) {
      navigate('/registration')
    }
  }, [navigate, user])

  return (
    <div className="max-w-xl mx-auto my-8">
      <FlightSearch setRoute={setRoute} />
      {route?.routeId && (
        <Seats route={route} setRoute={setRoute} />
      )}
    </div>
  )
}

export default Booking
