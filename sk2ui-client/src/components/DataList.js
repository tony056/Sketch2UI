import React from 'react';
import { List } from 'antd';
import DataCard from './DataCard';

export default class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4],
    };
  }

  render() {
    const { data } = this.state;
    return (
      <List
        grid={{
          gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
        }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <DataCard key={item} />
          </List.Item>
        )}
      />
    );
  }
}
