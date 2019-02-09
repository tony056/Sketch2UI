import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

export default function SearchBar({ searchByValue }) {
  return (
    <Search
      placeholder="input file number"
      onSearch={value => searchByValue(value)}
      style={{ width: '30%' }}
    />
  );
}

SearchBar.propTypes = {
  searchByValue: PropTypes.func.isRequired,
};
