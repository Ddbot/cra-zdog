// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState, useLayoutEffect  } from 'react'
import HTMLIcon from '../../assets/icons/HTML/HTMLIcon';

import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { TAU } from 'zdog';
import { Anchor } from 'react-zdog';
gsap.registerPlugin(CSSPlugin);


const HTML5Group = props => {
    const [tl, setTl ] = useState(gsap.timeline({ paused: true, yoyo: true, repeat: -1 }));
    const groupRef = useRef(undefined);

    useEffect(() => {
        setTl(prev => {
            return prev.to(groupRef.current.rotate, {
            duration: 3,
            y: TAU * -42/360,
            // ease: "power2.out"        
        },'<')
        .to(groupRef.current.rotate, {
            duration: 3,
            y: TAU * 42/360,
            // ease: "power2.out"        
        },'>');
    });
        tl.play();

        return () => tl.pause();
    });
    
    return <Anchor {...props} ref={groupRef}>
                <HTMLIcon 	
                // translate={{ x: -props.translate.x/4 }}
                    rotate={{
                        x: 0,
                        y: 0,
                        z: 0
                    }}   
                    scale={0.1}/>	    
            </Anchor>
        }
export default HTML5Group;