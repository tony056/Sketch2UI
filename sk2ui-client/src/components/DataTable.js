import React from 'react';
import { Table, Empty } from 'antd';
import PropTypes from 'prop-types';
import { getDataId } from '../api/data-parser';

const fcolumns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Ad',
  dataIndex: 'rico_ad_cnt',
  key: 'rico_ad',
}, {
  title: 'Web View',
  dataIndex: 'rico_web_view_cnt',
  key: 'rico_web_view',
}];


export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
    this.rowInteractions = this.rowInteractions.bind(this);
  }

  componentDidMount() {
    // get columns
    this.setState({ columns: fcolumns });
    // this.getAllData();
  }

  rowInteractions(record, recordIndex) {
    const { onRowClick } = this.props;
    return {
      onClick: () => { onRowClick(record, recordIndex); },
      onDoubleClick: () => {}, // double click row
      onContextMenu: () => {}, // right button click row
      onMouseEnter: () => {}, // mouse enter row
      onMouseLeave: () => {}, // mouse leave row
    };
  }

  render() {
    const { columns } = this.state;
    const { data } = this.props;
    return (
      (data && data.length > 0)
        ? (
          <Table
            rowKey={row => getDataId(row)}
            dataSource={data}
            columns={columns}
            onRow={this.rowInteractions}
          />
        ) : <Empty />
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func.isRequired,
};
