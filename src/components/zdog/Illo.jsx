import React, { useMemo, useState, useEffect, forwardRef } from 'react'
import { Illustration } from 'react-zdog'

import styled from 'styled-components'; 
import gsap from 'gsap';
import { TAU } from 'zdog';

import { coordsar } from './coordinates';

import usePrevious from '../../hooks/usePrevious';
import { renderShape } from '../../functions';

const zoomIndices = [1,2,4];

const rotateIndices = [{x: 0, y: 0, z: 0},{x: 0, y: 0, z: TAU * 42/360},{x: 0, y: 0, z: TAU * 150/360}];

const Illu = styled.div`
  box-sizing: border-box;

  grid-column: 1 / span 3;
  grid-row: 1 / span 3;

  height: 91vh !important;
  width: 100vw !important;
  position: fixed !important;    
  top: 9vh;
`;

const shapesList = [
'□','▲','◖','□',
'●','html','□','▲',
'▲','□','▲','●',
// '□','□','▌','□',
'□','css','js','□',
//'▲','□','●','□',
'■','□','●','□',
// '□','●','□','▲'];
 '□','■','□','▲'];

const Illo = forwardRef((props, ref) => {
  const [ index, setIndex ] = useState(props.index);
  const [list, setList ] = useState(shapesList);

  const current = props.index;
	const previous = usePrevious(index);

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

      gsap.fromTo(ref.current.children[0],{
        duration: 1,
        scale: zoomIndices[previous],
        onStart: () => {
          gsap.fromTo(ref.current.rotate,{
            duration: 1,
            ...rotateIndices[previous]
          }, 
          {
            ...rotateIndices[current]
          });
        }
      }, 
      {
        scale: zoomIndices[current],
      });  
    }
  },[index, current, previous]); 

  return <Illu ref={ ref }><Illustration 
    { ...coordsAr[0] }
    centered={false}
    zoom={4}
    scale={1}
    index={ props.index }>
      { list.map((el,i) => renderShape(el,i, props.index) )}    
  </Illustration></Illu>
});
  
export default Illo;
