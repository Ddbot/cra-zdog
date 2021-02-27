// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useLayoutEffect, useState, useEffect } from 'react'
import  { TAU } from 'zdog';
import { Cone, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap from 'gsap';
// import styled from 'styled-components';

const coords = [{ 
    diameter: 24,
    length: 20.78,
    translate: {
        x: 0,
        y: 0,
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
}, {
    rotate: { 
        x: TAU*90/360, 
        y: 0, 
        z: 0 
    },
    translate: {
        x: -20,
        y: 40,
        z: 0
    }
},
{
    rotate: { 
        x: TAU*90/360, 
        y: 0, 
        z: 0 
    },
    translate: {
        x: 20,
        y: 40,
        z: 0
    }
}];

const initialTransformation = {
    rotate: { x: 0, y: 0, z: 0 }, translate: { x: 0, y: 0, z: 0 }
};

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    const [delta, setDelta ] = useState(initialTransformation);
    const [isAnimating, setIsAnimating] = useState(false);
    const [move, setMove] = useState(props.move)

    const { duration } = props;

    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(index);

    // Changer state index quand props.index change
    useEffect(() => {
        setIndex(props.index);
    }, [props.index])

    // lancer animation quand index change
    useEffect(() => {
        if(previous !== undefined){
            gsap.to(ref.current, {
                    duration,
                    onStart: () => {
                        setIsAnimating(true);
                        setDelta(prev => {
                            let res = initialTransformation;
                            
                            ['translate', 'rotate'].forEach((param) => {
                                Object.keys(coords[current][param]).forEach(key => {
                                    res[param][key] = (coords[current][param][key] - coords[previous][param][key])/(duration*60);
                                });
                            });
                            
                            return res;
                        });                    
                    },                    
                    onComplete: () => {
                        setIsAnimating(false);
                    }
            })      
        };
    }, [index]);

    // Change move direction from props.move
    useEffect(() => {
        setMove(props.move);
    },[props.move]);

    useRender((t) => {
            // ['translate', 'rotate'].map(param => {
            //     Object.keys(coords[current][param])
            //         .forEach(key => {
            //             if(isAnimating) {
            //                 ref.current[param][key] += delta[param][key];                    
            //             } else {
            //                 ref.current[param][key] += 0;
            //             }
            //         });
            // });
            switch(move){
                case 'left':
                    ref.current.translate.x -= 0.1;
                break;
                case 'right':
                    ref.current.translate.x += 0.1;
                break;
                case 'up':
                    ref.current.translate.y -= 0.1;
                break;
                case 'down':
                    ref.current.translate.y += 0.1;
                break;
                case 'stop':
                default: 
                    ref.current.translate.x += 0;
                    ref.current.translate.y += 0;
                    break;
            }
    // },[current, isAnimating]);
},[move]);

    return <Cone
        {...coords[index]}
        ref={ref}
    />
};

    export default Acone;