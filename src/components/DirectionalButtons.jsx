import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import StopIcon from '@material-ui/icons/Stop';

import styled from 'styled-components';
import { forwardRef, useEffect, useRef } from 'react';

const Container = styled.div`
    position: fixed;
    bottom: 2rem;     

    width: 6rem;
    height: 6rem;

    // display: flex;
    // justify-content: center;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
        
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

const DirectionalButtons = forwardRef((props, ref) => {
    const handleClick = e => {
        e.persist();

        const { currentTarget, target } = e;
        props.move(currentTarget.dataset.name)
    }

    // return <Container onClick={props.onClick} ref={ref} ><Up /><Left /><Right /><Down /></Container>
    return <Container ref={ref} >
        <Up data-name='up' onClick={handleClick}>
            <ArrowUpwardIcon />
        </Up>
        <Left data-name='left' onClick={handleClick}>
            <ArrowBack />
        </Left>
        <Right data-name='right' onClick={handleClick}>
            <ArrowForward />
        </Right>
        <Down data-name='down' onClick={handleClick}>
            <ArrowDownwardIcon />            
        </Down>
        <Stop data-name='stop' onClick={handleClick}>
            <StopIcon />
        </Stop>
    </Container>

});

export default DirectionalButtons;