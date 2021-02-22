import ReactDOM from 'react-dom'
import styled from 'styled-components';
import Zdog from 'zdog';

/** --- Basic, re-usable shapes -------------------------- */
const { TAU } = Zdog;

const shapes = ['b','t','c','b','c','s','b','t','t','c','t','c','b','b','s','b','t','b','c','b','b','c','b','t'];

const illo = new Zdog.Illustration({
    element: '.zdog-canvas',
});

let cone = new Zdog.Cone({
    addTo: illo,
    diameter: 70,
    length: 90,
    stroke: false,
    color: '#636',
    backface: '#C25',
});

let cylindre = new Zdog.Cylinder({
    addTo: illo,
    diameter: 80,
    length: 120,
    stroke: false,
    color: '#C25',
    backface: '#E62',
});

let box = new Zdog.Box({
    addTo: illo,
    width: 120,
    height: 100,
    depth: 80,
    stroke: false,
    color: '#C25', // default face color
    leftFace: '#EA0',
    rightFace: '#E62',
    topFace: '#ED0',
    bottomFace: '#636',      
});

// Made with Zdog

// ----- setup ----- //

// get svg element
let svg = document.querySelector('svg');
// rendering sizes
const zoom = 4;
const sceneWidth = 16;
const sceneHeight = 16;
let viewWidth = sceneWidth * zoom;
let viewHeight = sceneHeight * zoom;
let svgWidth = svg.getAttribute('width');
let svgHeight = svg.getAttribute('height');
// set viewBox using zoom
svg.setAttribute( 'viewBox', `${-viewWidth/2}  ${-viewHeight/2} ` +
  `${viewWidth} ${viewHeight}` );
// rendering variable
let isSpinning = true;
const TAU = Zdog.TAU;

// create an scene Anchor to hold all items
let scene = new Zdog.Anchor();

// ----- model ----- //

// add shapes to scene
new Zdog.Shape({
  addTo: scene,
  path: [
    { x:  0, y: -8 },
    { x:  8, y:  8 },
    { x: -8, y:  8 },
  ],
  translate: { z: 10 },
  color: '#E62',
  stroke: 3,
  fill: true,
});

new Zdog.Ellipse({
  addTo: scene,
  diameter: 20,
  translate: { z: -10 },
  stroke: 5,
  color: '#636',
});

// ----- animate ----- //

function animate() {
  // make changes to model, like rotating scene
  scene.rotate.y += isSpinning ? 0.03 : 0;
  scene.updateGraph();
  render();
  requestAnimationFrame( animate );
}

function render() {
  empty( svg );
  scene.renderGraphSvg( svg );
}

animate();

function empty( element ) {
  while ( element.firstChild ) {
    element.removeChild( element.firstChild );
  }
}

// ----- drag ----- //

let dragStartRX, dragStartRY;
let minSize = Math.min( svgWidth, svgHeight );

// add drag-rotatation with Dragger
new Zdog.Dragger({
  startElement: svg,
  onDragStart: function() {
    isSpinning = false;
    dragStartRX = scene.rotate.x;
    dragStartRY = scene.rotate.y;
  },
  onDragMove: function( pointer, moveX, moveY ) {
    scene.rotate.x = dragStartRX - ( moveY / minSize * TAU );
    scene.rotate.y = dragStartRY - ( moveX / minSize * TAU );
  },
});
});
