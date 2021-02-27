// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useEffect, useState } from 'react'
import { TAU } from 'zdog';
import { Cylinder, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap from 'gsap';


const coords = [{
    diameter: 16.97,
    length: 16.97,
    translate: {
    x: 3.95,
    y: 0,
    z: 10
    },
    rotate: { x: 0, y: 0, z: -TAU * 120/360 },
    scale: 0.8,
    // pour avoir un diamant de coté
    // rotate: { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360}
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
}];

const initialTransformation = {
    rotate: { x: 0, y: 0, z: 0 }, translate: { x: 0, y: 0, z: 0 }
};

let OCylinder = (props) => {
    const [index, setIndex] = useState(props.index);
    const [delta, setDelta ] = useState(initialTransformation);
    const [isAnimating, setIsAnimating] = useState(false);

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
    
    useRender((t) => {
                ['translate', 'rotate'].map(param => {
                    Object.keys(coords[current][param])
                        .forEach(key => {
                            if(isAnimating) {
                                ref.current[param][key] += delta[param][key];                    
                            } else {
                                ref.current[param][key] += 0;
                            }
                        });
                });
    },[current, isAnimating]);

    return <Cylinder
        {...coords[current]}
        ref={ref}
/>};

export default OCylinder;