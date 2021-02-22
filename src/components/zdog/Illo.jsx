import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { Anchor, Illustration, Ellipse, Shape, RoundedRect, useRender, useZdog } from 'react-zdog'
// New react-spring target, for native animation outside of React
// import { a, useSpring } from 'react-spring/zdog'
// import './styles.css'
import styled from 'styled-components';
import Acone from './Acone';
import OEllipse from './OEllipse';
import LCylinder from './LCylinder';
import TransparentBox from './TransparentBox';

const Illu = styled(Illustration)`
  box-sizing: border-box;

  grid-column: 1 / span 3;
  grid-row: 1 / span 3;

  transition: width linear .125s, height linear .125s;

  z-index: 1;    

  height: 91vh !important;
  width: 100vw !important;
  position: fixed !important;
    
  top: 9vh;
`;

/** --- Basic, re-usable shapes -------------------------- */
const TAU = Math.PI * 2;

const Illo = (props) => {
  const [coords, setCoords] = useState({
    a : { 
      diameter: 24,
      length: 20.78,
      translate: {
        x: 0,
        y: 0,
      }, 
      rotate: { x: TAU*90/360 },
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
      z: 10
    },
    rotate: { z: -TAU * 120/360 },
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
      y: -8
    },
    rotate: {  x: TAU * 90/360, y: -TAU * 45/360 },
    // ^pour avoir un diamant de coté
    // rotate: { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360}
    stroke: true,
    color: '#e62',
    frontFace: '#c25',
    backface: '#e62',  
  }
});
  
  function renderShape(el,index){
    let calculateCoords = index => {
      return [index % cols, parseInt(index / cols)]
    };

    switch(el){
      case 'b':
        return <TransparentBox className="transparentBox" key={index} { ...boxDimensions}  
        /* translate={{
          x: 100 - boxDimensions.x * calculateCoords[0],
          y:100 - boxDimensions.y * calculateCoords[1],
        }} */
        />
      case 't':
        return <Acone className="cone" key={index} { ...aconeDimensions(index) }  
        /* translate={{
          x: 100 - aconeDimensions(index).diameter * calculateCoords[0],
          y: 100 - aconeDimensions(index).diameter * calculateCoords[1],
        }} */
        />
      case 's':
        return <LCylinder className="cylindre" key={index} { ...lcylinderDimensions } 
        /* translate={{
          x: 100 - lcylinderDimensions.x * calculateCoords[0],
          y:100 - lcylinderDimensions.y * calculateCoords[1],
        }} 
        */
        />
      case 'c':
        return <Acone className="cone" key={index} { ...aconeDimensions } 
        /* translate={{
          x: 100 - aconeDimensions(index).x * calculateCoords[0],
          y: aconeDimensions(index).y * calculateCoords[1],
        }} */
        />
      default:
        break;
    }
  }

  return <Illu zoom={4} style={{ transformOrigin: 'top left'}} className='illustration'>
      <Acone { ...coords['a'] } />
      <LCylinder {...coords['o'] } /> 
      <LCylinder {...coords['l']} /> 

      {/* {['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'].map((el,i) => <g>{renderShape(el,i)}</g>)} */}
      </Illu>
}
  
export default Illo;
