import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import styled from 'styled-components';
import { forwardRef, useEffect } from 'react';

const Container = styled.button`
    position: fixed;
    top: 90vh;     

    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;

    z-index: 100;

    background: transparent;
    border: none;
    padding: 0;
`;

const Arrow = styled(ArrowDownwardIcon)`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
    filter: drop-shadow(-4px 4px 16px #d9d9d9, 4px -4px 16px #ffffff);
    background: #ffffff;
    // border-radius: 1rem;
`;

const DownArrow = forwardRef((props, ref) => {
    return <Container onClick={props.onClick} ref={ref} ><Arrow /></Container>
});

export default DownArrow;