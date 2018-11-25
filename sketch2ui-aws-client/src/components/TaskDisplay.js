import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Text } from 'gestalt';

export default function TaskDisplay(props) {
  const {
    src, isDebugging, number, targetNumber,
  } = props;
  return (
    <Box column={6}>
      <Image paddingY={0} alt="sample" naturalHeight={640} naturalWidth={360} src={isDebugging ? 'https://i.imgur.com/KfmVGZt.png' : src} />
      <Box>
        <Text size="lg" align="center" bold color="gray">
          {number}
          /
          {targetNumber}
        </Text>
      </Box>
    </Box>
  );
}

TaskDisplay.propTypes = {
  src: PropTypes.string,
  isDebugging: PropTypes.bool,
  targetNumber: PropTypes.number,
  number: PropTypes.number,
};

TaskDisplay.defaultProps = {
  src: '',
  isDebugging: true,
  targetNumber: 100,
  number: 0,
};
