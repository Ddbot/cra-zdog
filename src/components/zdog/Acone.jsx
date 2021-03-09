// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Cone } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { useTheme } from '@material-ui/core/styles';
import { useZdog } from 'react-zdog';

import { acone } from './coordinates';

gsap.registerPlugin(CSSPlugin);

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);
    const theme = useTheme();

    const current = props.index;
	const previous = usePrevious(props.index);

    const coords = useMemo(() => acone);

    const [coordinates, setCoordinates] = useState(coords[0]);

    const { illu, scene, size } = useZdog();
    // Changer state index quand props.index change
    useEffect(() => {
        if(props.index !== index){
            setIndex(props.index);
        }
    }, [props.index]);

    useEffect(() => {
        if(previous !== undefined){
            let rotateAnimation = gsap.to([
                ref.current.rotate, 
            ], {
                duration: 1,
                ...coords[current].rotate,
                ease: "power4.out",
            });

            let translateAnimation = gsap.to([
                ref.current.translate, 
            ], {
                duration: 3,
                ...coords[current].translate,
                ease: "elastic.out(1, 0.8)",
            });     
            
            let colorAnimation = gsap.to(ref.current, {
                duration: 1,
                color: theme.palette.type === 'light' ?  'rgba(102, 51, 102, 0.5)' : 'rgba(255, 0, 0, 0.5)',         
                backface: theme.palette.type === 'light' ?  'rgba(204, 34, 85, 0.5)' : 'rgba(255, 152, 0, 0.5)',                
            });

            setTl(prev => {
                prev && prev
                .add(translateAnimation)
                .add(rotateAnimation, '<')
                .add(colorAnimation, '<')
            })

            return () => tl;
        };
    }, [current, previous]);

    useEffect(() => {
        tl && tl.play();
    }, [tl])

    useEffect(() => {
        console.log('Size: ', size, ' Scene: ', scene, ' IUllu: ', illu);
        illu.centered = false;
    })

    return <Cone
        {...coordinates }
        ref={ref}
    />
};

export default Acone;