import { useContext, useEffect, useRef, useState } from 'react';
import {
	AppBar,
	Container,
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

import { gsap, ScrollTrigger } from "gsap/all";

// don't forget to register plugins
gsap.registerPlugin(ScrollTrigger);

import { i18n } from './translations/AppPageInterface';

import ChangeThemeSwitch from './components/ChangeThemeSwitch';

import Illo from './components/zdog/Illo';

import DownArrow from './components/DownArrow';

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

			z-index: 2;
			
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
`;

const ChangeLanguageIcon = styled(IconButton)`
	// scale: 0.75;
	position: absolute;
	right: 0;

	font-size: 40px;
`;

function App() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [langAnchorEl, setLangAnchorEl] = useState(null);

	const [state, setState] = useState({
		checkedTheme: false,
	});

	const [coords, setCoords] = useState({
		a : { 
		  diameter: 24,
		  length: 20.78,
		  translate: {
			x: 0,
			y: 0,
		  }, 
		  rotate: { x: TAU*90/360, y: 0, z: 0 },
		  scale: 1.4,
		  stroke: false,
		  color: '#636',
		  backface: '#C25',      
	  },
	  o: {
		diameter: 16.97,
		length: 16.97,
		translate: {
		  x: 3.95,
		  z: 10
		},
		rotate: { z: -TAU * 120/360 },
		scale: 0.8,
		// pour avoir un diamant de coté
		// rotate: { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360}
		stroke: false,
		color: '#EA0',
		frontFace: '#c25',
		backface: '#e62',  
	  },
	  l: {
		diameter: 2,
		length: 48,
		translate: {
		  x: 4,
		  y: -8
		},
		rotate: {  x: TAU * 90/360, y: -TAU * 45/360 },
		// ^pour avoir un diamant de coté
		// rotate: { x: TAU * 90/360, y: TAU * 45/360, z: -TAU * 120/360}
		stroke: true,
		color: '#e62',
		frontFace: '#c25',
		backface: '#e62',  
	  }
	});

	const zdogRef = useRef(null);
	const olRef = useRef(null);

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
		animateTest();

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

	const animateTest = (e) => {
		gsap.to('body', {
			opacity: 1,
			onUpdate: () =>{
				setCoords(prev => {
					return { ...prev, 
						a: {
							translate: {
								y: prev.a.translate.y + 0.1
							}
						}
					}
				})
			},
			duration: 1
		});
	}
	
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
			<Illo ref={zdogRef} coords={coords} />
			<InstallGrid component="ol" ref={olRef}>
				{Object.values(i18n.t('intro')).map((v,i) => {
					return <Li key={i+1}>
						<Text>{v}</Text>
					</Li>
				})}
			</InstallGrid>
			<DownArrow />
		</ThemeProvider>);
}

export default App;
