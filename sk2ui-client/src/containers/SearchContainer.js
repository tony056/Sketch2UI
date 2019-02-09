import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import DataTable from '../components/DataTable';

export default function SearchContainer({ data }) {
  return (
    data.length > 0 ? <DataTable data={data} /> : <Empty />
  );
}

SearchContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
