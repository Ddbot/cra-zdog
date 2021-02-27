// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useEffect, useState } from 'react'
import { TAU } from 'zdog';
import { Cylinder, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';

const initialCoords = [{
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
        y: 40
    }
},
{
    translate: {
        x: 20,
        y: 40
    }
}];

let OCylinder = (props) => {
    const [coords, setCoords] = useState(initialCoords[0]);
    const [index, setIndex] = useState(props.index);

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
        ref.current.rotate.x += 0;
        ref.current.rotate.y += 0;
        ref.current.rotate.z -= 0;
    });

    return <Cylinder
        {...coords}
        ref={ref}
/>};

export default OCylinder;