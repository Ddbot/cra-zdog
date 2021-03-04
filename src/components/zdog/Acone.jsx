// import ReactDOM from 'react-dom'
import React, { forwardRef, useMemo, useRef, useLayoutEffect, useState, useEffect } from 'react'
import  { TAU } from 'zdog';
import { Cone, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { animate, transform } from 'framer-motion';
// import styled from 'styled-components';
import { interp } from '../../functions';

gsap.registerPlugin(CSSPlugin);

const initialTransformation = {
    rotate: { x: 0, y: 0, z: 0 }, translate: { x: 0, y: 0, z: 0 }
};

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    // const [isAnimating, setIsAnimating] = useState(false);
    // const [move, setMove] = useState(props.move);
    const [ duration, setDuration ] = useState(0);
    const [ progression, setProgression ] = useState(undefined);

    // const { direction, axe, element, transformation } = move;

    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const coords = useMemo(() => ([{ 
        diameter: 24,
        length: 20.78,
        translate: {
            x: 0,
            y: 0,
            z: 0
        }, 
        rotate: { 
            x: TAU*90/360, 
            y: 0, 
            z: 0 
        },
        scale: 1.4,
        stroke: false,
        color: '#636',
        backface: '#C25',
        duration: 4  
    }, {
        rotate: { 
            x: TAU*90/360, 
            y: 0, 
            z: 0 
        },
        translate: {
            x: -20,
            y: 40,
            z: 0
        },
        duration: 6
    },
    {
        rotate: { 
            x: TAU*90/360, 
            y: 0, 
            z: 0 
        },
        translate: {
            x: 20,
            y: 40,
            z: 0
        },
        duration: 1
    }]));

    const [coordinates, setCoordinates] = useState(coords[0]);
    const [tl, setTl] = useState(gsap.timeline({
        paused: true
    }));

    const lerp = (start, end, progression) => {
        return interp(start, end)(progression)
    }

    // Changer state index quand props.index change
    useEffect(() => {
        setIndex(props.index);
    }, [props.index]);

    // On definit la duree de l'animation gsap dans la state duration
    useEffect(() => {
        setDuration(coords[current]['duration'])
    },[current]);

    // Animer quand le state index change
    // useEffect(() => {
    //     setIsAnimating(true);
    // },[index]);



    // function animateElement(t,deltaTime, frame){        
    //     if(ref.current !== undefined){
    //         setCoordinates(prev => {
    //             return {
    //                 ...prev,
    //                 translate: {
    //                     x: gsap.utils.interpolate(coords[previous].translate.x,  coords[current].translate.x, progression),
    //                     y: gsap.utils.interpolate(coords[previous].translate.y,  coords[current].translate.y, progression),
    //                     z: gsap.utils.interpolate(coords[previous].translate.z,  coords[current].translate.z, progression)
    //                 },
    //                 rotate: {
    //                     x: gsap.utils.interpolate(coords[previous].rotate.x,  coords[current].rotate.x, progression),
    //                     y: gsap.utils.interpolate(coords[previous].rotate.y,  coords[current].rotate.y, progression),
    //                     z: gsap.utils.interpolate(coords[previous].rotate.z,  coords[current].rotate.z, progression)
    //                 }
    //         }} )  
    //     }
    // }

    // activer tween si index change
    useEffect(() => {
            tl.to(ref.current, {
                duration: duration,
                x: coords[current]['translate'].x,
                y: coords[current]['translate'].y,
                z: coords[current]['translate'].z,
                rotateX: coords[current]['rotate'].x,
                rotateY: coords[current]['rotate'].y,
                rotateZ: coords[current]['rotate'].z,
            });

            tl.play();

            return () => tl;
        // } 
    },[index]);

    return <Cone
        {...coordinates}
        ref={ref}
    />
};

    export default Acone;