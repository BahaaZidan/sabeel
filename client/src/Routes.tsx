import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ListsHome from './ListsHome';
import Login from './Login';
import Join from './Join';
import Profile from './Profile';
import ListDetails from './ListDetails';
import AddItemToList from './AddItemToList';
import AddList from './AddList';

interface GetRouteFunc {
  (id: string): string;
}

interface RouteGetter {
  definition: string,
  key: string,
  getRoute: GetRouteFunc,
}

export const HOME_ROUTE: RouteGetter = {
  definition: '/',
  key: 'homeRoute',
  getRoute: () => '/',
};
export const ABOUT_ROUTE: RouteGetter = {
  definition: '/about',
  key: 'aboutRoute',
  getRoute: () => '/about',
};
export const LOGIN_ROUTE: RouteGetter = {
  definition: '/login',
  key: 'loginRoute',
  getRoute: () => '/login',
};
export const JOIN_ROUTE: RouteGetter = {
  definition: '/join',
  key: 'joinRoute',
  getRoute: () => '/join',
};
export const PROFILE_ROUTE: RouteGetter = {
  definition: '/profile',
  key: 'profileRoute',
  getRoute: () => '/profile',
};
export const SABEEL_ROUTE: RouteGetter = {
  definition: '/sabeel/:id',
  key: 'sabeelRoute',
  getRoute: (id: string): string => `/sabeel/${id}`,
};

export const detectRoute = () => {
  switch (window.location.pathname) {
    case HOME_ROUTE.definition:
      return ['home-route'];
    case ABOUT_ROUTE():
      return ['about-route'];
    case LOGIN_ROUTE():
      return ['login-route'];
    case JOIN_ROUTE():
      return ['join-route'];
    case PROFILE_ROUTE():
      return ['profile-route'];
    default:
      return [];
  }
};

const Routes = () => (
  <Switch>
    <Route path={HOME_ROUTE.definition} exact component={ListsHome} />
    <Route path={ABOUT_ROUTE()} exact component={() => <h1>about</h1>} />
    <Route path={LOGIN_ROUTE()} exact component={Login} />
    <Route path={JOIN_ROUTE()} exact component={Join} />
    <Route path={PROFILE_ROUTE()} exact component={Profile} />
    <Route path={LIST_ROUTE()} exact component={ListDetails} />
    <Route path={ADD_LIST_ROUTE()} exact component={AddList} />
    <Route path={ADD_ITEM_TO_LIST_ROUTE()} exact component={AddItemToList} />
  </Switch>
);

export default Routes;
