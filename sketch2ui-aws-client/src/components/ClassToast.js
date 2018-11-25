import React, { Component } from 'react';
import { SegmentedControl, Box } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class ClassToast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIndex: 0,
    };
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange({ activeIndex }) {
    this.setState({ itemIndex: activeIndex });
  }

  render() {
    const items = ['Icon', 'Pager-indicator', 'Slider'];
    const { itemIndex } = this.state;
    return (
      <Box column={6} paddingX={2}>
        <SegmentedControl
          items={items}
          selectedItemIndex={itemIndex}
          onChange={this.handleItemChange}
        />
      </Box>
    );
  }
}

export default ClassToast;
