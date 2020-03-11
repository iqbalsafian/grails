import React from 'react';
import { Form, Segment, Input, Select, Button } from 'semantic-ui-react';

export default function SubmissionForm() {
  const status = [
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
        <Form loading={false}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              required
              label="Repo Name"
              placeholder="Repo Name"
            />
            <Form.Field 
              control={Select}
              required
              label="Status"
              options={status}
              placeholder="Status"
            />
          </Form.Group>
          <Form.TextArea required label="Findings" placeholder="You can type or copy-paste your JSONB here" />
          <Form.Group widths="equal">
            <Form.Field 
              control={Input}
              required
              label="Queued At"
              placeholder="Queued At"
            />
            <Form.Field 
              control={Input}
              required
              label="Scanned At"
              placeholder="Scanned At"
            />
            <Form.Field 
              control={Input}
              required
              label="Finished At"
              placeholder="Finished At"
            />
          </Form.Group>
          <Form.Field 
            id="form-button-control-public"
            control={Button}
            content="Submit"
          />
        </Form>
      </Segment>
    </div>
  )
}