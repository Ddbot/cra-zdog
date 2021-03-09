import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Illustration } from 'react-zdog'

import styled from 'styled-components'; 
import gsap from 'gsap';

import Acone from './Acone';
import OCylinder from './OCylinder';
import LCylinder from './LCylinder';

import { coordsar } from './coordinates';

import usePrevious from '../../hooks/usePrevious';

const cols = 4, rows = 6;


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

const coordsAr = useMemo( () => coordsar );

  useEffect(() => {
    if (props.index !== index){
      setIndex(props.index)
    }
  },[props.index]);

  useEffect(() => {
    if(previous !== undefined){ 
      gsap.fromTo(ref.current.children[0],{
        duration: 1,
        xPercent: coordsAr[previous].translate.x,
        yPercent: coordsAr[previous].translate.y,
      }, 
      {
        xPercent: coordsAr[current].translate.x,
        yPercent: coordsAr[current].translate.y,
      });  
    }
  },[index, current, previous]);  

  return <Illu ref={ ref }><Illustration 
    { ...coordsAr[0] }
    className='illustration'>
    <OCylinder index={current} /> 
      <Acone index={current} />
      {/* <OCylinder index={current} />  */}
      <LCylinder index={current} /> 
      {/* {['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'].map((el,i) => <g>{renderShape(el,i)}</g>)} */}
  </Illustration></Illu>
};
  
export default Illo;
