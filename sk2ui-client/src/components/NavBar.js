import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.defaultKey,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ current: e.key });
  }

  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="search">
          <Icon type="file-search" />
          Search
        </Menu.Item>
        <Menu.Item key="add">
          <Icon type="plus" />
          Add
        </Menu.Item>
        <Menu.Item key="try">
          <Icon type="edit" />
          Try
        </Menu.Item>
      </Menu>
    );
  }
}

NavBar.defaultProps = {
  defaultKey: 'search',
};

NavBar.propTypes = {
  defaultKey: PropTypes.string,
};
