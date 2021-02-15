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
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import TranslateIcon from '@material-ui/icons/Translate';
import styled from 'styled-components';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
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

const MenuBar = styled(Toolbar)`
	// button:nth-of-type(2) {
	// 	position: absolute;	
	// 	right: 0;
	// }
`;

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
	scale: 0.75;

	transform: translateX(30%);
`;

const ChangeLanguageIcon = styled(IconButton)`
	scale: 0.75;
	position: absolute;
	right: 0;

	font-size: 40px;
`;

const ChangeThemeSwitch = (props) => {
	return <FormGroup>
      <Div component="div">
        <Grid component="label" container alignItems="center" spacing={1}>		
			<Grid item>
				<IconButton
					aria-label="sun icon"
					aria-controls="menu-appbar"
					aria-haspopup="false"
					// onClick={handleMenu}
					color="inherit"
					style={ props.checked ? {opacity: 1 } : { opacity: 0 }}>
					<Brightness7Icon />
				</IconButton>
			</Grid>	
			<Grid item>
					<AntSwitch checked={props.checked} name="checked" onChange={ props.changeFn} />
			</Grid>
			<Grid item>	
				<IconButton
					aria-label="moon icon"
					aria-controls="menu-appbar"
					aria-haspopup="false"
					// onClick={handleMenu}
					color="inherit"
					style={ !props.checked ? {opacity: 1 } : { opacity: 0}}>					
					<Brightness2Icon />
				</IconButton>			
			</Grid>
        </Grid>
      </Div>
	</FormGroup>
}


function App() {
	const [anchorEl, setAnchorEl] = useState(null);

	const [state, setState] = useState({
		checkedTheme: true,
	});

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
	
	useEffect(() => { 
		console.log('Changement de state: ', state)
	})

	return (<>
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
  </>
  );
}

export default App;
