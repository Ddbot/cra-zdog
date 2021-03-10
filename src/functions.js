import Acone from './components/zdog/Acone';
import OCylinder from './components/zdog/OCylinder';
import LCylinder from './components/zdog/LCylinder';
import TransparentBox from './components/zdog/TransparentBox';
import HalfSphere from './components/zdog/HalfSphere';

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

const renderShape = (el,i, index) => {

    switch(el){
      case 'transparent-box':
        return <TransparentBox key={i} id={i}
        index={index}
        translate={
          calculateCoords(i)
        }
        color='transparent'
        />
      case 'acone':
        return <Acone key={i} id={i}
        index={index}
          translate={{
            x: calculateCoords(i).x,
            y: calculateCoords(i).y + cellHeight/4
          }}

          rotate={{ 
            x: TAU*90/360, 
            y: 0, 
            z: 0 
          }}
          scale={8}
        />
      case 'lcylinder':
        return <LCylinder key={i} id={i}
        index={index}
        translate={{
          x: calculateCoords(i).x,
          y: calculateCoords(i).y
        }}
        rotate={{ 
            x: TAU * 90/360, 
            y: TAU * 45/360, 
            z: -TAU * 120/360
        }}

        scale={8}

        />
      case 'ocylinder':
        return <OCylinder key={i} id={i}
        index={index}
        translate={{
          x: calculateCoords(i).x,
          y: calculateCoords(i).y
        }}
        rotate={{ 
            x: 0, 
            y: 0, 
            z: -TAU * 120/360 
        }}

        scale={8}
        />
        case 'half':
          return <HalfSphere 
            key={i} id={i}
            index={index}   
            rotate={{ 
              x: TAU * 120/360, 
              y: 0, 
              z: 0
            }}      
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