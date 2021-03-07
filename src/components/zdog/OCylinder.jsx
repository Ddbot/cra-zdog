// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { TAU } from 'zdog';
import { Cylinder } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap,{ CSSPlugin } from 'gsap';

gsap.registerPlugin(CSSPlugin);

let OCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const coords = useMemo(() => ([{
        diameter: 16.97,
        length: 16.97,
        translate: {
            x: 3.95,
            y: 0,
            z: 10
        },
        rotate: { 
            x: 0, 
            y: 0, 
            z: -TAU * 120/360 
        },
        scale: 0.8,
        // pour avoir un diamant de coté
        // rotate: { 
        //     x: TAU * 90/360, 
        //     y: TAU * 45/360, 
        //     z: -TAU * 120/360
        // },
        stroke: false,
        color: '#EA0',
        frontFace: '#c25',
        backface: '#e62',  
    }, {
        translate: {
            x: -20,
            y: 40,
            z: 0
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    {
        translate: {
            x: 20,
            y: 40,
            z: 0
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    }]));

    const [coordinates, setCoordinates] = useState(coords[0]);

    // Changer state index quand props.index change
    useEffect(() => {
        if(props.index !== index){
            setIndex(props.index);
        }
    }, [props.index])
    
    // lancer animation quand index change
    useEffect(() => {
        if(previous !== undefined){
            let rotateAnimation = gsap.to([
                ref.current.rotate, 
            ], {
                duration: 1,
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
                duration: 1,
                // onUpdate: () => {
                //     ref.current && streamCoords(ref.current, 1, 30)
                // },
                ...coords[current].translate,
                ease: "elastic.out(1, 0.8)",
                // onStart: () => {
                //     Object.entries(ref.current).forEach(([key, value]) => console.table([['Key',key],['Value',value]]))
                // }
            });     
            
            // let backFaceColorAnimation = gsap.to(ref.current, {
            //     duration: 1,
            //     backface: '#ff9800',
            // });

            setTl(prev => {
                prev && prev
                .add(translateAnimation)
                .add(rotateAnimation, '<');
            })

            return () => tl;
        };
    }, [current, previous]);

    useEffect(() => {
        tl && tl.play();
    }, [tl])


    return <Cylinder
        {...coordinates }
        ref={ref}
/>};

export default OCylinder;