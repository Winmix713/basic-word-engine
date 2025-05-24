import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/home';
import EditorPage from '../pages/editor';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/editor" component={EditorPage} />
    </Switch>
  );
};

export default Routes;