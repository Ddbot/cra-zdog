// import ReactDOM from 'react-dom'
import { useRef, useState, useEffect } from 'react'
import { Cone } from 'react-zdog'
import usePrevious from '../../hooks/usePrevious';
import gsap, { CSSPlugin } from 'gsap';
import { motion } from "framer-motion"

gsap.registerPlugin(CSSPlugin);

let MotionCone = motion(Cone);

let Acone = (props) => {
    const [index, setIndex ] = useState(props.index);
    const ref = useRef(undefined);

    const previous = usePrevious(index);

    const getColors = (id) => {
        let res;
        switch(id){
            case 1:
            case 7: 
                res = [{
                    color: '#f7df1e',
                    backface: '#C25',
                }, {
                    color: '#f7df1e',
                    backface: '#C25',
                }, {
                    color: '#f7df1e',
                    backface: '#C25',
                }]
                break;
            case 10:
                res = [{
                    color: 'transparent',
                    backface: 'transparent'
                },{
                    color: 'transparent',
                    backface: 'transparent'
                },{
                    color: '#636',
                    backface: '#636'
                }]
                break;
            case 8:              
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
                case 23:
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
                break;
            default:
                break;
        }
        return res;
    }

    function getScale(id){
        let res;
        switch(id){
            case 2:
                res = [{
                    scale: 1
                },{
                    scale: 1
                },{
                    scale: 1
                }]
            case 23: 
                res = [{
                    scale: 9
                },{
                    scale: 9
                },{
                    scale: 9
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

    useEffect(() => {
        gsap.fromTo(ref.current, {
            duration: 3,
            color: getColors(props.id)[previous || 0].color
        }, {
            color: getColors(props.id)[index].color

        })
    },[index]);

    return <MotionCone
        {...props}
        // {...getColors(props.id)[props.index]}
        {...getScale(props.id)[props.index]}
        ref={ref}
    />
};

export default Acone;