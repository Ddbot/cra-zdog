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

const initialCoords =[{
    zoom: 3,
    // debut
    translate: {
      x: 20,
      y: -40
    }
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

/** --- Basic, re-usable shapes -------------------------- */
const Illo = (props) => {
  const [coords, setCoords ] = useState(initialCoords[0]);
  const [index, setIndex ] = useState(props.index);

  const current = props.index;
	const previous = usePrevious(index);


  useLayoutEffect(() => {
    if(previous !== undefined && current !== previous){
      let anim = gsap.to(window, {
        duration: 10,
        autoAlpha: 1,
        onUpdate: () => {
          let newState = {};

          if(!!previous && previous !== 2){
            Object.keys(initialCoords[previous]).forEach((v) => {
            if (Object.keys(initialCoords[previous][v]).length > 1){
              Object.keys(initialCoords[previous][v]).forEach(key => {
                if(key === ('translate' || 'rotate')){
                  const { x=0, y=0, z=0 } = initialCoords[previous][v][key];
                  // console.log('Rotate or translate transformation', x, y, z);
                  newState[v][key] = {
                    x: Zdog.lerp(x, initialCoords[current][v][key].x, anim.progress()),
                    y: Zdog.lerp(y, initialCoords[current][v][key].y, anim.progress()),
                    z: Zdog.lerp(z, initialCoords[current][v][key].z, anim.progress()),
                  }
                } else if(!['translate','rotate'].includes(key)){
                  // console.log(key, initialCoords[previous][v][key], initialCoords[previous][v])
                  if(!!previous && previous < 2) newState[v][key] = Zdog.lerp(initialCoords[previous][v][key], initialCoords[previous+1][v][key], anim.progress());
                };
              })
            }
          })};
          setCoords(prev =>{
            return {
              ...prev, 
              ...newState
            }
          });
        }
      });
    } 
  },[index]);

  useEffect(() => {
    props.index !== undefined && current !== previous && setCoords((prev) => {
      return {
        ...prev, 
        ...initialCoords[props.index]
      }
    });
},[props.index]);

  return <Illu 
    {...coords }
    className='illustration'>
      <Acone duration={2} index={props.index} />
      <OCylinder duration={2} index={props.index} /> 
      <LCylinder duration={2} index={props.index} /> 
      {/* {['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'].map((el,i) => <g>{renderShape(el,i)}</g>)} */}
  </Illu>
};
  
export default Illo;
