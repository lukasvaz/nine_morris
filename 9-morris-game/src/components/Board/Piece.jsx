import React from 'react';

const Piece = ({ cx, cy, color, handleClick , style}) => {
  const radius = 40
  return <circle style={style} cx={cx} cy={cy} r={radius} fill={color} onClick={handleClick} />
  

}

export default Piece;