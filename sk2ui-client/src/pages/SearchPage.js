import React from 'react';
import { Layout, Card, Button } from 'antd';
import HeaderBar from '../containers/HeaderBar';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import SearchDrawer from '../components/SearchDrawer';
import FilterForm from '../components/FilterForm';
import DataDisplayContainer from '../containers/DataDisplayContainer';
import { fetchByName, fetchAll } from '../api/data-fetch';

const { Content } = Layout;

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDrawerVisible: false,
      drawerDisplayFilter: false,
      data: [],
      seletedData: {},
    };
    this.searchDrawerClosed = this.searchDrawerClosed.bind(this);
    this.searchDrawerOpened = this.searchDrawerOpened.bind(this);
    this.searchResultClicked = this.searchResultClicked.bind(this);
    this.searchByValue = this.searchByValue.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  componentDidMount() {
    fetchAll((results) => {
      this.setState({ data: results });
    });
  }

  searchDrawerClosed() {
    this.setState({ searchDrawerVisible: false });
  }

  searchDrawerOpened() {
    this.setState({ searchDrawerVisible: true });
  }

  searchResultClicked() {
    // TODO: put data into the drawer
    this.setState({ searchDrawerVisible: true, drawerDisplayFilter: false });
  }

  searchByValue(value) {
    fetchByName(value, (result) => {
      this.setState({ data: result });
    });
  }

  selectRow(record) {
    this.setState({ seletedData: record, searchDrawerVisible: true, drawerDisplayFilter: false });
  }

  render() {
    const {
      searchDrawerVisible, drawerDisplayFilter, data, seletedData,
    } = this.state;
    return (
      <Layout className="layout">
        <HeaderBar defaultKey="search" />
        <Content>
          <Card>
            <SearchBar searchByValue={this.searchByValue} />
            <Button block onClick={this.searchDrawerOpened}>Filters</Button>
          </Card>
          <DataTable data={data} onRowClick={this.selectRow} />
          <SearchDrawer visible={searchDrawerVisible} onClose={this.searchDrawerClosed}>
            {drawerDisplayFilter ? <FilterForm /> : <DataDisplayContainer data={seletedData} />}
          </SearchDrawer>
        </Content>
      </Layout>
    );
  }
}
