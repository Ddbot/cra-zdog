import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { i18n } from '../translations/CTA_dictionary';
import { Avatar, Button, Chip, Container, Grid, Typography } from '@material-ui/core';
import gsap from 'gsap';
import CSSIcon from '../assets/icons/CSSIcon';
import HTMLIcon from '../assets/icons/HTML/HTMLIcon';

import JSIcon from '../assets/icons/JS/JSIcon';

const Div = styled.div`
    grid-column: 1 / span 3;
    grid-row: 2 / span 3;
    text-align: center;
`;

const TextContainer = styled(Typography)`
    border: 1px dashed pink;
    padding: 8px;
    display: flex;
    align-items: center;
`;

const CTA = (props, children) => {
    const ref = useRef(undefined);

    // set default language
    i18n.locale('fr');

    const handleClick = (e) => {
        e.persist();
        const { target, currentTarget } = e;
        console.log(currentTarget, target)
    }

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

    useEffect(() => {
        // let ps, anim;
        // if(ref.current.querySelectorAll('p')){
            // ps = ref.current.querySelectorAll('p');
        //     Array.from(ps).forEach(el => {
        //         const height = getComputedStyle(el).width;
        //         gsap.set(el, { height: height, borderRadius: '50%' });
        //     })
        //     anim = gsap.fromTo(Array.from(ps), {
        //         x: -20,
        //         scale: 0.4,
        //         autoAlpha: 0
        //     }, {
        //         x: 0,                
        //         scale: 1,
        //         autoAlpha: 1,
        //         duration: 0.225,
        //         stagger: 0.225,
        //         delay: 1.4,
        //         ease: "elastic.out(1, 0.75)"
        //     });
        // }

        // return () => anim;
        let chips = ref.current.querySelectorAll('.MuiChip-root');

        gsap.fromTo(Array.from(chips), {
                    x: -20,
                    scale: 0.4,
                    autoAlpha: 0
                }, {
                    x: 0,                
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.225,
                    stagger: 0.225,
                    delay: 1.4,
                    ease: "elastic.out(1, 0.75)"
                });            
    }, [ref.current]);

    return <Div ref={ref}>{renderContent()}</Div>
}

export default CTA;