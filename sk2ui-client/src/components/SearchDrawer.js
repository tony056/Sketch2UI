import React from 'react';
import { Drawer, Skeleton } from 'antd';
import PropTypes from 'prop-types';

export default class SearchDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.type = null;
  }

  render() {
    const { visible, onClose, children } = this.props;
    return (
      <Drawer
        width={640}
        placement="left"
        closable={false}
        visible={visible}
        onClose={onClose}
      >
        {children}
      </Drawer>
    );
  }
}

SearchDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};

SearchDrawer.defaultProps = {
  children: (<Skeleton />),
};
