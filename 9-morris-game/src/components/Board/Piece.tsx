import React from 'react';

type PieceProps = {
  cx: number;
  cy: number;
  color: string;
  handleClick: () => void;
  style: React.CSSProperties|undefined;
};
  

const Piece :React.FC<PieceProps> = ({ cx, cy, color, handleClick, style }) => {
  const radius = 40;
  return (
    <circle
      style={style}
      cx={cx}
      cy={cy}
      r={radius}
      fill={color}
      onClick={handleClick}
    />
  );
};

export default Piece;
