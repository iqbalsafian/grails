import React from 'react';
import { Header as SHeader, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div align="center">
      <Menu>
        <Menu.Item>
          <SHeader as="h1" textAlign="center">GuardRails</SHeader>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Submission Form</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/results">Record List</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}