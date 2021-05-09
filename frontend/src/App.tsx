import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Page from './components/Page';
import Browse from './components/Browse';
import Manage from './components/Manage';
import Sponsor from './components/Sponsor';
import About from './components/About';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Page>
        <Switch>
          <Route path="/">
            <About></About>
          </Route>
          <Route path="/browse">
            <Browse></Browse>
          </Route>
          <Route path="/manage">
            <Manage></Manage>
          </Route>
          <Route path="/sponsor">
            <Sponsor></Sponsor>
          </Route>
        </Switch>
      </Page>
    </BrowserRouter>
  );
}

export default App;
