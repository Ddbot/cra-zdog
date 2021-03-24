import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { i18n } from '../translations/CTA_dictionary';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import gsap from 'gsap';

const Div = styled.div`
    grid-column: 1 / span 3;
    grid-row: 2 / span 3;
    text-align: center;
`;

const CTA = (props, children) => {
    const ref = useRef(undefined);

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
                    </Grid>
                    {/* {i18n.t('text.technos')} */}
                    </Container>
            case 2:
                return <Container><Button variant="contained" color="primary"><a href="https://material-ui.com/components/buttons/">{i18n.t('text.cta')}</a></Button></Container>
            default:
                break;
        }
    }

    return <Div ref={ref}>{renderContent()}</Div>
}

export default CTA;