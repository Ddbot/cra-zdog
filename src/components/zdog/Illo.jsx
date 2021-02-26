import ReactDOM from 'react-dom'
import React, { useLayoutEffect, useRef, useState, useEffect, forwardRef } from 'react'
import { Anchor, Illustration, Ellipse, Shape, RoundedRect, useRender, useZdog } from 'react-zdog'

import styled from 'styled-components'; 
import gsap from 'gsap';
import Zdog, { TAU } from 'zdog';

import Acone from './Acone';
import OCylinder from './OCylinder';
import LCylinder from './LCylinder';

import usePrevious from '../../hooks/usePrevious';

const Illu = styled(Illustration)`
  box-sizing: border-box;

  grid-column: 1 / span 3;
  grid-row: 1 / span 3;

  transition: width linear .125s, height linear .125s;

  z-index: 3;    

  height: 91vh !important;
  width: 100vw !important;
  position: fixed !important;
    
  top: 9vh;
`;

const initialCoords = [
  {
  a : { 
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
  },
  o: {
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
  },
  l: {
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
  },
  camera: {
    zoom: 3,
    // debut
    translate: {
      x: 20,
      y: -40
    }
    //fin
    // translate: {
    // 	x: -20,
    // 	y: 40
    // }

  }
},
{
  camera: {
    translate: {
      x: -20,
      y: 40}
  }
},
{
  camera: {
    translate: {
      x: 20,
      y: 40
    },
    zoom: 4
  },
}];

/** --- Basic, re-usable shapes -------------------------- */
const Illo = (props) => {
  const [coords, setCoords ] = useState(initialCoords);
  // const [index, setIndex ] = useState(props.index);

  const current = props.index;
	const previous = usePrevious(current);


  // useEffect(() => {
  // },[]);

  return <Illu 
    {...coords[current]['camera']}
    className='illustration'>
      <Acone { ...coords[current]['a'] } />
      <OCylinder {...coords[current]['o'] } /> 
      <LCylinder {...coords[current]['l']} /> 
      {/* {['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'].map((el,i) => <g>{renderShape(el,i)}</g>)} */}
  </Illu>
};
  
export default Illo;
