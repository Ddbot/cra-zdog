import { useState } from 'react';
import {
	AppBar,
	Button,
	Container,
	Grid,  
	IconButton,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';

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


function App() {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleClick(e) {
		e.persist();
		setAnchorEl(e.currentTarget);
	}

	function handleClose(e) {
		e.persist();
		setAnchorEl(null);
	}

	return (<>
    	<AppBar position='static'>
      		<Toolbar>
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
				          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit">
					<AccountCircle />
              </IconButton>
  			</Toolbar>
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
