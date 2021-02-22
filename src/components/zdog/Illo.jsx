import ReactDOM from 'react-dom'
import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { Anchor, Illustration, Ellipse, Shape, RoundedRect, useRender, useZdog } from 'react-zdog'
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
const Illo = forwardRef((props,ref) => {
  const [coords, setCoords ] = useState(props.coords);
  
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
})
  
export default Illo;
