import styled from 'styled-components';

const Div = styled.div`
    grid-column: 1 / span 3;
    grid-row: 2 / span 3;
    text-align: center;
`;

const CTA = (props, children) => {

    const renderContent = () => {
        switch(props.index){
            case 1:
                return <h2>ici la liste des technos utilisées</h2>
            case 2:
                return <h2>contactez-moi</h2>
            default:
                break;
        }
    }
    return <Div>{renderContent()}</Div>
}

export default CTA;