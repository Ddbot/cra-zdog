import Acone from './components/zdog/Acone';
import OCylinder from './components/zdog/OCylinder';
import LCylinder from './components/zdog/LCylinder';
import TransparentBox from './components/zdog/TransparentBox';

import gsap from 'gsap';
import { TAU } from 'zdog';

const cols = 4, rows = 6;
const cellWidth = 100 / cols, cellHeight = 100 / rows;

let calculateCoords = (index) => {
  return {
    x: (index % cols) * cellWidth,
    y: parseInt(index / cols) * cellHeight
  }
};

const renderShape = (el,index) => {

    switch(el){
      case 'transparent-box':
        return <TransparentBox key={index} id={index}
        translate={
          calculateCoords(index)
        }
        color='transparent'
        />
      case 'acone':
        return <Acone key={index} id={index}
          translate={{
            x: calculateCoords(index).x,
            y: calculateCoords(index).y + cellHeight/4
          }}

          rotate={{ 
            x: TAU*90/360, 
            y: 0, 
            z: 0 
          }}
          scale={8}
        />
      case 'lcylinder':
        return <LCylinder key={index} id={index}
        translate={{
          x: calculateCoords(index).x,
          y: calculateCoords(index).y
        }}
        rotate={{ 
            x: TAU * 90/360, 
            y: TAU * 45/360, 
            z: -TAU * 120/360
        }}

        scale={8}

        />
      case 'ocylinder':
        return <OCylinder key={index} id={index}
        translate={{
          x: calculateCoords(index).x,
          y: calculateCoords(index).y
        }}
        rotate={{ 
            x: 0, 
            y: 0, 
            z: -TAU * 120/360 
        }}

        scale={8}
        />
      default:
        break;
    }
}

const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

const interp = (x,y) => {
  return gsap.utils.interpolate(x,y);
}

export { renderShape, isEqual, interp }