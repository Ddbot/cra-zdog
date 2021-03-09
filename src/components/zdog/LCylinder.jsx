// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState  } from 'react'
import { Cylinder } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap from 'gsap';
import { lcylinder } from './coordinates';

let LCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(index);

    const coords = useMemo(() => lcylinder);

    const [coordinates, setCoordinates] = useState(coords[0]);

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
                duration: 1,
                ...coords[current].translate,
                ease: "elastic.out(1, 0.8)",
            });                 

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
        {...props}
        {...getColors(props.id)}
        {...getScale(props.id)}
        ref={ref}
/>};

export default LCylinder;