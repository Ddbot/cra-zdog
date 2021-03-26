import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Cylinder } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap,{ CSSPlugin } from 'gsap';
import { useRender, useZdog } from 'react-zdog';
import { ocylinder } from './coordinates';

gsap.registerPlugin(CSSPlugin);

let OCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const { scene, illu, size } = useZdog();

    const coords = useMemo(() => ocylinder);
    const colorCoords = Array(23).fill([]);

    colorCoords[4] = [{
        color: '#636',
        frontFace: '#e62',
        backface: 'white'
    },
    {
        color: '#e36',
        frontFace: '#e62',
        backface: 'white'
    },{
        color: '#e36',
        frontFace: '#e62',
        backface: 'white'
    }];
    colorCoords[9] = [
        {
            color: '#f7df1e',
            frontFace: 'rgba(204, 34, 85, 1)',
            backface: 'rgba(238, 102, 34, 1)', 
            stroke: 1
        },
        {             
            color: "#f7df1e",
            frontFace: 'rgb(41, 101, 241)',
            backface: 'rgb(41, 101, 241)', 
            stroke: 0 
        },
        {
            color: '#f7df1e',
            frontFace: 'rgba(204, 34, 85, 1)',
            backface: 'rgba(238, 102, 34, 1)', 
            stroke: 10 
        }
    ];
    colorCoords[16] = [{
        color: '#e62',
        frontFace: '#e62',
        backface: 'white'
    },{
        color: '#e62',
        frontFace: '#e62',
        backface: 'white'
    },{
        color: '#e62',
        frontFace: '#e62',
        backface: 'white'
}];
    colorCoords[18] = [{
            color: '#e62',
            frontFace: '#e62',
            backface: 'white'
        },{
            color: '#e62',
            frontFace: '#e62',
            backface: 'white'
        },{
            color: '#e62',
            frontFace: '#e62',
            backface: 'white'
    }];
    colorCoords[11] =[{
            color: '#C25',
            frontFace: '#C25',
            backface: '#636'
        },{
            color: '#C25',
            frontFace: '#C25',
            backface: '#636'
        },{
            color: '#C25',
            frontFace: '#C25',
            backface: '#636'
    }];
    colorCoords[21] = colorCoords[9];      

    const colors = useMemo(() => colorCoords);

    // Changer state index quand props.index change
    useEffect(() => {
        if(props.index !== index){
            setIndex(props.index);
        }
    }, [props.index]);

    // Changer state id quand props.id change
    useEffect(() => {
        setIndex(props.id)
    }, [props.id]);

    function getScale(id){
        let res;
        switch(id){
            case 9: 
            case 16:
            case 18:
                res = {
                    scale: 9
                }
                break;
            case 4:
                res = {
                    scale: 6
                }
                break;                
            case 11:
                res = {
                    scale: 4
                }
                break;
            case 13:
                res = {
                    scale: 6
                }
                break;                
            default:
                res = {
                    scale: 2
                }
                break;
        }

        return res;
    }       
    
    // lancer animation quand index change
    useEffect(() => {
        if(previous !== undefined){
            let colorAnimation = gsap.fromTo(ref.current, {
                duration: 1,
                ...colors[props.id][previous],
            },{
                ...colors[props.id][current],
                ease: "power4.out",
            });
            let rotateAnimation = gsap.to(
                ref.current.rotate, {
                duration: 1,
                ...coords[current].rotate,
                ease: "power4.out",
            });          
            
            setTl(prev => {
                prev && prev
                .add(rotateAnimation, '<')
                .add(colorAnimation,'<');
            });

            return () => tl;
        };
    }, [current, previous, props.id, colors]);

    useEffect(() => {
        tl && tl.play();
    }, [tl]);

    return <Cylinder
        {...props}
        {...getScale(props.id)}
        ref={ref}
        diameter={1}
        length={1}
/>};

export default OCylinder;