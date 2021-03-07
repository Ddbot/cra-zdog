import styled from 'styled-components';
import { i18n } from '../translations/CTA_dictionary';

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
                return <h2>{i18n.t('text.technos')}</h2>
            case 2:
                return <h2>{i18n.t('text.cta')}</h2>
            default:
                break;
        }
    }
    return <Div>{renderContent()}</Div>
}

export default CTA;