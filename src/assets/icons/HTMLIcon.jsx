import { useEffect, useRef } from 'react';
import { Anchor, Group, Shape } from 'react-zdog';
import { TAU } from 'zdog';
import { useRender } from 'react-zdog';

let HTMLIcon = (props) => {
    let ref = useRef(undefined);
    let { id, index } = props;

    const HTML = props => <Shape path={[
        { x: 21.171875, y: 0 },
        { x: 25.6640625, y: 0 },
        { x: 25.6640625, y: 4.453125 },
        { x: 29.8046875, y: 4.453125 },
        { x: 29.8046875, y: 0 },
        { x: 34.296875, y: 0 },
        { x: 34.296875, y: 13.4765625 },
        { x: 29.8046875, y: 13.4765625 },
        { x: 29.8046875, y: 8.984375 },
        { x: 25.703125, y: 8.984375 },
        { x: 25.703125, y: 13.4765625 },
        { x: 21.171875, y: 13.4765625 },
        { x: 21.171875, y: 0 },
        { move: { x: 40.234375, y: 4.4921875 }},
        { x: 36.26953125, y: 4.4921875 },
        { x: 36.26953125, y: 0 },
        { x: 48.71093749999999, y: 0 },
        { x: 48.71093749999999, y: 4.4921875 },
        { x: 44.7265625, y: 4.4921875 },
        { x: 44.7265625, y: 13.4765625 },
        { x: 40.234375, y: 13.4765625 },
        { x: 40.234375, y: 4.4921875 },
        { move: { x: 50.68359375, y: 0 }},
        { x: 55.39062500000001, y: 0 },
        { x: 58.28125000000001, y: 4.74609375 },
        { x: 61.171875, y: 0 },
        { x: 65.87890625, y: 0 },
        { x: 65.87890625, y: 13.4765625 },
        { x: 61.38671875, y: 13.4765625 },
        { x: 61.38671875, y: 6.796874999999999 },
        { x: 58.2421875, y: 11.640624999999998 },
        { x: 55.09765624999999, y: 6.796874999999999 },
        { x: 55.09765624999999, y: 13.4765625 },
        { x: 50.683593749999986, y: 13.4765625 },
        { x: 50.68359375, y: 0 },
        { move: { x: 68.10546874999999, y: 0 }},
        { x: 72.59765624999999, y: 0 },
        { x: 72.59765624999999, y: 9.0234375 },
        { x: 78.96484374999999, y: 9.0234375 },
        { x: 78.96484374999999, y: 13.4765625 },
        { x: 68.10546874999999, y: 13.4765625 },
        { x: 68.10546874999999, y: 0 }
    ]} closed={true} fill={'black'} stroke={0} />
    const RightShield = props => <Shape path={[
        { x: 50, y: 93.84765625 },
        { x: 50, y: 25.5859375 },
        { x: 78.96484375, y: 25.5859375 },
        { x: 78.96484375, y: 25.5859375 },
        { x: 73.4375, y: 87.3046875 },
    ]} 
    fill={"#f16529"} color={"#f16529"} stroke={0} />
    const ShieldColor = props => <Shape path={[
        { x: 21.015625, y: 91.9921875 },
        { x: 14.570312499999998, y: 19.648437500000004 },
        { x: 85.4296875, y: 19.648437500000004 },
        { x: 78.984375, y: 91.953125 },
        { x: 49.94140625, y: 100 },
        { x: 21.015625, y: 91.9921875 },
    ]} closed={true} fill={"#e44d26"} color={"#e44d26"} stroke={0}/>
    const FiveLeftHalf = props => <Shape path={[
        { x: 27.734375, y: 34.43359375 },
        { x: 50, y: 34.43359375 },
        { x: 50, y: 43.30078125 },
        { x: 37.4609375, y: 43.30078125 },
        { x: 38.28125, y: 52.3828125 },
        { x: 50, y: 52.3828125 },
        { x: 50, y: 61.230468750000014 },
        { x: 30.15625, y: 61.230468750000014 },
        { x: 27.734375, y: 34.43359375 },
        { x: 27.734375, y: 34.43359375 },
        { move: { x: 27.734375, y: 34.43359375 } },
        { x: 30.546875, y: 65.68359375000001 },
        { x: 39.453125, y: 65.68359375000001 },
        { x: 40.078125, y: 72.77343750000001 },
        { x: 50, y: 75.42968750000001 },
        { x: 50, y: 84.68750000000001 },
        { x: 31.796875000000004, y: 79.60937500000001 },
    ]} fill={"#ebebeb"} color={"#ebebeb"} closed={true} stroke={0}/>
    const FiveRightHalf = props => <Shape path={[
        { x: 72.1875, y: 34.43359375 },
        { x: 49.9609375, y: 34.43359375 },
        { x: 49.9609375, y: 43.30078125 },
        { x: 71.3671875, y: 43.30078125 },
        { x: 72.1875, y: 34.43359375 },
        { move: { x: 70.56640624999999, y: 52.38281250000001 }},
        { x: 49.9609375, y: 52.38281250000001 },
        { x: 49.9609375, y: 61.25000000000001 },
        { x: 60.8984375, y: 61.25000000000001 },
        { x: 59.86328125, y: 72.7734375 },
        { x: 49.9609375, y: 75.42968750000001 },
        { x: 49.9609375, y: 84.6484375 },
        { x: 68.125, y: 79.609375 },
    ]} fill={"#fff"} color={'#fff'} stroke={0} />
    const Five = props => <Group>
        <FiveLeftHalf />
        <FiveRightHalf />
    </Group>
    const Shield = props => <Group>
        <ShieldColor />
        <RightShield />
    </Group>
    
    useEffect(() => {
        if(id === 5 && index === 1){
            // ref.current.scale = 0.1;
        }
    }, [id,index])

    // useRender(() => {
    //     ref.current.rotate.y += 0.01;
    // })
    
    return <Anchor {...props } ref={ref} viewBox="0 0 512 512">
            <HTML />
            <Shield />
            {/* <RightShield /> */}
            <Five />
        </Anchor>;
}

export default HTMLIcon;