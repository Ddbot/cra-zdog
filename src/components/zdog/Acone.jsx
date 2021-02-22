// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { Anchor, Cone, useRender, useZdog } from 'react-zdog'
// import styled from 'styled-components';

let Acone = (props) => {
    // const { illu, scene, size } = useZdog();
    const ref = useRef(undefined);

    useEffect(() => {
        console.log(props);
    });

    useRender(t => {
        let { x, y, z } = ref.current.rotate;
        ref.current.rotate.x += 0;
        ref.current.rotate.y += 0;
        ref.current.rotate.z -= 0;
    });


    return <Cone
        {...props}
        ref={ref}
    />
};

    export default Acone;