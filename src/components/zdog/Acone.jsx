// import ReactDOM from 'react-dom'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Cone } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { useTheme } from '@material-ui/core/styles';
import { useZdog } from 'react-zdog';

import { acone } from './coordinates';

gsap.registerPlugin(CSSPlugin);

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    const [tl, setTl ] = useState(gsap.timeline({ paused: true }));
    const ref = useRef(undefined);
    const theme = useTheme();

    const current = props.index;
	const previous = usePrevious(props.index);

    const coords = useMemo(() => acone);

    const [coordinates, setCoordinates] = useState(coords[0]);

    const { illu, scene, size } = useZdog();

    function getColors(id){
        let res;
        switch(id){
            case 1:
            case 7: 
                res = [{
                    color: '#EEAA00',
                    backface: '#C25',
                }, {
                    color: '#EEAA00',
                    backface: '#C25',
                }, {
                    color: '#EEAA00',
                    backface: '#C25',
                }]
                break;
            case 10:
                res = [{
                    color: '#e62',
                    backface: '#C25'
                },{
                    color: '#e62',
                    backface: '#C25'
                },{
                    color: '#e62',
                    backface: '#C25'
                }]
                break;
                case 16:  
                res = [{
                    color: '#636',
                    backface: '#e62'
                },{
                    color: '#636',
                    backface: '#e62'
                },{
                    color: '#636',
                    backface: '#e62'
                }]
            case 8:              
            case 23:
                res = [{
                    color: '#C25',
                    backface: '#e62'
                },{
                    color: '#C25',
                    backface: '#e62'
                },{
                    color: '#C25',
                    backface: '#e62'
                }]
                break;
            default:
                break;
        }

        return res;
    }

    function getScale(id){
        let res;
        switch(id){
            case 1:
            case 10:
            case 23: 
            case 16:
                res = [{
                    scale: 9
                },{
                    scale: 9
                },{
                    scale: 9
                }]
                break;
            case 10:
                res = [{
                    scale: 1
                },{
                    scale: 1
                },{
                    scale: 1
                }]
                break;
            default:
                res = [{
                    scale: 6
                },{
                    scale: 6
                },{
                    scale: 6
                }]
                break;
        }

        return res;
    }



    // Changer state index quand props.index change
    useEffect(() => {
        if(props.index !== index){
            setIndex(props.index);
        }
    }, [props.index]);

    // useEffect(() => {
    //     if(previous !== undefined){
    //         let rotateAnimation = gsap.to([
    //             ref.current.rotate, 
    //         ], {
    //             duration: 1,
    //             ...coords[current].rotate,
    //             ease: "power4.out",
    //         });

    //         let translateAnimation = gsap.to([
    //             ref.current.translate, 
    //         ], {
    //             duration: 3,
    //             ...coords[current].translate,
    //             ease: "elastic.out(1, 0.8)",
    //         });     
            
    //         let colorAnimation = gsap.to(ref.current, {
    //             duration: 1,
    //             color: theme.palette.type === 'light' ?  'rgba(102, 51, 102, 0.5)' : 'rgba(255, 0, 0, 0.5)',         
    //             backface: theme.palette.type === 'light' ?  'rgba(204, 34, 85, 0.5)' : 'rgba(255, 152, 0, 0.5)',                
    //         });

    //         setTl(prev => {
    //             prev && prev
    //             .add(translateAnimation)
    //             .add(rotateAnimation, '<')
    //             .add(colorAnimation, '<')
    //         })

    //         return () => tl;
    //     };
    // }, [current, previous]);

    // useEffect(() => {
    //     tl && tl.play();
    // }, [tl])

    return <Cone
        {...props}
        {...getColors(props.id)[props.index]}
        {...getScale(props.id)[props.index]}
        ref={ref}
    />
};

export default Acone;