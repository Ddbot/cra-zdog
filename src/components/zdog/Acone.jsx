// import ReactDOM from 'react-dom'
// import React, { useRef, useState, useEffect } from 'react'
import { Anchor, Cone, useRender } from 'react-zdog'
// import styled from 'styled-components';

let Acone = props => <Cone
    diameter={28}
    length={36}
    stroke={false}
    color={'#636'}
    backface={'#C25'}
    rotate={props.rotate} />;

    export default Acone;