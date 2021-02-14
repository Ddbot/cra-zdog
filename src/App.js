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
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
  return (<AppContainer max-width>
    <AppBar position='static'>
      <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6">
    Menu
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
    </AppBar>
        <InstallGrid component="ol">
          <ListItem><ListItemText>Install Material UI</ListItemText></ListItem>
          <ListItem><ListItemText>Import AppBar and replace header from CRA</ListItemText></ListItem>
          <ListItem><ListItemText>Import Syled Component</ListItemText></ListItem>
        </InstallGrid>
  </AppContainer>
  );
}

export default App;
