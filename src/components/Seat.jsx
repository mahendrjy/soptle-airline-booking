const Seat = ({ id, isAvailable, onSelect, showCursor }) => {
  const handleClick = () => {
    if (isAvailable) {
      onSelect(id)
    }
  }

  const color = isAvailable ? 'bg-green-500' : 'bg-red-500'
  const cursor = !showCursor
    ? ''
    : isAvailable
    ? 'cursor-pointer'
    : 'cursor-not-allowed'

  return (
    <div
      className={`w-10 h-10 mr-2 rounded ${color} ${cursor}`}
      onClick={handleClick}
    />
  )
}

export default Seat
