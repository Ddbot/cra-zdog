// import ReactDOM from 'react-dom'
import { useRef, useState, useEffect } from 'react'
import { Hemisphere } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';

import gsap, { CSSPlugin } from 'gsap';
import { TAU } from 'zdog';

gsap.registerPlugin(CSSPlugin);

let rotations = [[],[],[ { x: 0, y: 0, z: 0},{ x: 0, y: TAU * 1/360, z: 0},{ x: TAU * 90/360, y: TAU * 60/360, z: 0 }]];

let HalfSphere = (props) => {
    const [index, setIndex ] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(index);
    function getColors(id){
        let res;
        switch(id){
            case 2:
                res = [{
                    color: '#c25',
                    backface: '#c25',
                }, {
                    color: '#636',
                    backface: '#C25',
                }, {
                    color: '#c25',
                    backface: '#c25',
                }]
                break;
            default:
                break;
        }

        return res;
    }

    function getScale(id){
        let res;
        switch(id){
            case 1:
            case 10:
            case 23: 
            case 16:
                res = [{
                    scale: 9
                },{
                    scale: 9
                },{
                    scale: 9
                }]
                break;
            case 10:
                res = [{
                    scale: 1
                },{
                    scale: 1
                },{
                    scale: 1
                }]
                break;
            default:
                res = [{
                    scale: 6
                },{
                    scale: 6
                },{
                    scale: 6
                }]
                break;
        }

        return res;
    }

    // Changer state index quand props.index change
    useEffect(() => {
        if(props.index !== index){
            setIndex(props.index);
        }
    }, [props.index]);

    useEffect(() => {
        if(previous !== undefined && props.id === 2){
            let rotateAnimation = gsap.fromTo( ref.current.rotate, {
                duration: 3,
                ...rotations[props.id][previous],
            },{
                ...rotations[props.id][current],
                ease: "power4.out",
            });

            // let colorAnimation = gsap.fromTo(ref.current, {
            //     duration: 1,
            //     ...colors[props.id][previous],
            // },{
            //     ...colors[props.id][current],
            //     ease: "power4.out",
            // });              

            setTl(prev => {
                prev && prev
                .add(rotateAnimation, '<')
                // .add(colorAnimation, '<');
            })

            return () => tl;
        };
    }, [current, previous, props.id, rotations]);    

    
    useEffect(() => {
        tl && tl.play();
    }, [tl]);

    return <Hemisphere
        {...props}
        {...getColors(props.id)[props.index]}
        {...getScale(props.id)[props.index]}
        stroke={false}
        ref={ref}
    />
};

export default HalfSphere;