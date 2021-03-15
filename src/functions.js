import Acone from './components/zdog/Acone';
import OCylinder from './components/zdog/OCylinder';
import LCylinder from './components/zdog/LCylinder';
import TransparentBox from './components/zdog/TransparentBox';
import HalfSphere from './components/zdog/HalfSphere';

import gsap from 'gsap';
import { TAU } from 'zdog';
import JSIcon from './assets/icons/JSIcon';

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
      case '□':
        return <TransparentBox key={i} id={i}
        index={index}
        translate={{
            x: calculateCoords(i).x,
            y: calculateCoords(i).y,
            z: gsap.utils.random(0, 500, 5)
          }}
        scale={1}
        color='transparent'
        width={8}
        height={8}
        />
      case '🛆':
        return <Acone key={i} id={i}
        index={index}
          translate={{
            x: calculateCoords(i).x,
            y: calculateCoords(i).y + cellHeight/4,
            z: gsap.utils.random(0, 500, 5)
          }}

          rotate={{ 
            x: TAU*90/360, 
            y: 0, 
            z: 0 
          }}
        />
      case '◆':
        return <LCylinder key={i} id={i}
        index={index}
        translate={{
          x: calculateCoords(i).x,
          y: calculateCoords(i).y,
          z: gsap.utils.random(0, 500, 5)
        }}
        rotate={{ 
            x: TAU * 90/360, 
            y: TAU * 45/360, 
            z: -TAU * 120/360
        }}
        scale={8}
        />
      case '○':
        return <OCylinder key={i} id={i}
        index={index}
        translate={{
          x: calculateCoords(i).x,
          y: calculateCoords(i).y,
          z: gsap.utils.random(0, 500, 5)
        }}
        rotate={{ 
            x: 0, 
            y: 0, 
            z: -TAU * 120/360 
        }}

        // scale={8}
        />
        case '◖':
          return <HalfSphere 
            key={i} id={i}
            index={index}    
            translate={{
          x: calculateCoords(i).x,
          y: calculateCoords(i).y,
          z: gsap.utils.random(0, 500, 5)
        }}                
          />
        case 'js':
          return <JSIcon 
            key={i} 
			id={i}
            index={index} 
			rotate={{
				x: 0,
				y: 0,
				z: 0
			}}
			translate={{
				x: 0,
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

function convert(x, y, width=363, height=512) {
  return { x: x*100/width, y: y*100/height };
}

export { convert, renderShape, isEqual, interp }