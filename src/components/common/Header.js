import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, FormControl, FormGroup, ControlLabel, Modal, Button} from 'react-bootstrap';
// NavItem has some sort of bug. prevents default action wth?? Edited it out here
import NavItem from './NavItem/NavItem';

export class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      username: '',
      password: ''
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.login = this.login.bind(this);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.isLoggedIn();
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  login(event) {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => {
      response.json().then(body => {
        if (body.username) {
          console.log('User found: ')
          console.log(body);
          this.props.setUser(body);
          this.close();
        } else {
          console.log('No user logged in');
          this.props.setUser(null);
        }
      });
    })

    event.preventDefault();
  }

  isLoggedIn() {
    fetch('http://localhost:3001/isLoggedIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response.json().then(body => {
        if (body.username) {
          console.log('User found: ')
          console.log(body);
          this.props.setUser(body);
        } else {
          console.log('No user logged in');
          this.props.setUser(null);
        }
      });
    });
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render () {

    const { user } = this.props;


    const { username, password } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">HOME</a>
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
                { user ? user.username : `Log In` }
              </NavItem>
              { user ?
                <NavItem
                  eventKey={5}>
                  Log Out
                </NavItem> :
                ''
              }
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
                  value={username}
                  onChange={this.onUsernameChange}
                  placeholder="username"
                  />
                <FormControl
                  value={password}
                  onChange={this.onPasswordChange}
                  placeholder="password"
                  />
              </FormGroup>
              <Button
                type="submit"
                onClick={this.login}
                >
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