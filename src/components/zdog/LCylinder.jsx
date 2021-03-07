// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState  } from 'react'
import { TAU } from 'zdog';
import { Cylinder, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap from 'gsap';

let LCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(index);

    const coords = useMemo(() => ([
        {
            diameter: 2,
            length: 48,
            translate: {
                x: 4,
                y: -8,
                z: 0
            },
            // translate: {
            //     x: 0,
            //     y: 0,
            //     z: 0
            // },
            // rotate: {  x: TAU * 90/360, y: -TAU * 45/360 },
            // pour avoir un diamant de coté
            rotate: { 
                x: TAU * 90/360, 
                y: TAU * 45/360, 
                z: -TAU * 120/360
            },
            stroke: true,
            color: '#e62',
            frontFace: '#c25',
            backface: '#e62',  
        }, 
        {
            translate: {
                x: -20,
                y: 0,
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
                y: 0,
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
            setIndex(props.index)
        };
    }, [props.index]);

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
        {...coordinates}
        ref={ref}
/>};

export default LCylinder;