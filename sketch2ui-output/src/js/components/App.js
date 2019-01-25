import React, { Component } from 'react';
import { Switch, Box } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import TextInfo from './TextInfo';
import { connectToServer, listenToData, disconnect } from '../api/connection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switched: false,
      frames: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleChange() {
    const { switched } = this.state;
    if (!switched) {
      connectToServer();
      listenToData(this.handleData);
      // this.handleData(null);
    } else {
      disconnect();
    }
    this.setState({ switched: !this.state.switched });
  }

  handleData(data) {
    console.log(`new data: ${JSON.stringify(data)}`);
    const { frames } = this.state;
    frames.push(data);
    this.setState({ frames }, () => {
      this.props.sendToContentScript(data);
    });
  }

  render () {
    const { switched, frames } = this.state;
    const num = frames.length;
    return (
      <div className="App">
        <Box width={90} height={160} direction="column" display="block" color="green" paddingY={4}>
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
          <TextInfo isListening={switched} num={num} />
        </Box>
      </div>
    );
  }
}

export default App;
