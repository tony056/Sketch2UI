import React from 'react';
import { Box, IconButton } from 'gestalt';
import 'gestalt/dist/gestalt.css';

function NavBar() {
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
      top={true}>
      <IconButton accessibilityLabel="Undo" icon="arrow-back" bgColor="transparent" iconColor="white" size="md" />
      <IconButton accessibilityLabel="Redo" icon="arrow-forward" bgColor="transparent" iconColor="white" size="md" />
      <IconButton accessibilityLabel="Clear" icon="cancel" bgColor="transparent" iconColor="white" size="md" />
      <IconButton accessibilityLabel="Save" icon="send" bgColor="transparent" iconColor="white" size="md" />
    </Box>
  );
}

export default NavBar;
