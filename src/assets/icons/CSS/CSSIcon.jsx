import { useEffect, useRef, useState } from 'react';
import { Anchor, Group, Shape } from 'react-zdog';
import { TAU } from 'zdog';
import { motion } from "framer-motion"

import OCylinder from '../../../components/zdog/OCylinder';
import { calculateCoords } from '../../../functions';

import gsap, { CSSPlugin } from 'gsap';

gsap.registerPlugin(CSSPlugin);

const Ecusson = props => <Shape path={[
        { x: 100, y: 19.7265625 },
        { x: 90.9090909090909, y: 91.9921875 },
        { x: 49.862258953168045, y: 100 },
        { x: 9.090909090909092, y: 91.9921875 },
        { x: 0, y: 19.7265625 },
        { x: 100, y: 19.7265625 },
    ]} 
    fill={"#264de4"}
    color={"#264de4"}
    stroke={0}
    />
const EcussonDroit = props => <Shape path={[
        { x: 82.92011019283747, y: 87.3046875 },
        { x: 90.9090909090909, y: 25.5859375 },
        { x: 90.9090909090909, y: 25.5859375 },
        { x: 49.862258953168045, y: 25.5859375 },
        { x: 49.862258953168045, y: 93.9453125 },
        { x: 82.92011019283747, y: 87.3046875 },
    ]}
    fill={"#2965f1"}
    color={"#2965f1"} />
const ThreeLeftHalf = props => <Shape path={[
        { x: 20.9366391184573, y: 52.34375 },
        { x: 22.038567493112946, y: 61.328125 },
        { x: 49.862258953168045, y: 61.32812},
        {x: 49.862258953168045, y: 52.34375},
        { x: 20.9366391184573, y: 52.34375 },
        { move: { x: 49.862258953168045, y: 34.375 }},
        { x: 18.457300275482094, y: 34.375 },
        { x: 19.834710743801654, y: 43.359375 },
        { x: 49.862258953168045, y: 43.359375 },
        { x: 49.862258953168045, y: 34.375 },
        { move: { x: 49.862258953168045, y: 84.5703125 }},
        { x: 49.862258953168045, y: 75.390625 },
        { x: 36.08815426997245, y: 72.8515625 },
        { x: 34.98622589531681, y: 65.625 },
        { x: 22.58953168044077, y: 65.625 },
        { x: 24.242424242424242, y: 79.6875 },
        { x: 49.862258953168045, y: 84.5703125 },
        { x: 49.862258953168045, y: 84.5703125 }
    ]}
    color={"#ebebeb"}
    fill={"#ebebeb"} 
    stroke={0}/>
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
        stroke={0}
    />
const LetterS = props => <Shape 
    path={[
        { x: 41.59779614325069, y: 0 },
        { x: 56.74931129476584, y: 0 },
        { x: 56.74931129476584, y: 3.90625 },
        { x: 47.93388429752066, y: 3.90625 },
        { x: 47.93388429752066, y: 4.6875 },
        { x: 56.74931129476584, y: 4.6875 },
        { x: 56.74931129476584, y: 13.671875 },
        { x: 41.59779614325069, y: 13.671875 },
        { x: 41.59779614325069, y: 9.5703125 },
        { x: 50.413223140495866, y: 9.5703125 },
        { x: 50.413223140495866, y: 8.7890625 },
        { x: 41.59779614325069, y: 8.7890625 },
        { x: 41.59779614325069, y: 0 }
    ]}
    translate={props.translate}
    fill={'black'}
    stroke={0} />
const ThreeRightHalf = props => <Shape path={[
        { x: 65.2892561983471, y: 61.328125 },
        { x: 63.91184573002755, y: 72.8515625 },
        { x: 49.862258953168045, y: 75.390625 },
        { x: 49.862258953168045, y: 84.5703125 },
        { x: 75.48209366391184, y: 79.6875 },
        { x: 75.75757575757575, y: 78.125 },
        { x: 78.78787878787878, y: 54.6875 },
        { x: 79.0633608815427, y: 52.34375 },
        { x: 81.26721763085399, y: 34.375 },
        { x: 49.862258953168045, y: 34.375 },
        { x: 49.862258953168045, y: 43.359375 },
        { x: 67.4931129476584, y: 43.359375 },
        { x: 66.39118457300276, y: 52.34375 },
        { x: 49.862258953168045, y: 52.34375 },
        { x: 49.862258953168045, y: 61.328125 },
        { x: 65.2892561983471, y: 61.328125 }
    ]} 
    fill={"#fff"}
    color={"#fff"}
    stroke={0}
    closed={true}
    />
const Three = props => <Group>
        <ThreeLeftHalf />
        <ThreeRightHalf />
    </Group>

const CSS = props => <Group>
        <LetterC />
        <LetterS />
        <LetterS translate={{ x: 18.181818181818183 }} />
    </Group>

const Shield = props => <Group>
        <Ecusson />
        <EcussonDroit />
    </Group>

const IconGroup = props => <Group>
        <Shield />
        <CSS />
        <Three />
    </Group>;

const Icon = motion(IconGroup);

let CSSIcon = (props) => {
    const ref = useRef(undefined);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true, repeat: -1, yoyo: true }));

    useEffect(() => {
        setTl(prev => {
            return prev.to(ref.current.translate, {
            duration: 0.5,
            y: '-=1.25',
            ease: "slow(0.7, 0.7, false)",
        });
    });
        tl.play();

        return () => tl;
    });

    return <Anchor { ...props } ref={ref}>
        <Icon />
    </Anchor>
}

export default CSSIcon;