import React, { Component } from 'react';
import { Box, Text } from 'gestalt';
import { graphql } from 'react-apollo';
import ListFrames from '../queries/ListFrames.js';
import NewFrameSub from '../subscriptions/NewFrameSubscription.js';

class SyncInfoField extends Component {
  constructor(props) {
    super(props);
    this.placeholder = 'Switch on to sync hand sketch to your Figma file.';
  }

  componentDidMount() {
    this.props.subsribeToNewFrames();
  }

  render() {
    const { isSynced, frames } = this.props;
    const num = frames.length;
    return (
      <Box direction="row" alignSelf="center">
        <Text align="center">{isSynced ? `we have ${num} frames in DB now.` : this.placeholder}</Text>
      </Box>
    );
  }
};

export default graphql(ListFrames, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    frames: props.data.listFrames ? props.data.listFrames.items : [],
    subsribeToNewFrames: params => {
      props.data.subscribeToMore({
        document: NewFrameSub,
        updateQuery: (prev, { subscriptionData: { data: { subscribeToNewFrame } } }) => {
          return {
            ...prev,
            listFrames: {
              __typename: 'FrameConnection',
              items: [subscribeToNewFrame, ...prev.listFrames.items.filter(frame => frame.frameId !== subscribeToNewFrame.frameId)]
            }
          }
        },
        onError: err => console.error(err)
      })
    },
  })
})(SyncInfoField);
