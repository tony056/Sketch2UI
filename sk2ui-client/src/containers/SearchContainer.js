import React from 'react';
import { Empty } from 'antd';
import DataTable from '../components/DataTable';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4],
    };
  }

  render() {
    const { data } = this.state;
    return (
      data.length > 0 ? <DataTable /> : <Empty />
    );
  }
}
