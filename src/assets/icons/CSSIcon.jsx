import { SvgIcon } from '@material-ui/core';
import { useEffect, useRef } from 'react';
import { Shape } from 'react-zdog';

function convert(x, y, width=363, height=512) {
    return { x: x*100/width, y: y*100/height };
  }
  

const Ecusson = props => <Shape path={[
    { x: 0, y: 0},
    { x: 100, y: 0 }, // start at top left
    { x:  90, y: 75 }, // line to top right
    { x:  50, y: 100 }, // line to top right
    { x:  10, y: 75 }, // line to top right
    { x:  0, y: 0 }]} 
    fill={"#264de4"}
    color={"#264de4"}
    />

    const Droit = props => <Shape path={[
        { x: 50, y: 0 },
        { x: 100, y: 0 },
        { x: 90, y: 75 },
        { x: 50, y: 100},
        { x: 50, y: 0 },
    ]}
    fill={"#2965f1"}
    color={"#2965f1"} />

    const LeftHalfThreeTop = props => <Shape path={[
        { x: 20.9366391184573, y: 52.34375 },
        { x: 22.038567493112946, y: 61.328125 },
        { x: 49.862258953168045, y: 61.32812},
        {x: 49.862258953168045, y: 52.34375},
        { x: 20.9366391184573, y: 52.34375 },
    ]}
    color={"#ebebeb"}
    fill={"#ebebeb"} 
    stroke={0}/>

    const LeftHalfThreeMiddle = props => <Shape path={[
        { x: 49.862258953168045, y: 34.375 },
        { x: 18.457300275482094, y: 34.375 },
        { x: 19.834710743801654, y: 43.359375 },
        { x: 49.862258953168045, y: 43.359375 },
        { x: 49.862258953168045, y: 34.375 },
    ]}
    color={"#ebebeb"}
    fill={"#ebebeb"} 
    closed={true}
    stroke={0} />

    const LeftHalfThreeBottom = props => <Shape path={[
        { x: 49.862258953168045, y: 84.5703125 },
        { x: 49.862258953168045, y: 75.390625 },
        { x: 36.08815426997245, y: 72.8515625 },
        { x: 34.98622589531681, y: 65.625 },
        { x: 22.58953168044077, y: 65.625 },
        { x: 24.242424242424242, y: 79.6875 },
        { x: 49.862258953168045, y: 84.5703125 },
        { x: 49.862258953168045, y: 84.5703125 }
    ]} 
    color={'#ebebeb'}
    fill={'#ebebeb'}
    stroke={0}
    closed={true}
    />

    const LetterC = props => <Shape 
        path={[
            { x: 23.415977961432507, y: 0 },
            { x: 38.56749311294766, y: 0 },
            { x: 38.56749311294766, y: 4.4921875 },
            { x: 29.75206611570248, y: 4.4921875 },
            { x: 29.75206611570248, y: 8.984375 },
            { x: 38.56749311294766, y: 8.984375 },
            { x: 38.56749311294766, y: 13.4765625 },
            { x: 23.415977961432507, y: 13.4765625 },
            { x: 23.415977961432507, y: 0 }
        ]}
        fill={'#000'}
    />
let CSSIcon = (props) => {
    const ref = useRef(undefined);

    useEffect(() => {
        // ref.current.path[0].x += ref.current.renderOrigin.x;
        // ref.current.path[0].y -= ref.current.renderOrigin.y;

        // ref.current.renderOrigin.x = 0;
        // ref.current.renderOrigin.y = 0;
        // ref.current.renderOrigin.z = 0;

        // console.log(ref.current.renderOrigin);
    });

    return <>
        <Ecusson />
        <Droit />
        <LetterC />
        <LeftHalfThreeTop ref={ref}/>
        <LeftHalfThreeMiddle />
        <LeftHalfThreeBottom />
    </>
}

export default CSSIcon;