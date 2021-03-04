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

const Illu = styled.div`
  box-sizing: border-box;

  grid-column: 1 / span 3;
  grid-row: 1 / span 3;

  transition: width linear .125s, height linear .125s;

  z-index: 3;    

  height: 91vh !important;
  width: 100vw !important;
  position: fixed !important;
    
  top: 9vh;

  svg { border: 1px dashed red; }
`;

const coordsAr =[{
    zoom: 3,
    // debut
    translate: {
      x: 12.5,
      y: -12.5,
      z: 0
    }
  }, {
    translate: {
      x: -25,
      y: 25,
      z: 0
  }
  },
  {
    translate: {
      x: 12.5,
      y: 33,
      z: 0
  }
  }];

/** --- Basic, re-usable shapes -------------------------- */
const Illo = (props) => {
  const [ index, setIndex ] = useState(props.index);
  const [ move, setMove ] = useState(props.move);
  const [coords, setCoords] = useState(coordsAr[0]);

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

  //   useRender((t) => {
  //   if(current !== undefined && current !== previous ){
  //     setCoords(prev => {
  //       return {
  //         ...prev,
  //         translate: {
  //           x: prev.translate.x += 0.1, 
  //           y: prev.translate.y += 0.1,
  //           z: prev.translate.z += 0.1
  //         }
  //       }
  //     })
  //   }
  // },[current, previous])

  // useLayoutEffect(() => {
  //   if(previous !== undefined && current !== previous){
  //     let anim = gsap.to(window, {
  //       duration: 1,
  //       autoAlpha: 1,
  //     });
  //   } 
  // },[index]);

    useEffect(() => {
    if (props.index !== index){
      setIndex(props.index)
    }
  },[props.index]);

  // useEffect(() => {
    // index !== 0 && setCoords(coordsAr[current]);
  // },[index])

  useEffect(() => {
    if(previous !== undefined){ 
      gsap.fromTo(ref.current.children[0], 
        {
          duration: 1,
          xPercent: coordsAr[previous].translate.x,
          yPercent: coordsAr[previous].translate.y,
          zPercent: coordsAr[previous].translate.z,
          onStart: () => {
            console.log('OnStart, dans gsap animation de illu, ', previous, current);
          }
        }, 
        {
          xPercent: coordsAr[current].translate.x,
          yPercent: coordsAr[current].translate.y,
          zPercent: coordsAr[current].translate.z,
          onComplete: () => {
            console.log('onComplete, dans gsap animation de illu, ', previous, current);
          }      
        })
    }

    return () => {}
  },[index, current, previous]);  

//   useEffect(() => {
// console.log(previous, current)
//   });

  return <Illu ref={ ref }><Illustration 
    {...coords }
    className='illustration'>
      <Acone index={current} move={move} />
      <OCylinder index={current} move={move} /> 
      <LCylinder index={current} move={move} /> 
      {/* {['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'].map((el,i) => <g>{renderShape(el,i)}</g>)} */}
  </Illustration></Illu>
};
  
export default Illo;
