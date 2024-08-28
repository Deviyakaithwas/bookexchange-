import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Login from './Login';
import Register from './Register';
import BookListing from './BookListing';
import BookDiscovery from './BookDiscovery';
import Matchmaking from './Matchmaking';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/book-listing" component={BookListing} />
          <Route path="/book-discovery" component={BookDiscovery} />
          <Route path="/matchmaking" component={Matchmaking} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;