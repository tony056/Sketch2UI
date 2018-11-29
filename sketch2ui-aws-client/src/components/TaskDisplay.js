import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Image, Text,
} from 'gestalt';
import { getExampleImageSrc } from '../libs/utils';

export default function TaskDisplay(props) {
  const {
    isDebugging, number, targetNumber, task,
  } = props;
  const src = getExampleImageSrc(task, number, targetNumber);
  return (
    <Box column={6} paddingY={12} color="lightGray" shape="rounded" alignItems="center" alignContent="center" alignSelf="center">
      <Box column={12} width={400} height={400} display="flex" flex="grow" alignItems="center">
        <Image alt="sample" naturalHeight={1} naturalWidth={1} fit="contain" src={isDebugging ? 'https://i.imgur.com/KfmVGZt.png' : src} />
      </Box>
      <Box column={12}>
        <Text size="lg" align="center" bold color="gray">
          Completed:
          {number}
          /
          {targetNumber}
        </Text>
      </Box>
    </Box>
  );
}

TaskDisplay.propTypes = {
  task: PropTypes.string,
  isDebugging: PropTypes.bool,
  targetNumber: PropTypes.number,
  number: PropTypes.number,
};

TaskDisplay.defaultProps = {
  task: 'Icon',
  isDebugging: false,
  targetNumber: 100,
  number: 0,
};
