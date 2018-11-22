import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Container } from 'gestalt';
import 'gestalt/dist/gestalt.css';

function NavBar({
  onUndoClick, onRedoClick, onCleanClick, onSaveClick,
}) {
  return (
    <Container>
      <Box
        direction="row"
        color="red"
        alignContent="start"
        column={6}
        display="flex"
        flex="grow"
        height={55}
        padding={3}
        top
      >
        <IconButton onClick={onUndoClick} accessibilityLabel="Undo" icon="arrow-back" bgColor="transparent" iconColor="white" size="md" />
        <IconButton onClick={onRedoClick} accessibilityLabel="Redo" icon="arrow-forward" bgColor="transparent" iconColor="white" size="md" />
        <IconButton onClick={onCleanClick} accessibilityLabel="Clear" icon="cancel" bgColor="transparent" iconColor="white" size="md" />
        <IconButton onClick={onSaveClick} accessibilityLabel="Save" icon="send" bgColor="transparent" iconColor="white" size="md" />
      </Box>
    </Container>
  );
}

NavBar.propTypes = {
  onUndoClick: PropTypes.func,
  onRedoClick: PropTypes.func,
  onCleanClick: PropTypes.func,
  onSaveClick: PropTypes.func,
};

NavBar.defaultProps = {
  onUndoClick: () => {},
  onRedoClick: () => {},
  onCleanClick: () => {},
  onSaveClick: () => {},
};

export default NavBar;
