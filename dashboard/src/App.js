import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import ResultLists from './components/ResultLists';
import ListOfFindings from './components/ListOfFindings';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
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
