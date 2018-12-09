import React from 'react';
import { Box, Image, Text } from 'gestalt';
import PropTypes from 'prop-types';

export default function ResultDisplay(props) {
  const { isResult, src } = props;
  return (
    <Box column={6} paddingY={12} color="lightGray" shape="rounded" alignItems="center" alignContent="center" alignSelf="center">
      <Box column={12} width={400} height={400} display="flex" flex="grow" alignItems="center">
        <Image alt="sample" naturalHeight={1} naturalWidth={1} fit="contain" src={isResult ? src : 'https://via.placeholder.com/400.png'} />
      </Box>
      <Box column={12}>
        <Text size="lg" align="center" bold color="gray">
          {isResult ? 'Result from our network.' : 'please send out your sketch.'}
        </Text>
      </Box>
    </Box>
  );
}

ResultDisplay.propTypes = {
  isResult: PropTypes.bool,
  src: PropTypes.string,
};

ResultDisplay.defaultProps = {
  isResult: false,
  src: 'https://via.placeholder.com/400.png',
};
