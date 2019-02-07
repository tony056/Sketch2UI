import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const handleSearch = (value) => {
  console.log(value);
  // fetch('/api/search', {
  //   method: 'POST',
  //   headers: 'application/json',
  //   body: JSON.stringify({ value }),
  // });
};

export default function SearchBar() {
  return (
    <Search
      placeholder="input file number"
      onSearch={handleSearch}
      style={{ width: '30%' }}
    />
  );
}
