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
import { i18n } from './translations/AppPageInterface';

import ChangeThemeSwitch from './components/ChangeThemeSwitch';

import Illo from './components/zdog/Illo';

import DownArrow from './components/DownArrow';

import img from './assets/tabbied.png';

// set default language
i18n.locale('fr');

const MenuBar = styled(Toolbar)``;

const Illustration = styled(Illo)`	
		place-self: center;

		grid-column: ${ props => Number(props.position) % 2 !== 0 ? '2 / span 2' : '1 / span 2'};
		grid-row: ${ props => Number(props.position) % 2 !== 0 ? '2 / span 2' : '1 / span 2'};

		display: flex;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 100%;

		transition: width linear .125s, height linear .125s;

		z-index: 1;

		// img {
		// 	aspect-ratio: 2/3;
		// 	height: 100%;
		// }
`;

const Text = styled(ListItemText)`
			grid-column: ${ props => Number(props.position) % 2 === 0 ? '2 / span 2' : '1 / span 2'};
			grid-row: ${ props => Number(props.position) % 2 === 0 ? '2 / span 2' : '1 / span 2'};

			display: flex;
			justify-content: center;
			align-items: center;

			height: calc(100vh*2/3);

			padding-bottom: 20vh;
			
			z-index: 2;
			
			transition: all linear .125s;
			
			span {
				font-size: 1.618rem;
				text-align: center;

				align-self: ${ props => {
					switch (Number(props.position)) {
						case 1:
							return 'center'
							break;
						case 2:
							return 'flex-end'
							break;
						case 3:
							return 'center'
							break;
						default:
							break;
						}
				}
			}
		}
`;

const Li = styled(ListItem)`
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: 0px 0px;

	margin-bottom: 10vh;

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

	useEffect(() => { 
		console.table(Object.entries(i18n.t('intro')))
	}, []);
	
	return (
		<ThemeProvider theme={state.checkedTheme ? darkTheme : lightTheme}>
    		<AppBar position='fixed' style={{ zIndex: 100, transition: 'all linear .125s' }}>
      			<MenuBar>
				<IconButton id="appMenu" edge="start" color="inherit" aria-label="menu" onClick={ handleClick }>
          			<MenuIcon />
				</IconButton>
				{/* <Menu
					anchorEl={anchorEl}
					// keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
				</Menu> */}
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
        	<InstallGrid component="ol">
				{Object.values(i18n.t('intro')).map((v,i) => {
					return <Li key={i+1}>
						<Text position={i+1}>{v}</Text>
						<Illustration position={i+1} />
							{/* <img src={img} alt="tabbied" /> */}
						{/* </Illustration> */}
					</Li>
				}
			// <Li><div className='illustration'>Illustration</div><Text>{ i18n.t('intro.text') }</Text></Li>
			// <Li><Text>Autre texte</Text><div className='illustration'>Illustration</div></Li>
				)}
			</InstallGrid>
			<DownArrow />
		</ThemeProvider>
  );
}

export default App;
