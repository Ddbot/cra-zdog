// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState  } from 'react'
import { Cylinder } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { TAU } from 'zdog';
import { lcylinder } from './coordinates';

gsap.registerPlugin(CSSPlugin);

// const rotations = Array(23).fill([]).map(el => { return { x: 0, y: 0, z: 0 } });

// rotations[5] = [
//     { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360 },
//     { x: TAU * 90/360, y: -TAU * 45/360, z: 0 },
//     { x: 0, y:0, z: 0 }
// ];

// rotations[14] = [
//     { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360 },
//     { x: 0, y:0, z: 0 },
//     { x: 0, y:0, z: 0 }
// ]

let LCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(index);

    const rotationsCoords = Array(23).fill([]).map(el => { return { x: 0, y: 0, z: 0 } });

    rotationsCoords[5] = [
        { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360 },
        { x: TAU * 90/360, y: -TAU * 45/360, z: 0 },
        { x: 0, y:0, z: 0 }
    ];

    rotationsCoords[14] = [
        { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360 },
        { x: TAU * 90/360, y:0, z: 0 },
        { x: 0, y:0, z: 0 }
    ];

    const colorCoords = Array(23).fill([]).map(el => { return { x: 0, y: 0, z: 0 } });
    colorCoords[5] = [
        {
            color: "#e62",
            frontFace: '#636',
            backface: '#EEAA00',
            stroke: 1
        },
        {             
            color: "#e62",
            frontFace: '#636',
            backface: '#EEAA00',
            stroke: 0 
        },
        {
            color: "#e62",
            frontFace: '#636',
            backface: '#EEAA00',
            stroke: 10 
        }
    ];

    colorCoords[14] = [
        {
            color: '#c25',
            frontFace: '#e62',
            backface: 'white'
        },
        {
            color: 'rgb(247, 223, 30)',
            frontFace: 'rgb(247, 223, 30)',
            backface: 'rgb(247, 223, 30)'
        },
        {
            color: '#c25',
            frontFace: '#e62',
            backface: 'white'
        }
    ];


    const rotations = useMemo(() => rotationsCoords);
    const colors = useMemo(() => colorCoords);

    function getScale(id){
        let res;
        switch(id){
            case 14:
                res = {
                    scale: 6
                }
                break;
            default:
                res = {
                    scale: 7
                }
                break;
        }

        return res;
    }           

    // Changer state index quand props.index change
    useEffect(() => {
        if(props.index !== index){
            setIndex(props.index)
        };
    }, [props.index]);

    // Changer state id quand props.id change
    useEffect(() => {
        // if(props.id !== id){
            setIndex(props.id)
        // };
    }, [props.id]);

    useEffect(() => {
        if(previous !== undefined && (props.id === 5 || props.id === 14)){
            let rotateAnimation = gsap.fromTo( ref.current.rotate, {
                duration: 1,
                ...rotations[props.id][previous],
            },{
                ...rotations[props.id][current],
                ease: "power4.out",
            });

            let colorAnimation = gsap.fromTo(ref.current, {
                duration: 1,
                ...colors[props.id][previous],
            },{
                ...colors[props.id][current],
                ease: "power4.out",
            });


    //         let translateAnimation = gsap.to([
    //             ref.current.translate, 
    //         ], {
    //             duration: 1,
    //             ...coords[current].translate,
    //             ease: "elastic.out(1, 0.8)",
    //         });                 

            setTl(prev => {
                prev && prev
    //             .add(translateAnimation)
                .add(rotateAnimation, '<')
                .add(colorAnimation, '<');
            })

            return () => tl;
        };
    }, [current, previous, props.id, rotations]);

    useEffect(() => {
        tl && tl.play();
    }, [tl]);   

    return <Cylinder
        {...props}
        // {...colorCoords[props.id][current]}
        {...getScale(props.id)}
        ref={ref}
/>};

export default LCylinder;