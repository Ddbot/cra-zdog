import styled from 'styled-components';
import { i18n } from '../translations/CTA_dictionary';
import { Button, Container } from '@material-ui/core';

const Div = styled.div`
    grid-column: 1 / span 3;
    grid-row: 2 / span 3;
    text-align: center;
`;

const CTA = (props, children) => {

    // set default language
    i18n.locale('fr');

    const renderContent = () => {
        switch(props.index){
            case 1:
                return <Container>{i18n.t('text.technos')}</Container>
            case 2:
                return <Container><Button variant="contained" color="primary"><a href="https://material-ui.com/components/buttons/">{i18n.t('text.cta')}</a></Button></Container>
            default:
                break;
        }
    }
    return <Div>{renderContent()}</Div>
}

export default CTA;