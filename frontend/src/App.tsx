import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Page from './components/Page';
import { Browse } from './components/Browse';
import Manage from './components/Manage';
import Sponsor from './components/Sponsor';
import About from './components/About';
import { Web3Provider } from "./context/web3";
import './App.css';

//<img src="https://hashmasksstore.blob.core.windows.net/hashmaskspreview/10142.png" style="max-width: 400px; width: 100%;">

function App() {

  return (
    <BrowserRouter>
      <Web3Provider>
        <Page>
          <Switch>
            <Route exact path="/">
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
      </Web3Provider>
    </BrowserRouter>
  );
}

export default App;
