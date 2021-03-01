// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useLayoutEffect, useState, useEffect } from 'react'
import  { TAU } from 'zdog';
import { Cone, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap from 'gsap';
import { animate, transform } from 'framer-motion';
// import styled from 'styled-components';
import { interp } from '../../functions';

const coords = [{ 
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
}];

const initialTransformation = {
    rotate: { x: 0, y: 0, z: 0 }, translate: { x: 0, y: 0, z: 0 }
};

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    const [coordinates, setCoordinates] = useState(coords[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    // const [move, setMove] = useState(props.move);
    const [ duration, setDuration ] = useState(0);
    const [ progression, setProgression ] = useState(undefined);

    // const { direction, axe, element, transformation } = move;

    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const lerp = (start, end, progression) => {
        return interp(start, end)(progression)
    }

    // Changer state index quand props.index change
    useEffect(() => {
        setIndex(props.index);
    }, [props.index]);

    useEffect(() => {
        console.log(lerp(0,10,1/3))
    },[])

    // On definit la duree de l'animation gsap dans la state duration
    useEffect(() => {
        setDuration(coords[current]['duration'])
    },[current]);

    // Animer quand le state index change
    useEffect(() => {
        setIsAnimating(true);
    },[index]);



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

    // activer le Listener sur le ticker si isAnimating
    useEffect(() => {
        if(isAnimating){
            let anim = gsap.to(window, {
                duration: duration,
                onUpdate: () => {
                    setProgression(anim.progress());
                },
                onComplete: () => {
                    setIsAnimating(false);
                    setCoordinates(coords[current]);
                },
            });
        } 
    },[isAnimating]);

    useRender((t) => {
        if(ref.current !== undefined && !!isAnimating){
            ref.current.translate.x = gsap.utils.interpolate(coords[previous].translate.x, coords[current].translate.x, progression);
            ref.current.translate.y = gsap.utils.interpolate(coords[previous].translate.y, coords[current].translate.y, progression);
            ref.current.translate.z = gsap.utils.interpolate(coords[previous].translate.z, coords[current].translate.z, progression);
            ref.current.rotate.x = gsap.utils.interpolate(coords[previous].rotate.x,  coords[current].rotate.x, progression);
            ref.current.rotate.y = gsap.utils.interpolate(coords[previous].rotate.y,  coords[current].rotate.y, progression);
            ref.current.rotate.z = gsap.utils.interpolate(coords[previous].rotate.z,  coords[current].rotate.z, progression);
            // setCoordinates(prev => {
            //     return {
            //         translate: {
            //             x: gsap.utils.interpolate(coords[previous].translate.x, coords[current].translate.x, progression)/(duration*60),
            //             y: gsap.utils.interpolate(coords[previous].translate.y,  coords[current].translate.y, progression)/(duration*60),
            //             z: gsap.utils.interpolate(coords[previous].translate.z,  coords[current].translate.z, progression)/(duration*60),
            //     }   }
            // });
        }

        // return () => ref.current
    }, [isAnimating]);

    // Change move direction from props.move
    // useEffect(() => {
    //     setMove(props.move);
    // },[props.move]);

    return <Cone
        {...coordinates}
        ref={ref}
    />
};

    export default Acone;