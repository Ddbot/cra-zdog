import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import styled from 'styled-components';

const Container = styled.button`
    position: fixed;
    top: 90vh;     

    width: 100%;

    display: flex;
    justify-content: center;

    z-index: 100;
`;

const Arrow = styled(ArrowDownwardIcon)`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
`;

const DownArrow = (props) => {
    return <Container onClick={props.onClick}><Arrow /></Container>
};

export default DownArrow;