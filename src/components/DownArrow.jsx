import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Arrow = styled(ArrowDownwardIcon)`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid black;
`;

const DownArrow = (props) => {
    return <Container><Arrow /></Container>
};

export default DownArrow;