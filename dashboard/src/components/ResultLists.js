import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Label, Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

export default function ResultLists() {
  const [allLists, setAllLists] = useState([]);

  const getLists = async () => {
    await axios.get('http://localhost:3001')
      .then(response=>{
        setAllLists(response.data)
      })
    // console.log(allLists)
  }

  useEffect(()=>{
    getLists();
  }, []);


  return (
    <div style={{width:'90%', margin: 'auto'}}>
      Result Lists
      <Button onClick={getLists}>Get</Button>
      <Table celled color="grey">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>No</Table.HeaderCell>
            <Table.HeaderCell>Repo Name</Table.HeaderCell>
            <Table.HeaderCell>Scan Status</Table.HeaderCell>
            <Table.HeaderCell>Findings</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            allLists.map((list, index)=>{
              return (
                <Table.Row key={list.id}>
                  <Table.Cell textAlign="right">{index+1}</Table.Cell>
                  <Table.Cell>
                    <Link to={{pathname: `/results/${list.id}`}}>{list.repository_name}</Link>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{list.status}</Table.Cell>
                  <Table.Cell style={{textAlign:'center'}}>
                    <Label as="a" color="blue">
                      Total: 
                      <Label.Detail>
                        {
                          list.findings.findings.length
                        }  
                      </Label.Detail>
                    </Label>
                    <Label color="red">
                      High
                      <Label.Detail>
                        {
                          list.findings.findings.filter(finding => finding.metadata.severity === 'HIGH').length
                        }
                      </Label.Detail>
                    </Label>
                    <Label color="green">
                      Others
                      <Label.Detail>
                        {
                          list.findings.findings.filter(finding => finding.metadata.severity !== 'HIGH').length
                        }
                      </Label.Detail>
                    </Label>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      (list.status === 'Finished') ? moment.unix(list.finished_at).format() : ((list.status === 'Scanned') ? moment.unix(list.scanned_at).format('DD-MM-YYYY HH:mm') : moment.unix(list.queued_at).format('DD-MM-YYYY HH:mm'))
                    }
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
          
        </Table.Body>
      </Table>
    </div>
  )
}