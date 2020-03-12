import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card, Button, Table } from 'semantic-ui-react';
import axios from 'axios';

export default function ListOfFindings() {
  const { id } = useParams();
  const [listObject, setListObject] = useState('');

  const getListById = async () => {
    await axios.get(`http://localhost:3001/${id}`)
      .then(response => {
        setListObject(response.data)
      })
      .catch(err => {
        console.log('error')
      })
    console.log(listObject)
  }

  useEffect(()=>{
    getListById();
  }, [id])

  return (
    <div style={{textAlign:'center', width:'90%', margin:'auto'}}>
      {
        listObject && listObject.map((list) => {
          return (
            <div key={list.id} >
              <Card style={{margin: 'auto'}}>
                <Card.Content>
                  <Card.Header>
                    { list.repository_name }
                  </Card.Header>
                  <Card.Meta>
                    { list.status }
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      No
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Rule Id
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Description
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Severity
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Path Name
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    list.findings.findings.map((finding, id)=>{
                      return (
                        <Table.Row key={id}>
                          <Table.Cell>
                            {id + 1}
                          </Table.Cell>
                          <Table.Cell>
                            {finding.ruleId}
                          </Table.Cell>
                          <Table.Cell>
                            {finding.metadata.description}
                          </Table.Cell>
                          <Table.Cell>
                            {finding.metadata.severity}
                          </Table.Cell>
                          <Table.Cell>
                            {finding.location.path}
                          </Table.Cell>
                        </Table.Row>
                      )
                    })
                  }
                </Table.Body>
              </Table>
            </div>
          )
        })
      }
      
      
    </div>
  )
}