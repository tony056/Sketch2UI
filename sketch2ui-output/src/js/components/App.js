import React, { Component } from 'react';
import { Switch, Box } from 'gestalt';
import 'gestalt/dist/gestalt.css';
// import SyncInfoField from './components/SyncInfoField';
import { connectToServer, listenToData, disconnect } from '../api/connection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleChange() {
    const { switched } = this.state;
    if (!switched) {
      connectToServer();
      listenToData(this.handleData);
    } else {
      disconnect();
    }
    this.setState({ switched: !this.state.switched });
  }

  handleData(data) {
    console.log(`new data: ${JSON.stringify(data)}`);
  }

  render () {
    const { switched } = this.state;
    return (
      <div className="App">
        <Box width={360} height={100} direction="column" display="block" color="green" paddingY={4}>
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
        </Box>
      </div>
    );
  }
}

export default App;
