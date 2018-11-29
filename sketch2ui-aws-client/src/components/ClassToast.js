import React, { Component } from 'react';
import { SegmentedControl, Box } from 'gestalt';
import PropTypes from 'prop-types';
import 'gestalt/dist/gestalt.css';

class ClassToast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIndex: 0,
    };
  }

  render() {
    const items = ['Icon', 'Pager-indicator', 'Slider'];
    const { itemIndex } = this.state;
    const { handleItemChange } = this.props;
    return (
      <Box column={6}>
        <SegmentedControl
          items={items}
          selectedItemIndex={itemIndex}
          onChange={({ activeIndex }) => {
            this.setState({ itemIndex: activeIndex });
            handleItemChange(items[activeIndex]);
          }}
        />
      </Box>
    );
  }
}

ClassToast.propTypes = {
  handleItemChange: PropTypes.func,
};

ClassToast.defaultProps = {
  handleItemChange: () => {},
};

export default ClassToast;
