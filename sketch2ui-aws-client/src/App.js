import React from 'react';
import { Container } from 'gestalt';
import './App.css';
import SketchingContainer from './containers/SketchingContainer';

function App() {
  const styles = {
    overflow: 'hidden',
  };
  return (
    <Container className="App" style={styles}>
      <SketchingContainer />
    </Container>
  );
}

export default App;
