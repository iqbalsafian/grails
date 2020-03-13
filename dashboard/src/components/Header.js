import React from 'react';
import { Header as SHeader, Menu } from 'semantic-ui-react';
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Classes, Button } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div align="center">
      <Navbar className="bp3-dark">
        <NavbarGroup align="left">
          <NavbarHeading>Grails</NavbarHeading>
          <NavbarDivider />
        </NavbarGroup>
        <NavbarGroup align='center'>
          <Button className={Classes.MINIMAL} text="">
            <NavLink to="/">Submission Form</NavLink>
          </Button>
          <Button className={Classes.MINIMAL} text="">
            <NavLink to="/results">Scan Lists</NavLink>
          </Button>
        </NavbarGroup>
      </Navbar>
    </div>
  )
}