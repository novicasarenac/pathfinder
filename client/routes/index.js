import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../containers/Main';
import GithubProfileAnalysis from '../containers/GithubProfileAnalysis';

const routes = (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/github-profile-analysis" component={GithubProfileAnalysis} />
  </Switch>
);

export default routes;
