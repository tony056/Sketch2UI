import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from 'gestalt';
import 'gestalt/dist/gestalt.css';

function NavBar({
  onUndoClick, onRedoClick, onCleanClick, onSaveClick,
}) {
  return (
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
