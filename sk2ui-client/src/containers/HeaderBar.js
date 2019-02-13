import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';

const { Header } = Layout;

export default function HeaderBar({ defaultKey }) {
  return (
    <Header>
      <div className="logo" />
      <NavBar defaultKey={defaultKey} />
    </Header>
  );
}

HeaderBar.defaultProps = {
  defaultKey: '',
};

HeaderBar.propTypes = {
  defaultKey: PropTypes.string,
};
