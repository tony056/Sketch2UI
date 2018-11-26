import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Button } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import ClassToast from '../components/ClassToast';
import LogInModal from '../components/LogInModal';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogInBtnToggle = this.handleLogInBtnToggle.bind(this);
    this.renderLogInByStatus = this.renderLogInByStatus.bind(this);
    this.renderLogInPanel = this.renderLogInPanel.bind(this);
    this.state = {
      isLogInOpen: false,
    };
  }

  handleLogInBtnToggle() {
    const { isLogInOpen } = this.state;
    this.setState({ isLogInOpen: !isLogInOpen });
  }

  renderLogInByStatus() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <div>
          <div ref={(c) => { this.anchor = c; }}>
            <Button text="Log In" size="sm" inline name="login" onClick={this.handleLogInBtnToggle} />
          </div>
          {this.renderLogInPanel()}
        </div>
      );
    }
    return null;
  }

  renderLogInPanel() {
    const { isLogInOpen } = this.state;
    const { handleAuthentication } = this.props;
    if (!isLogInOpen) return null;
    return (
      <LogInModal
        anchor={this.anchor}
        onDismiss={this.handleLogInBtnToggle}
        handleAuthentication={handleAuthentication}
      />
    );
  }

  render() {
    const {
      onUndoClick, onRedoClick, onCleanClick, onSaveClick, handleItemChange,
    } = this.props;
    return (
      <Box
        direction="row"
        color="red"
        alignContent="center"
        column={12}
        display="flex"
        flex="grow"
        height={55}
        paddingX={0}
        paddingY={2}
        top
      >
        <ClassToast handleItemChange={handleItemChange} />
        <IconButton onClick={onUndoClick} accessibilityLabel="Undo" icon="arrow-back" bgColor="transparent" iconColor="white" size="md" />
        <IconButton onClick={onRedoClick} accessibilityLabel="Redo" icon="arrow-forward" bgColor="transparent" iconColor="white" size="md" />
        <IconButton onClick={onCleanClick} accessibilityLabel="Clear" icon="cancel" bgColor="transparent" iconColor="white" size="md" />
        <IconButton onClick={onSaveClick} accessibilityLabel="Save" icon="send" bgColor="transparent" iconColor="white" size="md" />
        {this.renderLogInByStatus()}
      </Box>

    );
  }
}

NavBar.propTypes = {
  onUndoClick: PropTypes.func,
  onRedoClick: PropTypes.func,
  onCleanClick: PropTypes.func,
  onSaveClick: PropTypes.func,
  handleAuthentication: PropTypes.func,
  handleItemChange: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

NavBar.defaultProps = {
  onUndoClick: () => {},
  onRedoClick: () => {},
  onCleanClick: () => {},
  onSaveClick: () => {},
  handleAuthentication: () => {},
  handleItemChange: () => {},
  isAuthenticated: false,
};
