// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Cylinder } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap,{ CSSPlugin } from 'gsap';
import { ocylinder } from './coordinates';
import { useTheme } from '@material-ui/core/styles';

gsap.registerPlugin(CSSPlugin);

let OCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const theme = useTheme();

    const coords = useMemo(() => ocylinder);

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

            let colorAnimation = gsap.to(ref.current, {
                duration: 1,
                onStart: () => {
                    gsap.set(ref.current, {
                        mixBlendMode: 'exclusion'
                    });
                },
                color: coords[current].color,
                frontFace: coords[current].frontFace,
                scale: coords[current].scale
            });            
            
            setTl(prev => {
                prev && prev
                .add(translateAnimation)
                .add(rotateAnimation, '<')
                .add(colorAnimation,'<');
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