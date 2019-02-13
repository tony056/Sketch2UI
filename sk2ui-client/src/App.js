import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import AddPage from './pages/AddPage';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={SearchPage} />
      <Route exact path="/add" component={AddPage} />
    </Switch>
  );
}
