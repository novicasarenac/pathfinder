import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '../containers/Main';
import ProfileAnalysisRequest from '../containers/ProfileAnalysisRequest';
import ProfileAnalysisResult from '../containers/ProfileAnalysisResult';
import Explorer from '../containers/Explorer';

const routes = (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/analysis-request" component={ProfileAnalysisRequest} />
    <Route path="/analysis-result" component={ProfileAnalysisResult} />
    <Route path="/explore" component={Explorer} />
    <Redirect exact to="/" />
  </Switch>
);

export default routes;
