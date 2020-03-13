import React, { useState } from 'react';
import { Form, Segment, Select, Button } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import { DatePicker, message } from 'antd';
import { Header } from 'semantic-ui-react';

export default function SubmissionForm() {
  const [repositoryName, setRepositoryName] = useState('');
  const [status, setStatus] = useState('Queued');
  const [findings, setFindings] = useState('');
  const [queuedAt, setQueuedAt] = useState(moment(new Date(), 'DD-MM-YYYY HH:mm'));
  const [scannedAt, setScannedAt] = useState(moment(new Date(), 'DD-MM-YYYY HH:mm'));
  const [finishedAt, setFinishedAt] = useState(moment(new Date(), 'DD-MM-YYYY HH:mm'));
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const submitForm = async () => {
    setLoading(true);

    if (repositoryName === '')
      setValidationError('Repository name cannot be empty.\n');
    
    if (!isValidJSONString(findings))
      setValidationError(validationError + 'The findings is not in valid JSON format.\n');

    if (queuedAt === '')
      setValidationError(validationError + 'The queued at field cannot be empty\n');

    if (validationError.length === 0) {
      await axios.post('http://localhost:3001', {
        repository_name: repositoryName,
        status,
        findings,
        queued_at: queuedAt,
        scanned_at: scannedAt,
        finished_at: finishedAt
      })
      .then(response=>{
        message.success(response.data);
        setRepositoryName('');
        setStatus('Queued');
        setFindings('');
        setQueuedAt(moment(new Date(), 'DD-MM-YYYY HH:mm'));
        setScannedAt(moment(new Date(), 'DD-MM-YYYY HH:mm'));
        setFinishedAt(moment(new Date(), 'DD-MM-YYYY HH:mm'));
      })
      .catch(err=>{
        message.error('There has been an error connecting to database');
      })
    } else {
      message.error('Please fill in the required fields');
    }
    setLoading(false);
  }

  const isValidJSONString = (str) => {
    if (str === '')
      return false;

    try {
      JSON.parse(str);
    } catch (e) {
      return false
    }

    return true;
  }

  const selectStatus = [
    { 
      key: 'Queued', value: 'Queued', text: 'Queued'
    },
    {
      key: 'In Progress', value: 'In Progress', text: 'In Progress'
    },
    {
      key: 'Success', value: 'Success', text: 'Success'
    },
    {
      key: 'Failure', value: 'Failure', text: 'Failure'
    }
  ]
  return(
    <div>
      <Header as="h2" style={{textAlign: 'center', margin: 'auto', padding: '10px 0'}}>Submission Form</Header>
      <Segment style={{ align:'center', margin: 'auto'}}>
        <Form loading={loading}>
          <Form.Group widths="equal">
            <Form.Input
              required
              label="Repo Name"
              placeholder="Repo Name"
              value={repositoryName}
              onChange={(_, {value}) => setRepositoryName(value)}
            />
            <Form.Field 
              control={Select}
              required
              label="Status"
              options={selectStatus}
              placeholder="Status"
              value={status}
              onChange={(_, {value}) => setStatus(value)}
            />
          </Form.Group>
          
          <Form.Group widths="equal">
            <Form.Field>
              <Form.TextArea 
                required 
                label="Findings" 
                placeholder="You can type or copy-paste your JSONB here" 
                value={findings}
                onChange={(_,{value}) => setFindings(value)}
                style={{minHeight: 150}}
              />
            </Form.Field>
            <Form.Field>
              <Form.Group>
                <Form.Field style={{textAlign:'center'}}>
                  <div style={{width:'100%', textAlign:'center'}}>
                    Queued At
                  </div>
                  <DatePicker
                    value={queuedAt}
                    onChange={(value, _) => setQueuedAt(value)} 
                    showTime
                  />
                </Form.Field>
                <Form.Field style={{textAlign:'center'}}>
                  <div style={{width:'100%', textAlign:'center'}}>
                    Scanned At
                  </div>
                  <DatePicker
                    value={scannedAt}
                    onChange={(value, _) => setScannedAt(value)} 
                    showTime
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field style={{textAlign:'center'}}>
                  <div style={{width:'100%', textAlign:'center'}}>
                    Finished At
                  </div>
                  <DatePicker
                    value={finishedAt}
                    onChange={(value, valueString) => setFinishedAt(value)} 
                    showTime
                  />
                </Form.Field>
              </Form.Group>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            
          </Form.Group>
          <div style={{width: '100%', textAlign:"center"}}>
            <Button primary onClick={submitForm}>Submit</Button>
          </div>
        </Form>
      </Segment>
    </div>
  )
}