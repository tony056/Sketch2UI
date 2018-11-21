import React from 'react';
import './App.css';
import NavBar from './containers/NavBar';
import Canvas from './components/Canvas';

function App() {
  const styles = {
    overflow: 'hidden',
  };
  return (
    <div className="App" style={styles}>
      <NavBar />
      <Canvas id="canvas" />
    </div>
  );
}

export default App;
