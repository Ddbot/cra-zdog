import { TAU } from 'zdog';
const acone = [{ 
    diameter: 24,
    length: 20.78,
    translate: {
        x: 4,
        y: -20,
        z: 0
    }, 
    rotate: { 
        x: TAU*90/360, 
        y: 0, 
        z: 0 
    },
    scale: 1.4,
    stroke: false,
    color: '#636',
    backface: '#C25',
    duration: 4  
}, {
    rotate: { 
        // x: TAU*90/360, 
        x: TAU*180/360,
        y: 0, 
        z: 0 
    },
    translate: {
        x: -10,
        y: 40,
        z: 0
    },
    duration: 6
},
{
    rotate: { 
        x: TAU*90/360, 
        y: 0, 
        z: 0 
    },
    translate: {
        x: 0,
        y: 40,
        z: 0
    },
}];

const lcylinder = [
    {
        diameter: 2,
        length: 48,
        translate: {
            x: 4,
            y: -8,
            z: 0
        },
        // translate: {
        //     x: 0,
        //     y: 0,
        //     z: 0
        // },
        // rotate: {  x: TAU * 90/360, y: -TAU * 45/360 },
        // pour avoir un diamant de coté
        rotate: { 
            x: TAU * 90/360, 
            y: TAU * 45/360, 
            z: -TAU * 120/360
        },
        stroke: true,
        color: '#e62',
        frontFace: '#c25',
        backface: '#e62',  
    }, 
    {
        translate: {
            x: -20,
            y: 0,
            z: 0
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    }, 
    {
        translate: {
            x: 20,
            y: 0,
            z: 0
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    }];

    const ocylinder = [{
        diameter: 16.97,
        length: 16.97,
        translate: {
            x: 3.95,
            y: 0,
            z: 10
        },
        rotate: { 
            x: 0, 
            y: 0, 
            z: -TAU * 120/360 
        },
        scale: 0.8,
        // pour avoir un diamant de coté
        // rotate: { 
        //     x: TAU * 90/360, 
        //     y: TAU * 45/360, 
        //     z: -TAU * 120/360
        // },
        stroke: false,
        color: '#EA0',
        frontFace: '#c25',
        backface: '#e62',  
    }, {
        translate: {
            x: -20,
            y: 40,
            z: 0
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    {
        translate: {
            x: 20,
            y: 40,
            z: 0
        },
        rotate: {
            x: 0,
            y: 0,
            z: 0
        }
    }]

export { acone, lcylinder, ocylinder };