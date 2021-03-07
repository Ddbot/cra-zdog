import styled from 'styled-components';
import { i18n } from '../translations/CTA_dictionary';
import { Button, Container, Grid, Typography } from '@material-ui/core';

const Div = styled.div`
    grid-column: 1 / span 3;
    grid-row: 2 / span 3;
    text-align: center;
`;

const TextContainer = styled(Typography)`
    border: 1px dashed pink;
    padding: 8px;
    border-radius: 8px;
`;

const CTA = (props, children) => {

    // set default language
    i18n.locale('fr');

    const renderContent = () => {
        switch(props.index){
            case 1:
                return <Container>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center">
                        <TextContainer>HTML</TextContainer>
                        <TextContainer>CSS</TextContainer>
                        <TextContainer>Javascript</TextContainer>
                        <TextContainer>Node</TextContainer>
                        <TextContainer>React</TextContainer>
                    </Grid>
                    {/* {i18n.t('text.technos')} */}
                    </Container>
            case 2:
                return <Container><Button variant="contained" color="primary"><a href="https://material-ui.com/components/buttons/">{i18n.t('text.cta')}</a></Button></Container>
            default:
                break;
        }
    }
    return <Div>{renderContent()}</Div>
}

export default CTA;