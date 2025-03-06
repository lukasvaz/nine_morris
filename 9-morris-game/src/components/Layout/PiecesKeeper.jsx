import Piece from "../Board/Piece";

const PieceKeeper = ({ pieces, color }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl height-780px width-100px  border-solid border-1 border-primary">
      <svg className="w-[100px] h-[780px]">
        {Array.from({ length: pieces }).map((_, i) => (
          <Piece key={i} cx={50} cy={730 - 85 * i} color={color} />
        ))}
      </svg>
    </div>
  );
};

export default PieceKeeper;
