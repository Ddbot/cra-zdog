import { AppBar, Container, List, ListItem, ListItemText } from '@material-ui/core';
import logo from './logo.svg';
// import './App.css';

function App() {
  return (<Container max-width>
    <AppBar className="App App-header">
      Menu
    </AppBar>
    <Container>
      <List>
        <ListItem><ListItemText>Install Material UI</ListItemText></ListItem>
        <ListItem><ListItemText>Import AppBar and replace header from CRA</ListItemText></ListItem>
        <ListItem><ListItemText>Import AppBar and replace header from CRA</ListItemText></ListItem>
      </List>
    </Container>
  </Container>
  );
}

export default App;
