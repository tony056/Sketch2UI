import React from 'react';
import { Collapse } from 'antd';
import FilterForm from './FilterForm';

const { Panel } = Collapse;

export default class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: [],
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    const { activeKey } = this.state;
    if (!activeKey || activeKey.length === 0) {
      this.setState({ activeKey: ['1'] });
    } else {
      this.setState({ activeKey: [] });
    }
  }

  render() {
    const { activeKey } = this.state;
    return (
      <Collapse bordered={false} activeKey={activeKey} onChange={this.toggleOpen}>
        <Panel header="Search by filters" key="1">
          <FilterForm />
        </Panel>
      </Collapse>
    );
  }
}
