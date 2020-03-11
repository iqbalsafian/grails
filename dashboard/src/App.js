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
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div align="center">
        <Header h1 textAlign="center">GuardRails</Header>
      </div>
      
      <Switch>
        <Route path='/'>
          <SubmissionForm />
        </Route>
        <Route path='/results'>
          <ResultLists />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
