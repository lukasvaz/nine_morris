import Piece from "../Board/Piece";
import React from 'react';

type PieceKeeperProps = {
  pieces: number;
  color: string;
};
const PieceKeeper:React.FC<PieceKeeperProps> = ({ pieces, color }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl height-780px width-100px  border-solid border-1 border-primary">
      <svg className="w-[100px] h-[780px]">
        {Array.from({ length: pieces }).map((_, i) => (
          
          <Piece key={i} cx={50} cy={730 - 85 * i} color={color} handleClick={()=>{}} style={undefined} />
        ))}
      </svg>
    </div>
  );
};

export default PieceKeeper;
