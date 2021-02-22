// import { Ellipse} from 'react-zdog'
import styled from 'styled-components';
import Zdog from 'zdog';

let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    zoom: 4,
    dragRotate: true,

});

let Container = (props,children) => {
    return <div>{ children }</div>
}

let Cone = ({ addTo }) => {
    let cone = new Zdog.Cone({
        addTo: addTo,
        diameter: 24,
        length: 20.78,
        rotate: { x: TAU*90/360 },
        stroke: false,
        color: '#636',
        backface: '#C25',
    });

    return <Container>{ cone }</Container>
}
export default Cone;