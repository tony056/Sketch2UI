import React from 'react';
import { Table } from 'antd';

// const { Column, ColumnGroup } = Table;
const fcolumns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];


export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount() {
    // get columns
    this.setState({ columns: fcolumns });
  }

  render() {
    const { columns } = this.state;
    return (
      <Table dataSource={[]} columns={columns} />
    );
  }
}
