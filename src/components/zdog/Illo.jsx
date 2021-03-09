import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Illustration } from 'react-zdog'

import styled from 'styled-components'; 
import gsap from 'gsap';

// import Acone from './Acone';
// import OCylinder from './OCylinder';
// import LCylinder from './LCylinder';
// import TransparentBox from './TransparentBox';

import { coordsar } from './coordinates';

import usePrevious from '../../hooks/usePrevious';
import { renderShape } from '../../functions';

const zoomIndices = [1.2,2,4];

const Illu = styled.div`
  box-sizing: border-box;

  grid-column: 1 / span 3;
  grid-row: 1 / span 3;

  transition: width linear .125s, height linear .125s;

  // z-index: 3;    

  height: 91vh !important;
  width: 100vw !important;
  position: fixed !important;
    
  top: 9vh;
`;

/** --- Basic, re-usable shapes -------------------------- */
const Illo = (props) => {
  const [ index, setIndex ] = useState(props.index);

  const current = props.index;
	const previous = usePrevious(index);
  const ref = useRef(undefined);

const coordsAr = 
useMemo( () => 
coordsar 
);

  useEffect(() => {
    if (props.index !== index){
      setIndex(props.index)
    }
  },[props.index]);

  useEffect(() => {
    if(previous !== undefined){ 
      // gsap.fromTo(ref.current.children[0],{
      //   duration: 1,
      //   xPercent: coordsAr[previous].translate.x,
      //   yPercent: coordsAr[previous].translate.y,
      // }, 
      // {
      //   xPercent: coordsAr[current].translate.x,
      //   yPercent: coordsAr[current].translate.y,
      // });  
      // gsap.fromTo(ref.current.children[0],{
      //   duration: 2,
      //   zoom: zoomIndices[previous]
      // }, {
      //   zoom: zoomIndices[current]
      // });
      // gsap.fromTo(ref.current.children[0],{
      //   duration: 1,
      //   scale: zoomIndices[previous]
      // }, 
      // {
      //   scale: zoomIndices[current]
      // });        
    }
  },[index, current, previous]);  

  return <Illu ref={ ref }><Illustration 
    { ...coordsAr[0] }
    className='illustration'
    centered={false}
    zoom={4}
    index={props.index}>
      {['transparent-box','acone','ocylinder','transparent-box',
        'ocylinder','lcylinder','transparent-box','acone',
        'acone','ocylinder','acone','ocylinder',
        'transparent-box','transparent-box','lcylinder','transparent-box',
        'acone','transparent-box','ocylinder','transparent-box',
        'transparent-box','ocylinder','transparent-box','acone'].map((el,i) => renderShape(el,i, props.index))}
  </Illustration></Illu>
};
  
export default Illo;
