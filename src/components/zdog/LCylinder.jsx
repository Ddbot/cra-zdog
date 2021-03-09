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
    const [id, setId] = useState(props.id);

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
        { x: 0, y:0, z: 0 },
        { x: 0, y:0, z: 0 }
    ]

    // const coords = useMemo(() => lcylinder);
    const rotations = useMemo(() => rotationsCoords);

    function getColors(id){
        let res;
        switch(id){
            case 5:
                res = {
                    color: "#e62",
                    frontFace: '#636',
                    backface: '#EEAA00',
                }
                break;
            case 14:
                res = {
                    color: '#c25',
                    frontFace: '#e62',
                    backface: 'white'
                }
                break;              
            default:
                break;
        }

        return res;
    }

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
                .add(rotateAnimation, '<');
            })

            return () => tl;
        };
    }, [current, previous, props.id, rotations]);

    useEffect(() => {
        tl && tl.play();
    }, [tl]);   
    
    useEffect(() => {
        previous !== undefined && console.log('Rotations in LCylinder = ', rotations[props.id][current], rotations[props.id][previous])
    },[props.id, current])

    return <Cylinder
        {...props}
        {...getColors(props.id)}
        {...getScale(props.id)}
        ref={ref}
/>};

export default LCylinder;