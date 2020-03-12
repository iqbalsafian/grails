import React, { useState } from 'react';
import { Form, Segment, Input, Select, Button, Header } from 'semantic-ui-react';
import CustomDateTimeInput from './CustomDateTimeInput';
import axios from 'axios';
import moment from 'moment';
import { DatePicker } from 'antd';

export default function SubmissionForm() {
  const [repositoryName, setRepositoryName] = useState('');
  const [status, setStatus] = useState('');
  const [findings, setFindings] = useState('');
  const [queuedAt, setQueuedAt] = useState(moment(new Date(), 'DD-MM-YYYY HH:mm'));
  const [scannedAt, setScannedAt] = useState(moment(new Date(), 'DD-MM-YYYY HH:mm'));
  const [finishedAt, setFinishedAt] = useState(moment(new Date(), 'DD-MM-YYYY HH:mm'));
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    setLoading(true);
    console.log(queuedAt);
    await axios.post('http://localhost:3001', {
      repository_name: repositoryName,
      status,
      findings,
      queued_at: queuedAt,
      scanned_at: scannedAt,
      finished_at: finishedAt
    })
    .then(response=>{
      console.log(response);
    })
    .catch(err=>{
      console.log(err);
    })
    setLoading(false);
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
      <Segment >
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
          <Form.TextArea 
            required 
            label="Findings" 
            placeholder="You can type or copy-paste your JSONB here" 
            value={findings}
            onChange={(_,{value}) => setFindings(value)}
          />
          <Form.Group widths="equal">
            <Form.Field style={{textAlign:'center'}}>
              <div style={{width:'100%', textAlign:'center'}}>
                Queued At
              </div>
              <DatePicker
                value={queuedAt}
                onChange={(value, valueString) => setQueuedAt(value)} 
                showTime
              />
            </Form.Field>
            <Form.Field style={{textAlign:'center'}}>
              <div style={{width:'100%', textAlign:'center'}}>
                Scanned At
              </div>
              <DatePicker
                value={scannedAt}
                onChange={(value, valueString) => setScannedAt(value)} 
                showTime
              />
            </Form.Field>
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
          <div style={{width: '100%', textAlign:"center"}}>
            <Button primary onClick={submitForm}>Submit</Button>
          </div>
        </Form>
      </Segment>
    </div>
  )
}