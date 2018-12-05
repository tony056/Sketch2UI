import React from 'react';
import { Box, Text } from 'gestalt';


export default function SyncInfoField({ isSynced, info }) {
  const placeholder = 'Switch on to sync hand sketch to your Figma file.';
  return (
    <Box direction="row" alignSelf="center">
      <Text align="center">{isSynced ? info : placeholder}</Text>
    </Box>
  );
};
