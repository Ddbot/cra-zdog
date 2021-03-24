// import ReactDOM from 'react-dom'
import React, { useMemo, useRef, useEffect, useState, useLayoutEffect  } from 'react'
import HTMLIcon from '../../assets/icons/HTML/HTMLIcon';

import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { TAU } from 'zdog';
import { Anchor, Cylinder, Group, useRender, useZdog } from 'react-zdog';
gsap.registerPlugin(CSSPlugin);

const HTML5Group = props => {
    const [tl, setTl ] = useState(gsap.timeline({ paused: true, yoyo: true, repeat: -1 }));
    const [index, setIndex] = useState(props.index);
    const groupRef = useRef(undefined);

    useEffect(() => {
        setIndex(props.index);
    }, [props.index]);

    useEffect(() => {
        index === 1 && setTl(prev => {
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
    }, [index]);
    
    return <Anchor {...props} ref={groupRef}>
                <HTMLIcon 	
                    rotate={{
                        x: 0,
                        y: 0,
                        z: 0
                    }}   
                    scale={0.1}/>	    
            </Anchor>
        }
export default HTML5Group;