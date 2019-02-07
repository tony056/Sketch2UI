import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={SearchPage} />
    </Switch>
  );
}
