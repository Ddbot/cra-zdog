import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles';

import styled from 'styled-components'; 
import gsap from 'gsap';

import usePrevious from './../hooks/usePrevious';

const Illu = styled.svg`
    height: 91vh !important;
    width: 100vw !important;
    position: fixed !important;
        
    top: 9vh;
`;

/** --- Basic, re-usable shapes -------------------------- */
const SvgBG = (props) => {
    const [ index, setIndex ] = useState(props.index);
    const theme = useTheme();

    const current = props.index;
    const previous = usePrevious(index);
    const ref = useRef(undefined);

    const width= window.innerWidth;
    const height= window.innerHeight;

    useEffect(() => {
        if (props.index !== index){
            setIndex(props.index)
        }
    },[props.index]);

    // useEffect(() => {
    //     if(previous !== undefined){  }
    // },[index, current, previous]);  

    // useEffect(() => {
    //     console.log('Le theme est ', theme.palette.type);
    // })

    return <Illu ref={ ref }>
        <rect x="0" y="0" width={width} height={height} stroke="white" fill={theme.palette.type === 'light' ? 'white' : '#1F115E'} />
    </Illu>
}

export default SvgBG
