import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from './components/Header';
import SubmissionForm from './components/SubmissionForm';
import ResultLists from './components/ResultLists';
import ListOfFindings from './components/ListOfFindings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{}}>
        <Container style={{backgroundColor: 'white', padding: '20px 20px'}}>
          <Header />
          <Switch>
            <Route path='/results/:id' component={ListOfFindings} exact />
            <Route path='/results' component={ResultLists} exact />
            <Route path='/' component={SubmissionForm} exact />
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
