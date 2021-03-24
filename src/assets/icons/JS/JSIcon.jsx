import { useEffect, useRef, useState } from 'react';
import { Anchor, Group, Shape } from 'react-zdog';
import { TAU } from 'zdog';
import { useRender } from 'react-zdog';

let J_commands = [
    'M 214.07,497.32',
    'c 9.3,16.5 17.76,30.45 38.1,30.45',
    'c 19.45,0 31.72,-7.61 31.72,-37.2',
    'v -201.3',
    'h 59.2',
    'v 202.1',
    'c 0,61.3 -35.94,89.2 -88.4,89.2',
    'c -47.4,0 -74.85,-24.53 -88.81,-54.075',
    'Z'
];
let S_commands = [
    'M 423.2,492.19',
    'c 12.69,20.72 29.2,35.95 58.4,35.95',
    'c 24.53,0 40.2,-12.26 40.2,-29.2',
    'c 0,-20.3 -16.1,-27.49 -43.1,-39.3',
    'l -14.8,-6.35',
    'c -42.72,-18.2 -71.1,-41 -71.1,-89.2',
    'c 0,-44.4 33.83,-78.2 86.7,-78.2',
    'c 37.64,0 64.7,13.1 84.2,47.4',
    'l -46.1,29.6',
    'c -10.15,-18.2 -21.1,-25.37 -38.1,-25.37',
    'c -17.34,0 -28.33,11 -28.33,25.37',
    'c 0,17.76 11,24.95 36.4,35.95',
    'l 14.8,6.34',
    'c 50.3,21.57 78.7,43.56 78.7,93',
    'c 0,53.3 -41.87,82.5 -98.1,82.5',
    'c -54.98,0 -90.5,-26.2 -107.88,-60.54',
    'Z',
];
let square_commands = [

];

let width=630, 
    height=630,
    S_path = [], 
    J_path = [],
    square_path = [],
    previousPoint = { x: 0, y: 0 },
    initialPoints = { x: 0, y: 0 };

const process = (str,path) => {
    let regex = /([chlmM]+)\s{1}([-]*\d+\.*\d*),*([-]*\d+\.\d*)\s*([-]*\d*\.*\d*),*([-]*\d*\.*\d*)\s*([-]*\d*\.*\d*),*([-]*\d*\.*\d*)/g;

    const controlPoints = (x,y) => {
        return { x, y }
    };

    if(!['h','v','z','Z'].includes(str[0])){
        let res = regex.exec(str);
    
    switch(str[0]){
        case 'c':
        let cs = str.split(' ');
        cs.shift();
        cs = cs.map(coord => coord.split(','));

            path.push({ bezier: [
                { x:  (previousPoint.x + Number(cs[0][0])), y: (previousPoint.y + Number(cs[0][1])) }, // start control point
                { x:  (previousPoint.x + Number(cs[1][0])), y: (previousPoint.y + Number(cs[1][1])) }, // end control point
                { x:  (previousPoint.x + Number(cs[2][0])), y: (previousPoint.y + Number(cs[2][1])) }, // end point
            ]});
            previousPoint.x += Number(cs[2][0]);
            previousPoint.y += Number(cs[2][1]);
        break;
        case 'l':
            path.push({ 
                x: previousPoint.x + Number(res[2]), 
                y: previousPoint.y + Number(res[3]) 
            });
            previousPoint.x += Number(res[2]);
            previousPoint.y += Number(res[3]);
        break;    
        case 'M':
            initialPoints = controlPoints(Number(res[2]), Number(res[3]));
            path.push(controlPoints(Number(res[2]), Number(res[3])));
            // previousPoint.x = Number(res[2]);
            // previousPoint.y = Number(res[3]);

            previousPoint = controlPoints(Number(res[2]), Number(res[3]));
        break;
    
        case 'm':
            path.push({ move: {
                x: previousPoint.x + Number(res[2]), 
                y: previousPoint.y + Number(res[3])
            }});
            initialPoints = {
                x: previousPoint.x + Number(res[2]), 
                y: previousPoint.y + Number(res[3])
            };

            previousPoint.x += Number(res[2]);
            previousPoint.y += Number(res[3]);
        break;
    
        default:
        break;
    }
    } else {
    let res = Number(str.split(' ')[1]);
    switch(str[0]){
        case 'h':
            path.push({
                x: previousPoint.x + res,
                y: previousPoint.y
            });
            previousPoint.x += res;
            break;        
        case 'v':
            path.push({
                x: previousPoint.x,
                y: previousPoint.y + res
            });
            previousPoint.y += res;
            break;
        case 'Z':
        case 'z':
            path.push(initialPoints);
            previousPoint = initialPoints;
            break;
        default:
            break;
    }
    }
};

J_commands.forEach(command => process(command, J_path));
S_commands.forEach(command => process(command, S_path));
square_commands.forEach(command => process(command, square_path));

const Square = props => <Shape path={[
    { x: 0, y: 0 },
    { x: 630, y: 0 },
    { x: 630, y: 630 },
    { x: 0, y: 630 },
    { x: 0, y: 0 },
]} fill={"#f7df1e"} 
color={"#f7df1e"}
scale={props.scale}
stroke={0}
/>

const S = props => <Shape path={[...S_path]} closed={true} fill={'black'} stroke={0} scale={props.scale} />
const J = props => <Shape path={[...J_path]} closed={true} fill={'black'} stroke={0} scale={props.scale} />

let JSIcon = (props) => {
    const [index, setIndex] = useState(props.index);

    useEffect(() => {
    setIndex(props.index);
    },[props.index]);

    return <Anchor { ...props } scale={props.scale} stroke={0}>
        <Square scale={props.scale} stroke={0}/>
        <J scale={props.scale}/>
        <S scale={props.scale}/>
    </Anchor>
}

export default JSIcon;

