import React from 'react';
import { Box, Text } from 'gestalt';


export default function TextInfo({ isListening, num }) {
  const content = isListening ? `${num} frames has been interpreted.` : 'Switch on to connect to the server.';

  return (
    <Box direction="row" alignSelf="center">
      <Text align="center">{content}</Text>
    </Box>
  );
}
