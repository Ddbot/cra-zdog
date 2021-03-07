// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import  { TAU } from 'zdog';
import { Cone } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';

gsap.registerPlugin(CSSPlugin);

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const coords = useMemo(() => ([{ 
        diameter: 24,
        length: 20.78,
        translate: {
            x: 4,
            y: -20,
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
            // x: TAU*90/360, 
            x: TAU*180/360,
            y: 0, 
            z: 0 
        },
        translate: {
            x: -10,
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
            x: 0,
            y: 40,
            z: 0
        },
    }]));

    const [coordinates, setCoordinates] = useState(coords[0]);

    const streamCoords = (el, dur=1, fps=60) => {
        for (let transformation of Object.keys(coords[current])) {
            if(['rotate','translate'].includes(transformation)){
                for (let coord of Object.keys(el[transformation])) {
                    return el[transformation][coord] = (el[transformation][coord] - coords[previous][transformation][coord]) >= 0 ? el[transformation][coord] + (el[transformation][coord] - coords[previous][transformation][coord])/fps*dur : el[transformation][coord] - (el[transformation][coord] - coords[previous][transformation][coord])/fps*dur;
                }    
            }
        }
    }

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
                duration: 10,
                // onUpdate: () => {
                //     ref.current && streamCoords(ref.current, 1, 30)
                // },
                ...coords[current].rotate,
                ease: "power4.out",
                // onStart: () => {
                //     Object.entries(ref.current).forEach(([key, value]) => console.table([['Key',key],['Value',value]]))
                // }
            });

            let translateAnimation = gsap.to([
                ref.current.translate, 
            ], {
                duration: 10,
                // onUpdate: () => {
                //     ref.current && streamCoords(ref.current, 1, 30)
                // },
                ...coords[current].translate,
                ease: "elastic.out(1, 0.3)",
                // onStart: () => {
                //     Object.entries(ref.current).forEach(([key, value]) => console.table([['Key',key],['Value',value]]))
                // }
            });            
            tl.add(translateAnimation);
            tl.add(rotateAnimation, '<');
            tl.play();

            return () => tl;
        };
    }, [current, previous]);

    return <Cone
        {...coordinates}
        ref={ref}
    />
};

export default Acone;