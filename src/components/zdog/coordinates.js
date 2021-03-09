import { TAU } from 'zdog';

const acone = [{ 
    diameter: 24,
    length: 20.78,
    translate: {
        x: 0,
        y: 0,
        z: 0
    }, 
    rotate: { 
        x: TAU*90/360, 
        y: 0, 
        z: 0 
    },
    scale: 1.4,
    stroke: false,
    color: 'rgba(102, 51, 102, 0.5)',
    backface: 'rgba(204, 34, 85, 0.5)',
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
    color: 'rgba(102, 51, 102, 1)',
    backface: 'rgba(204, 34, 85, 1)',
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
            x: 0,
            y: 0,
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
            x: 0,
            y: 0,
            z: 0
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
        color: 'rgba(238, 170, 0, 1)',
        frontFace: 'rgba(204, 34, 85, 1)',
        backface: 'rgba(238, 102, 34, 1)',  
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
        },
        scale: 1.4,
        color: 'white',
        frontFace: 'white',
        backface: 'white', 
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
}];

const coordsar = [{
    zoom: 1,
    translate: {
        // x: 12.5,
        x: 0,
        // y: -12.5, 
        y: 0,
        z: 0
    }
    }, {
    translate: {
        x: -25,
        y: 25,
        z: 0
    }
    },
    {
    translate: {
        x: 12.5,
        y: 33,
        z: 0
    }
}]

export { acone, coordsar, lcylinder, ocylinder };