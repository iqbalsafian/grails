import React from 'react';
import { Icon, Label, Menu, Table, Tab } from 'semantic-ui-react';

export default function ResultLists() {
  return (
    <div>
      Result Lists
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
          <Table.Row>
            <Table.Cell textAlign="right">1</Table.Cell>
            <Table.Cell>Repo</Table.Cell>
            <Table.Cell textAlign="center">Queued</Table.Cell>
            <Table.Cell>Find</Table.Cell>
            <Table.Cell textAlign="center">Today</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}