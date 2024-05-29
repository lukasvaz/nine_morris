const Piece = ({ cx, cy, color, handleClick }) => {
    const radius = 40
    return <circle cx={cx} cy={cy} r={radius} fill={color} onClick={handleClick} />
  }


export default Piece;