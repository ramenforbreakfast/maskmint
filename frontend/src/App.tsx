import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Page from './components/Page';
import { Browse } from './components/Browse';
import Manage from './components/Manage';
import Sponsor from './components/Sponsor';
import About from './components/About';

import './App.css';

//<img src="https://hashmasksstore.blob.core.windows.net/hashmaskspreview/10142.png" style="max-width: 400px; width: 100%;">

function App() {

  const mockData = [
    { tokenSym: "WHA", tokenName: "WhaleCoin", maskName: "whale", maskID: 0 },
    { tokenSym: "TRMP", tokenName: "TrumpBucks", maskName: "Trump", maskID: 1 },
    { tokenSym: "PRC", tokenName: "RenMenBee", maskName: "china", maskID: 4 },
    { tokenSym: "NXLJ", tokenName: "LiaoJie", maskName: "Na Xie Liao Jie", maskID: 12459 },
    { tokenSym: "SGHY", tokenName: "Yuan", maskName: "Shan Gao Huangdi Yuan", maskID: 15960 }
  ]

  return (
    <BrowserRouter>
      <Page>
        <Switch>
          <Route exact path="/">
            <About></About>
          </Route>
          <Route path="/browse">
            <Browse masks={mockData}></Browse>
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
