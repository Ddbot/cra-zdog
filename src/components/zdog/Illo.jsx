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

const coords =[{
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
  const [ index, setIndex ] = useState(props.index);
  const [ move, setMove ] = useState(props.move);

  const current = props.index;
	const previous = usePrevious(index);
  const ref = useRef(undefined);

  useEffect(() => {
    setMove(props.move);
  })

  // useRender((t) => {
  //   if(move !== 'stop' ){
  //     ref.current.translate.x += 0.1;
  //     ref.current.translate.y += 0.1;
  //     // ref.current.translate.x += 0.1;
  //   } else {
  //     ref.current.translate.x += 0;
  //   }
  // },[move])

  // useLayoutEffect(() => {
  //   if(previous !== undefined && current !== previous){
  //     let anim = gsap.to(window, {
  //       duration: 1,
  //       autoAlpha: 1,
  //     });
  //   } 
  // },[index]);

  return <Illu 
    {...coords[current] }
    className='illustration'
    ref={ref}>
      <Acone duration={.4} index={current} move={move} />
      <OCylinder duration={0.225} index={current} move={move} /> 
      <LCylinder duration={0.125} index={current} move={move} /> 
      {/* {['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'].map((el,i) => <g>{renderShape(el,i)}</g>)} */}
  </Illu>
};
  
export default Illo;
