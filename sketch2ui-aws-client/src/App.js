import React from 'react';
import './App.css';
import SketchingContainer from './containers/SketchingContainer';

function App() {
  const styles = {
    overflow: 'hidden',
  };
  return (
    <div className="App" style={styles}>
      <SketchingContainer />
    </div>
  );
}

export default App;
