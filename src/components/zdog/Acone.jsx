// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useLayoutEffect, useState, useEffect } from 'react'
import { TAU } from 'zdog';
import { Anchor, Cone, useRender, useZdog } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
// import styled from 'styled-components';

const initialCoords = [{ 
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
    translate: {
        x: -20,
        y: 40
    }
},
{
    translate: {
        x: 20,
        y: 40
    }
}];

let Acone = (props) => {
    // const { illu, scene, size } = useZdog();
    const [coords, setCoords] = useState(initialCoords[0]);
    const [index, setIndex ] = useState(props.index);

    const ref = useRef(undefined);

    const current = props.index;
	const previous = usePrevious(index);

    useEffect(() => {
        props.index !== undefined && current !== previous && setCoords((prev) => {
            return {
            ...prev, 
            ...initialCoords[props.index]
        }
        });
    },[props.index]);

    useRender(t => {
        ref.current.translate.x += (props.duration/120);
        ref.current.rotate.y += (props.duration/120);
        ref.current.rotate.z += (props.duration/120)

        setTimeout( () =>{
            ref.current.translate.x += 0;
            ref.current.rotate.y += 0;
            ref.current.rotate.z += 0
        }, props.duration);
    });


    return <Cone
        {...coords}
        ref={ref}
    />
};

    export default Acone;