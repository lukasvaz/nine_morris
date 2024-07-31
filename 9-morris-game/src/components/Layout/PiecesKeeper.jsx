
import styled from 'styled-components'
import Piece from '../Board/Piece';

const PieceKeeper = ({pieces,color}) => {
    return <CustomContainer>
        <CustomSVG>
            { 
             Array.from({ length: pieces }).map((_, i) => (
                <Piece key={i} cx={50} cy={730-85*i} color={color} />
            ))
            }
        </CustomSVG>
    </CustomContainer>
}

const CustomContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100px;
justify-content: center;
border: 1px solid ${props => props.theme.COLORS.PRIMARY};
border-radius: 20px;
height:780px;
width: 100px;
`
const CustomSVG = styled.svg`
width: 100px;
height: 780px;
`


export default PieceKeeper;