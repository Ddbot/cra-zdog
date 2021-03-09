import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
	AppBar,
	Card,
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

// set default language
i18n.locale('fr');

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
		// setState({ ...state, [event.target.name]: event.target.checkedTheme });
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

	// TO DO timeline
	useEffect(() => {
		let tl = gsap.timeline({
			// yes, we can add it to an entire timeline!
			scrollTrigger: {
				trigger: ".container",
				pin: true,   // pin the trigger element while active
				start: "top top", // when the top of the trigger hits the top of the viewport
				end: "+=500", // end after scrolling 500px beyond the start
				scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
				snap: {
					snapTo: "labels", // snap to the closest label in the timeline
					duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
					delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
					ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
				}
			}
		});
		
		// add animations and labels to the timeline
		tl.addLabel("start")
			.from(".box p", {scale: 0.3, rotation:45, autoAlpha: 0})
			.addLabel("color")
			.from(".box", {backgroundColor: "#28a92b"})
			.addLabel("spin")
			.to(".box", {rotation: 360})
			.addLabel("end");

		tl.play();
	}, []);

	// Rotate Arrow button upwards if arrived at last slide
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

	useRef(() => {
		console.log('illu ', illuRef.current)
	})

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
			<SvgBG index={ currentLi }/>
			<Illo id='illo' index={currentLi} move={move} />
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
