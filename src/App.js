import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	AppBar,
	Card,
	CardMedia,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import TranslateIcon from '@material-ui/icons/Translate';
import { orange, deepPurple } from '@material-ui/core/colors';

import styled from 'styled-components';

import { gsap, ScrollTrigger, ScrollToPlugin } from "gsap/all";

import SvgBG from './components/SvgBG';
import CTA from './components/CTA';

// import Zdog from 'zdog';

import './App.css';

import usePrevious from './hooks/usePrevious';

// don't forget to register plugins
gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

import { i18n } from './translations/AppPageInterface';

import ChangeThemeSwitch from './components/ChangeThemeSwitch';

import Illo from './components/zdog/Illo';

import DownArrow from './components/DownArrow';
import DirectionalButtons from './components/DirectionalButtons';


import img from './assets/tabbied.png';
import Marseille from './assets/Marseille';

// set default language
i18n.locale('fr');

const IFrame = styled.iframe`
	z-index: 1000;
`;

const NotreDameDeLaGardeSketchup = (props) => {	
	return <IFrame src="https://3dwarehouse.sketchup.com/embed/uabf9279b-9672-4e20-93b5-7a96ab82944b" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="580" height="326" allowfullscreen />
}

const TAU = Math.PI * 2;

const MenuBar = styled(Toolbar)``;

const Text = styled(ListItemText)`
			grid-column: 1 / span 3;
			grid-row: 1 / span 3;

			display: flex;
			justify-content: center;
			align-items: center;

			// height: calc(100vh*2/3);

			// z-index: 2;
			
			transition: all linear .125s;
			
			span {
				font-size: 1.618rem;
				text-align: center;
		}
`;

const Li = styled(ListItem)`
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: 0px 0px;

	// margin-bottom: 10vh;

	@media screen and (min-width: 568px){
		div.illustration {
			height: 80vh;
			width: 50vw;
			border: solid 1px gray;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: width linear .125s, height linear .125s;
		}
		div:not(.illustration) {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80vh;
			width: 50vw;
			border: solid 1px black;
			transition: width linear .125s, height linear .125s;
		}
	}
`;

const InstallGrid = styled(List)`
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	height: 100vh;
	// z-index: 2;
`;

const ChangeLanguageIcon = styled(IconButton)`
	position: absolute;
	right: 0;

	font-size: 40px;
`;

function App() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [langAnchorEl, setLangAnchorEl] = useState(null);
	const [currentLi, setCurrentLi] = useState(0);
	const [tl, setTl] = useState(gsap.timeline({ paused: true, }))

	const [state, setState] = useState({
		checkedTheme: false,
	});

	// state temporaire pour faire bouger Zdog
	const [move, setMove] = useState('stop');

	const arrowRef = useRef(null);
	const olRef = useRef(null);
	const illuRef = useRef(null);

	const previousLi = usePrevious(currentLi);

	let lightTheme = createMuiTheme({
		palette: {
			primary: {
				main: orange[500],
			},
			type: 'light',
		}		
	});
	
	let darkTheme = createMuiTheme({
		palette: {
			primary: {
				main: deepPurple[900],
			},
			type: 'dark',
		}		
	});
	
	darkTheme = responsiveFontSizes(darkTheme);
	lightTheme = responsiveFontSizes(lightTheme);

	function handleClose(e) {
		e.persist();
		const { currentTarget } = e;
	
		i18n.locale(currentTarget.dataset.lang);
		setAnchorEl(null);
		setLangAnchorEl(null);
	}

	function handleClick(e) {
		e.persist();
		const { currentTarget, target } = e;
		console.log(currentTarget, target)

		switch (currentTarget.id) { 
			case 'appMenu':
				setAnchorEl(currentTarget);
				break;
			case 'lang':
				setLangAnchorEl(currentTarget)
				break;
			default:
				break;
		};
	}

	const handleChange = (event) => {
		setState(prev => { 
			return { ...state, checkedTheme: !prev.checkedTheme }
		});
	};

	function scrollToFn(e) {
		let nbOfLis = olRef.current.querySelectorAll('li').length;
		if(currentLi+1 < nbOfLis){
			gsap.to(window, {
				duration: 1.4, 
				scrollTo: `#li${currentLi+1}`,
				onStart: () => {
					setCurrentLi(prev => prev+1);
				},
				ease: "elastic.out(1, 0.75)"			
			})
		} else {
			gsap.to(window, {
				duration: 1.4, 
				scrollTo: '#li0',
				onStart: () => {
					setCurrentLi(0);
					gsap.to(arrowRef.current, {
						rotate: '0deg',
						duration: 1.4,
						ease: "power4.out"			
					});
				}, 
			})
		}
	}

	const handleMove = (payload) => {
		setMove(payload);
	};

	// ScrollTrigger
	useEffect(() => {
		const { body } = document;
		let lis = Array.from(olRef.current.querySelectorAll('li'));
		if(lis) gsap.set(lis, { autoAlpha: 0 });

		lis.forEach(li => {
			setTl(prev => {
				return prev.to(li, {
					scrollTrigger: li,
					autoAlpha: .5,
					duration: 2 
				});
			});
		});
		tl.play();
		if(olRef.current) console.log(olRef.current.scrollHeight, window.scrollY);
	}, []);

	// // Rotate Arrow button upwards if arrived at last slide
	useEffect(() => {
		let nbOfLis = olRef.current.querySelectorAll('li').length;
		if (currentLi === nbOfLis-1) {
				gsap.to(arrowRef.current, {
					rotate: '180deg',
					duration: 1,
					ease: "elastic.out(1, 0.75)"			
				});
			}	
		return () => {}	
	},[currentLi]);

	useEffect(() => {
		let svg = illuRef.current.querySelector('svg');		
		gsap.set(svg, { 
			attr: { 
				viewBox: '0 0 100 145.5' 
			},
			display: 'none'
		});
	});

	return (
		<ThemeProvider theme={state.checkedTheme ? darkTheme : lightTheme}>
			<AppBar position='fixed' style={{ zIndex: 100, transition: 'all linear .125s' }}>
				<MenuBar>
					<IconButton id="appMenu" edge="start" color="inherit" aria-label="menu" onClick={ handleClick }>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">Andry Online</Typography>
					<ChangeThemeSwitch checked={state.checkedTheme} changeFn={handleChange}/>
					<ChangeLanguageIcon
						id="lang"						
						aria-label="change language button"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleClick}
						color="inherit"
						edge="start" color="inherit" aria-label="menu">
						<TranslateIcon />
					</ChangeLanguageIcon>	
					<Menu
						anchorEl={langAnchorEl}
						keepMounted
						open={Boolean(langAnchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={handleClose} data-lang="en">English</MenuItem>
						<MenuItem onClick={handleClose} data-lang="fr">Francais</MenuItem>
					</Menu>	
				</MenuBar>
			</AppBar>
			{/* <SvgBG index={ currentLi }/> */}
			<Illo id='illo' ref={illuRef} index={currentLi} move={move} />
			<Marseille />
			{/* <NotreDameDeLaGardeSketchup /> */}
			<InstallGrid component="ol" ref={olRef}>
				{Object.values(i18n.t('intro')).map((v,i) => {
					return <Li id={`li${i}`} key={i}>
						<Text>{v}</Text>
						<CTA index={currentLi} />
					</Li>
				})}
			</InstallGrid>
			<DownArrow ref={arrowRef} onClick={ scrollToFn } />
			{/* <DirectionalButtons ref={arrowRef} move={handleMove}/> */}
		</ThemeProvider>);
}

export default App;
