import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card, Table, Breadcrumb, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { message } from 'antd';

export default function ListOfFindings() {
  const { id } = useParams();
  const [listObject, setListObject] = useState('');

  useEffect(()=>{
    const getListById = async () => {
      await axios.get(`http://localhost:3001/${id}`)
        .then(response => {
          setListObject(response.data)
        })
        .catch(err => {
          message.error(err)
        })
    }
    getListById();
  }, [setListObject, id])

  return (
    <div style={{textAlign:'center', margin:'auto', paddingTop: '15px'}}>
      {
        listObject && listObject.map((list) => {
          return (
            <div key={list.id} style={{textAlign:'left'}}>
              <Breadcrumb style={{paddingBottom: '15px'}}>
                <Breadcrumb.Section>
                  <Link to='/results'>Back to Scan Lists</Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>
                  {list.id}
                </Breadcrumb.Section>
              </Breadcrumb>
              <Header as="h2" style={{textAlign: 'center', margin: 'auto', padding: '10px 0'}}>Scan Details</Header>
              <Card style={{margin: 'auto'}}>
                <Card.Content style={{textAlign: 'center'}}>
                  <Card.Header>
                    { list.repository_name }
                  </Card.Header>
                  <Card.Meta>
                    { list.status }
                  </Card.Meta>
                </Card.Content>
              </Card>
              <Table celled>
                <Table.Header style={{textAlign:'center'}}>
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
                          <Table.Cell style={{textAlign:'right'}}>
                            {id + 1}
                          </Table.Cell>
                          <Table.Cell style={{textAlign: 'center'}}>
                            {finding.ruleId}
                          </Table.Cell>
                          <Table.Cell>
                            {finding.metadata.description}
                          </Table.Cell>
                          <Table.Cell style={{textAlign: 'center'}}>
                            {finding.metadata.severity}
                          </Table.Cell>
                          <Table.Cell>
                            {finding.location.path} : {finding.location.positions.begin.line}
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