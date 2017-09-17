import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, FormControl, FormGroup, ControlLabel, Modal, Button} from 'react-bootstrap';
// NavItem has some sort of bug. prevents default action wth?? Edited it out here
import NavItem from './NavItem/NavItem';

export class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render () {

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Library App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/books">Books</NavItem>
              <NavItem eventKey={2} href="/authors">Authors</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem
                eventKey={4}
                onClick={this.open}>
                Log In
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          bsSize="small"
          >
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Login form</ControlLabel>
                <FormControl
                  placeholder="username"
                  />
                <FormControl
                  placeholder="password"
                  />
              </FormGroup>
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Header;