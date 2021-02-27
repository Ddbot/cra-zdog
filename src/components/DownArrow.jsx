import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

import styled from 'styled-components';
import { forwardRef, useEffect } from 'react';

const Container = styled.button`
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

const Down = styled(ArrowDownwardIcon)`
    grid-row: 3 / span 1;
    grid-column: 2 / span 1;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
    filter: drop-shadow(-4px 4px 16px #d9d9d9, 4px -4px 16px #ffffff);
    background: #ffffff;
`;

const Left = styled(ArrowBack)`
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
    filter: drop-shadow(-4px 4px 16px #d9d9d9, 4px -4px 16px #ffffff);
    background: #ffffff;
`;

const Right = styled(ArrowForward)`
    grid-row: 2 / span 1;
    grid-column: 3 / span 1;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
    filter: drop-shadow(-4px 4px 16px #d9d9d9, 4px -4px 16px #ffffff);
    background: #ffffff;
`;

const Up = styled(ArrowUpwardIcon)`
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;

    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
    filter: drop-shadow(-4px 4px 16px #d9d9d9, 4px -4px 16px #ffffff);
    background: #ffffff;
`;

const DownArrow = forwardRef((props, ref) => {
    return <Container onClick={props.onClick} ref={ref} ><Up /><Left /><Right /><Down /></Container>
});

export default DownArrow;