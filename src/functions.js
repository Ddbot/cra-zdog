import Acone from './components/zdog/Acone';
import OCylinder from './components/zdog/OCylinder';
import LCylinder from './components/zdog/LCylinder';
import TransparentBox from './components/zdog/TransparentBox';
import HalfSphere from './components/zdog/HalfSphere';


import CSSIcon from '../src/assets/icons/CSS/CSSIcon';
import JSIcon from '../src/assets/icons/JS/JSIcon';

import gsap from 'gsap';
import { TAU } from 'zdog';
import { Cylinder } from 'react-zdog';
import HTML5Group from './components/zdog/HTML5Group';

import { motion, AnimatePresence } from 'framer-motion';


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
			return <TransparentBox 
			key={i} 
			id={i}
			index={index}
			translate={{
				x: calculateCoords(i).x,
				y: calculateCoords(i).y + cellHeight/4,
				z: gsap.utils.random(0, 500, 5)
			}}
			scale={8}
			color='transparent' />
		case '▲':
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
				scale={8} />
		case '▌':
			return <LCylinder 
				key={i}
				id={i}
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
				scale={8} />
		case '●':
			return <OCylinder 
				key={i} 
				id={i}
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
				scale={8} />
        case '◖':
			return <HalfSphere 
				key={i} 
				id={i}
				index={index}    
				translate={{
					x: calculateCoords(i).x,
					y: calculateCoords(i).y,
					z: gsap.utils.random(0, 500, 5) }} />
        case 'css':
			if(index === 1){
				return <CSSIcon 
					key={i} 
					id={i}
					index={index}    
					rotate={{
						x: 0,
						y: 0,
						z: 0
					}}
					translate={{
						x: calculateCoords(i).x,
						y: calculateCoords(i).y,
						z: gsap.utils.random(0, 500, 5)
					}}
					scale={{ x: 0.07, y: .1}} />
			} else {
				return <OCylinder 
					key={i} 
					id={i}
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
					scale={8} />
			}
        case 'html':
			return <AnimatePresence>
            { index === 1 && <HTML5Group
				key={i} 
				id={i}
				index={index} 
				rotate={{
					x: 0,
					y: 0,
					z: 0
				}}   
				translate={{
					x: calculateCoords(i).x,
					y: calculateCoords(i).y,
					z: gsap.utils.random(0, 500, 5)
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}				
				/>
			} 
			{ index !== 1 && <Cylinder 
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
                color={"#e62"}
                frontFace={'#636'}
                backface={'#EEAA00'}
                scale={8} />
			}						
			</AnimatePresence>
		case 'js':
			if(index === 1){
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
					x: calculateCoords(i).x,
					y: calculateCoords(i).y,
					z: gsap.utils.random(0, 500, 5)
				}}
					scale={0.1} />
			} else {
				return <LCylinder 
				key={i}
				id={i}
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
				scale={8} />
			}
        default:
			break;
    }
}

const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());

const interp = (x,y) => {
  return gsap.utils.interpolate(x,y);
}

export { calculateCoords, renderShape, isEqual, interp }
