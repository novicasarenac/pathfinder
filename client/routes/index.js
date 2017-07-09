import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../containers/Main';
import ProfileAnalysisRequest from '../containers/ProfileAnalysisRequest';
import ProfileAnalysisResult from '../containers/ProfileAnalysisResult';

const routes = (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/github-profile-analysis" component={ProfileAnalysisRequest} />
    <Route path="/analysis" component={ProfileAnalysisResult} />
    <Redirect exact to="/" />
  </Switch>
);

export default routes;
