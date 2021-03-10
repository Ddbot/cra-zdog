// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Cylinder } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap,{ CSSPlugin } from 'gsap';
import { useRender, useZdog } from 'react-zdog';
gsap.registerPlugin(CSSPlugin);

let OCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(props.index);

    const { scene, illu, size } = useZdog();

    // useRender((t) => {
    //     scene.rotate.y += 0.001;
    // });

    const colorCoords = Array(23).fill([]);

    // colorCoords[2] = [
    // {   color: '#636',
    //     frontFace: '#636',
    //     backface: '#ea0',
    // }, {
    //     color: 'rgba(238, 170, 0, 1)',
    //     frontFace: '#636',
    //     backface: '#ea0',
    // },
    // {   
    //     color: 'rgba(238, 170, 0, 1)',
    //     frontFace: '#636',
    //     backface: '#ea0',
    // }];
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
            color: 'rgba(238, 170, 0, 1)',
            frontFace: 'rgba(204, 34, 85, 1)',
            backface: 'rgba(238, 102, 34, 1)', 
            stroke: 1
        },
        {             
            color: "rgb(41, 101, 241)",
            frontFace: 'rgb(41, 101, 241)',
            backface: 'rgb(41, 101, 241)', 
            stroke: 0 
        },
        {
            color: 'rgba(238, 170, 0, 1)',
            frontFace: 'rgba(204, 34, 85, 1)',
            backface: 'rgba(238, 102, 34, 1)', 
            stroke: 10 
        }
    ];
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
        // if(props.id !== id){
        setIndex(props.id)
        // };
    }, [props.id]);

    useEffect(() => {
        console.log(size)
    })

    function getScale(id){
        let res;
        switch(id){
            // case 2:
            case 9: 
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
    //         let rotateAnimation = gsap.to([
    //             ref.current.rotate, 
    //         ], {
    //             duration: 1,
    //             ...coords[current].rotate,
    //             ease: "power4.out",
    //         });

    //         let translateAnimation = gsap.to([
    //             ref.current.translate, 
    //         ], {
    //             duration: 1,
    //             ...coords[current].translate,
    //             ease: "elastic.out(1, 0.8)",
    //         });     

    //         let colorAnimation = gsap.to(ref.current, {
    //             duration: 1,
    //             onStart: () => {
    //                 gsap.set(ref.current, {
    //                     mixBlendMode: 'exclusion'
    //                 });
    //             },
    //             color: coords[current].color,
    //             frontFace: coords[current].frontFace,
    //             scale: coords[current].scale
    //         });            
            
            setTl(prev => {
                prev && prev
    //             .add(translateAnimation)
    //             .add(rotateAnimation, '<')
                .add(colorAnimation,'<');
            });

            return () => tl;
        };
    }, [current, previous, props.id, colors]);

    useEffect(() => {
        tl && tl.play();
    }, [tl]);

    useEffect(() => {
        console.log('Ref current: ', ref.current);
    });

    return <Cylinder
        {...props}
        // {...getScale(props.id)}
        id={props.id === 9 ? 'cssOne' : ''}
        ref={ref}
        diameter={1}
        length={1}
/>};

export default OCylinder;