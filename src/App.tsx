import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

import routes from "@/router/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route: any) => {
            return <Route {...route} key={route.key} />;
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
