import React, { Component } from 'react';
import {
  Flyout, TextField, Button, Label, Text, Box,
} from 'gestalt';
import PropTypes from 'prop-types';

export default class LogInModal extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange({ value }) {
    this.setState({ email: value });
  }

  handlePasswordChange({ value }) {
    this.setState({ password: value });
  }

  handleSubmit() {
    const { handleAuthentication } = this.props;
    const { email, password } = this.state;
    handleAuthentication(email, password);
  }

  render() {
    const { onDismiss, anchor } = this.props;
    const { email, password } = this.state;
    return (
      <Flyout
        anchor={anchor}
        idealDirection="down"
        accessibilityCloseLabel="close"
        accessibilityModalLabel="Log in panel"
        heading="Log In"
        onDismiss={onDismiss}
        size="sm"
      >
        <Box padding={2}>
          <Box>
            <Box>
              <Label htmlFor="email">
                <Text>Email: </Text>
              </Label>
              <TextField
                id="email"
                onChange={this.handleEmailChange}
                placeholder="Email Address"
                value={email}
                type="email"
              />
            </Box>
          </Box>
          <Box>
            <Label htmlFor="password">
              <Text>Password: </Text>
            </Label>
            <TextField
              id="password"
              onChange={this.handlePasswordChange}
              placeholder="Password"
              value={password}
              type="password"
            />
          </Box>
          <Box display="flex" direction="row" paddingY={1}>
            <Button text="Cancel" onClick={onDismiss} />
            <Button text="Log In" color="red" onClick={this.handleSubmit} />
          </Box>
        </Box>
      </Flyout>
    );
  }
}

LogInModal.propTypes = {
  onDismiss: PropTypes.func,
  anchor: PropTypes.object,
  handleAuthentication: PropTypes.func,
};

LogInModal.defaultProps = {
  onDismiss: () => {},
  anchor: null,
  handleAuthentication: () => {},
};
