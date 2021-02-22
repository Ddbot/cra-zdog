// import ReactDOM from 'react-dom'
import React, { useRef } from 'react'
import { Cylinder, useRender } from 'react-zdog'

let LCylinder = (props) => {
    const ref = useRef(undefined);

    useRender(t => {
        ref.current.rotate.x += 0;
        ref.current.rotate.y += 0;
        ref.current.rotate.z -= 0;
    });

    return <Cylinder
        {...props}
        ref={ref}
/>};

export default LCylinder;