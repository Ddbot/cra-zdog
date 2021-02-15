import { useEffect, useRef, useState } from 'react';
import {
	AppBar,
	Button,
	Container,
	FormGroup,
	FormControlLabel,
	Grid,  
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Switch,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { withStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import TranslateIcon from '@material-ui/icons/Translate';
import { orange, lightBlue, deepPurple } from '@material-ui/core/colors';

import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import rosetta from 'rosetta';

// let theme = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: orange[500],
// 			type: 'light'
// 		},
// 		secondary: {
// 			main: lightBlue[500],
// 			type: 'dark'
// 		},
// 		// error: '#BA3B25',
// 		// warning: '#ee6622',
// 		// info: '#2A4F54',
// 		// success: '#40A140',
// 	}
// });
  
// theme = responsiveFontSizes(theme);

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.primary[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const MenuBar = styled(Toolbar)``;

const AppContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
`;

const InstallGrid = styled(List)`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const Div = styled(Typography)`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;
	// scale: 0.75;

	transform: translateX(30%);

	span.MuiSwitch-track,
	span.MuiSwitch-thumb	 {
		background: white !important;
	}

	span.MuiButtonBase-root.MuiIconButton-root {
		background: darkgray;
	}
`;

const ChangeLanguageIcon = styled(IconButton)`
	// scale: 0.75;
	position: absolute;
	right: 0;

	font-size: 40px;
`;

const ChangeThemeSwitch = ({changeFn, checked}) => {			
	return <AnimatePresence>
		<FormGroup>
      		<Div component="div">
        		<Grid component="div" container alignItems="center" spacing={1}>		
					<Grid item>
						<IconButton
							aria-label="sun icon"
							aria-controls="menu-appbar"
							aria-haspopup="false"
							// onClick={handleMenu}
							color="inherit"
							style={{ paddingRight: 0 }}>
								{checked === true ? <motion.div
									initial={{opacity: 0, x: 10, scale: 0 }}
									animate={{ opacity: 1, x: 0, scale: 1 }}
									exit={{ opacity: 0, x: 10 }}
									style={{ display: 'flex', alignItems: 'center'}}>
									<Brightness7Icon />
								</motion.div> : <motion.div
									initial={{opacity: 1, x: 0}}
									animate={{ opacity: 0, x: 25 }}
									exit={{ opacity: 1, x: 0 }}>
									<Brightness7Icon />
								</motion.div>}
						</IconButton>						
					</Grid>	
					<Grid item>
						<AntSwitch checked={checked} name="checked" onChange={changeFn} />
					</Grid>				
					<Grid item>
						{checked === false ? <motion.div
							initial={{ opacity: 0, x: -10, scale: 0}}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							exit={{ opacity: 0, x: -10 }}
							transition={{ ease: "easeOut", duration: .195 }}>
							<IconButton
								aria-label="moon icon"
								aria-controls="menu-appbar"
								aria-haspopup="false"
								color="inherit"
								style={{ paddingLeft: 0 }}>	
								<Brightness2Icon />								
							</IconButton>						
						</motion.div> : <motion.div
							initial={{ opacity: 1, x: 0 }}
							animate={{ opacity: 0, x: -25  }}
							exit={{ opacity: 1, x: 0 }}
							transition={{ ease: "easeOut", duration: .195 }}>
							<IconButton
								aria-label="moon icon"
								aria-controls="menu-appbar"
								aria-haspopup="false"
								color="inherit">	
								<Brightness2Icon />								
							</IconButton>						
						</motion.div>}	
					</Grid>
			</Grid>
			</Div>
		</FormGroup>
	</AnimatePresence>						
}


function App() {
	const [anchorEl, setAnchorEl] = useState(null);

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

	function handleClick(e) {
		e.persist();
		setAnchorEl(e.currentTarget);
	}

	function handleClose(e) {
		e.persist();
		setAnchorEl(null);
	}

	const handleChange = (event) => {
		// setState({ ...state, [event.target.name]: event.target.checkedTheme });
		setState(prev => { 
			return { ...state, checkedTheme: !prev.checkedTheme }
		});
	};
	
	// useEffect(() => {
	// 	console.log('Changement de state: ', state);
	// 	theme.palette.type = !!state.checkedTheme ? 'dark' : 'light'
	// }, [state.checkedTheme]);

	return (<ThemeProvider theme={ state.checkedTheme ? darkTheme : lightTheme }>
    	<AppBar position='static'>
      		<MenuBar>
				<IconButton edge="start" color="inherit" aria-label="menu" onClick={ handleClick }>
          			<MenuIcon />
				</IconButton>
				<Menu
					// id="simple-menu"
					anchorEl={anchorEl}
					// keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
				<Typography variant="h6">Andry Online</Typography>
				<ChangeThemeSwitch checked={state.checkedTheme} changeFn={handleChange}/>
				<ChangeLanguageIcon
					aria-label="change language button"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					// onClick={handleChange}
					color="inherit">
					<TranslateIcon />
				</ChangeLanguageIcon>				
  			</MenuBar>
    	</AppBar>
        <InstallGrid component="ol">
			<ListItem><ListItemText>Install Material UI</ListItemText></ListItem>
			<ListItem><ListItemText>Import AppBar and replace header from CRA</ListItemText></ListItem>
			<ListItem><ListItemText>Import Syled Component</ListItemText></ListItem>
        </InstallGrid>
  </ThemeProvider>
  );
}

export default App;
