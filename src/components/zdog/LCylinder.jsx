// import ReactDOM from 'react-dom'
import React, { useRef, useEffect, useState  } from 'react'
import { TAU } from 'zdog';
import { Cylinder, useRender } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';

const initialCoords = [{
    diameter: 2,
    length: 48,
    translate: {
    x: 4,
    y: -8,
    z: 0
    },
    rotate: {  x: TAU * 90/360, y: -TAU * 45/360 },
    // ^pour avoir un diamant de coté
    // rotate: { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360}
    stroke: true,
    color: '#e62',
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

let LCylinder = (props) => {
    const [coords, setCoords] = useState(initialCoords[0]);
    const [index, setIndex] = useState(props.index);

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

    useEffect(() => {
        props.index !== previous && setCoords(initialCoords[props.index]);

    },[coords,props.index]);

    const ref = useRef(undefined);

    useRender(t => {
        ref.current.rotate.x += 0;
        ref.current.rotate.y += 0;
        ref.current.rotate.z += 0;
    });

    return <Cylinder
        {...coords}
        ref={ref}
/>};

export default LCylinder;