import React from 'react';
import { Layout, Card, Button } from 'antd';
import HeaderBar from '../containers/HeaderBar';
import SearchBar from '../components/SearchBar';
import SearchContainer from '../containers/SearchContainer';
import SearchDrawer from '../components/SearchDrawer';
import FilterForm from '../components/FilterForm';
import DataDisplayContainer from '../containers/DataDisplayContainer';

const { Content } = Layout;

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDrawerVisible: false,
      drawerDisplayFilter: false,
    };
    this.searchDrawerClosed = this.searchDrawerClosed.bind(this);
    this.searchDrawerOpened = this.searchDrawerOpened.bind(this);
    this.searchResultClicked = this.searchResultClicked.bind(this);
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

  render() {
    const { searchDrawerVisible, drawerDisplayFilter } = this.state;
    return (
      <Layout className="layout">
        <HeaderBar defaultKey="search" />
        <Content>
          <Card>
            <SearchBar />
            <Button block onClick={this.searchDrawerOpened}>Filters</Button>
          </Card>
          <SearchContainer />
          <SearchDrawer visible={searchDrawerVisible} onClose={this.searchDrawerClosed}>
            {drawerDisplayFilter ? <FilterForm /> : <DataDisplayContainer />}
          </SearchDrawer>
        </Content>
      </Layout>
    );
  }
}
