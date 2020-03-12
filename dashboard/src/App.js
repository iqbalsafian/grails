import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import SubmissionForm from './components/SubmissionForm';
import ResultLists from './components/ResultLists';
import ListOfFindings from './components/ListOfFindings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div align="center">
        <Header as="h1" textAlign="center">GuardRails</Header>
        <Link to="/">/</Link>
        <Link to="/results">e</Link>
      </div>
      <Switch>
        <Route path='/results/:id' component={ListOfFindings} exact />
        <Route path='/results' component={ResultLists} exact />
        <Route path='/' component={SubmissionForm} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
