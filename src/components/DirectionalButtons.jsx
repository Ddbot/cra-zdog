import { useState } from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import StopIcon from '@material-ui/icons/Stop';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import styled from 'styled-components';
import { forwardRef, useEffect, useRef } from 'react';

const Container = styled.div`
    position: fixed;
    bottom: 4rem;     

    // width: 6rem;
    height: 6rem;

    // display: flex;
    // justify-content: center;

    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(4,1fr);
    gap: 0px 0px;

    place-items: center;
        
    z-index: 100;

    background: transparent;
    border: none;
    padding: 0;
`;

const StyledButton = styled.button`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
    filter: drop-shadow(-4px 4px 16px #d9d9d9, 4px -4px 16px #ffffff);
    background: #ffffff;

    display: flex;    
    align-items: center;
    justify-content: center;
`;

const Stop = styled(StyledButton)`
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
`;

const Down = styled(StyledButton)`
    grid-row: 3 / span 1;
    grid-column: 2 / span 1;
`;

const Left = styled(StyledButton)`
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
`;

const Right = styled(StyledButton)`
    grid-row: 2 / span 1;
    grid-column: 3 / span 1;
`;

const Up = styled(StyledButton)`
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
`;

const XAxis = styled(Right)`
    grid-row: 1 / span 1;
    grid-column: 5 / span 1;
`;

const YAxis = styled(Up)`
    grid-row: 2 / span 1;
    grid-column: 5 / span 1;
`;

const ZAxis = styled(Left)`
    grid-row: 3 / span 1;
    grid-column: 5 / span 1;
`;

const Label = styled.h3`
    grid-row: 4 / span 1;
    text-align: center;
    width: 100%;
`;

const Directions = styled(Label)`
    grid-column: 1 / span 3;
`;

const Axis = styled(Label)`
    grid-column: 5 / span 1;
`;

const Triangle = styled(StyledButton)`
    background: #636;
    grid-row: 1 / span 1;
    grid-column: 9 / span 1;
    border: none;
`;

const Circle = styled(Triangle)`
    background: #ea0;
    grid-row: 2 / span 1;
    grid-column: 9 / span 1;
`;
const Line = styled(Triangle)`
    background: #e62;
    grid-row: 3 / span 1;
    grid-column: 9 / span 1;
`;

const TranslateBtn = styled(StyledButton)`
    grid-row: 1 / span 1;
    grid-column: 7 / span 1;
`;

const RotateBtn = styled(StyledButton)`
    grid-row: 3 / span 1;
    grid-column: 7 / span 1;
`;


const DirectionalButtons = forwardRef((props, ref) => {
    const [params, setParams] = useState({
        direction: 'stop',
        axe: 'x',
        element: 'triangle',
        transformation: 'translate'
    });
    const handleClick = e => {
        e.persist();

        const { currentTarget, target } = e;
        setParams(prev => {
            return {
                ...prev,
                [Object.keys(currentTarget.dataset)[0]] : currentTarget.dataset[Object.keys(currentTarget.dataset)]
            }
        })
    }

    useEffect(() => {
        props.move(params);
    }, [params])

    // return <Container onClick={props.onClick} ref={ref} ><Up /><Left /><Right /><Down /></Container>
    return  <Container ref={ref} >
        <Up data-direction='up' onClick={handleClick}>
            <ArrowUpwardIcon />
        </Up>
        <Left data-direction='left' onClick={handleClick}>
            <ArrowBack />
        </Left>
        <Right data-direction='right' onClick={handleClick}>
            <ArrowForward />
        </Right>
        <Down data-direction='down' onClick={handleClick}>
            <ArrowDownwardIcon />            
        </Down>
        <Stop data-direction='stop' onClick={handleClick}>
            <StopIcon />
        </Stop>
        <Directions>Directions</Directions>
        <XAxis data-axe='x' onClick={handleClick}>
            {/* <ArrowForward /> */}X
        </XAxis>
        <YAxis data-axe='y' onClick={handleClick}>
            {/* <ArrowUpwardIcon/> */}Y
        </YAxis>
        <ZAxis data-axe='z' onClick={handleClick}>
            {/* <ArrowUpwardIcon/> */}Z
        </ZAxis>
        <Axis>Axes</Axis>
        <Triangle data-element='triangle' onClick={handleClick}/>
        <Circle data-element='circle' onClick={handleClick}/>
        <Line data-element='line' onClick={handleClick}/>
        <TranslateBtn data-transformation='translate' onClick={handleClick}>
            <ArrowDownwardIcon />            
        </TranslateBtn>
        <RotateBtn data-transformation='rotate' onClick={handleClick}>
            <RotateLeftIcon />
        </RotateBtn>
    </Container>
});

export default DirectionalButtons;