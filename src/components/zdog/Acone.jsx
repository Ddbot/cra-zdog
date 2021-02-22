// import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { Anchor, Cone, useRender, useZdog } from 'react-zdog'
// import styled from 'styled-components';

let Acone = (props) => {
    // const { illu, scene, size } = useZdog();

    // useEffect(() => {
    //     console.log(illu, scene, size);
    // }, []);

    return <Cone
        {...props}
    />
};

    export default Acone;