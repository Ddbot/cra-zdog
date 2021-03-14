let width=630, 
    height=630,
    path = [], 
    previousPoint = { x: 0, y: 0 },
    initialPoints = { x: 0, y: 0 };

const process = (str) => {
// Regexer la ligne de bezier
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
                { x:  (previousPoint.x + Number(cs[0][0]))*100/width, y: (previousPoint.y + Number(cs[0][1]))*100/height }, // start control point
                { x:  (previousPoint.x + Number(cs[1][0]))*100/width, y: (previousPoint.y + Number(cs[1][1]))*100/height }, // end control point
                { x:  (previousPoint.x + Number(cs[2][0]))*100/width, y: (previousPoint.y + Number(cs[2][1]))*100/height }, // end point
            ]});
            previousPoint.x += Number(cs[2][0])*100/width;
            previousPoint.y += Number(cs[2][1])*100/height;
        break;
        case 'l':
            path.push({ 
                x: previousPoint.x + Number(res[2])*100/width, 
                y: previousPoint.y + Number(res[3])*100/height 
            });
            previousPoint.x += Number(res[2])*100/width;
            previousPoint.y += Number(res[3])*100/height;
        break;    
        case 'M':
            initialPoints = controlPoints(Number(res[2])*100/width, Number(res[3])*100/height);
            path.push({ move: controlPoints(Number(res[2])*100/width, Number(res[3])*100/height)});
            // previousPoint.x = Number(res[2]);
            // previousPoint.y = Number(res[3]);

            previousPoint = controlPoints(Number(res[2])*100/width, Number(res[3])*100/height);
        break;
    
        case 'm':
            path.push({ move: {
                x: previousPoint.x + Number(res[2])*100/width, 
                y: previousPoint.y + Number(res[3])*100/height
            }});
            initialPoints = {
                x: previousPoint.x + Number(res[2])*100/width, 
                y: previousPoint.y + Number(res[3])*100/height
            };

            previousPoint.x += Number(res[2])*100/width;
            previousPoint.y += Number(res[3])*100/height;
        break;
    
        default:
        break;
    }
  } else {
    let res = Number(str.split(' ')[1]);
    switch(str[0]){
        case 'h':
            path.push({
                x: previousPoint.x + res*100/width,
                y: previousPoint.y
            });
            previousPoint.x += res*100/width;
            break;        
        case 'v':
            path.push({
                x: previousPoint.x,
                y: previousPoint.y + res*100/height
            });
            previousPoint.y += res*100/width;
            break;
        case 'Z':
        case 'z':
            console.log('Si Z: ', initialPoints, previousPoint)
            path.push(initialPoints);
            previousPoint = initialPoints;
            break;
        default:
            break;
    }
}
}

let commands = [
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
'm -209.13,5.13',
'c 9.3,16.5 17.76,30.45 38.1,30.45',
'c 19.45,0 31.72,-7.61 31.72,-37.2',
'v -201.3',
'h 59.2',
'v 202.1',
'c 0,61.3 -35.94,89.2 -88.4,89.2',
'c -47.4,0 -74.85,-24.53 -88.81,-54.075',
'Z'
];

commands.forEach(command => process(command));

        

// console.log(initialPoints, previousPoint)



