import React, { Component } from 'react';
import { Switch, Box } from 'gestalt';
import './App.css';
import 'gestalt/dist/gestalt.css';
import SyncInfoField from './components/SyncInfoField';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ switched: !this.state.switched });
  }

  render () {
    const { switched } = this.state;
    return (
      <div className="App">
        <Box direction="column" display="block" color="green" paddingY={4}>
          <Box
            column={12}
            paddingY={2}
            display="flex"
            justifyContent="center"
          >
            <Switch
              onChange={this.handleChange}
              id="syncNotification"
              switched={switched}
            />
          </Box>
          <SyncInfoField isSynced={switched} info={"testing...."} />
        </Box>
      </div>
    );
  }
}

export default App;
