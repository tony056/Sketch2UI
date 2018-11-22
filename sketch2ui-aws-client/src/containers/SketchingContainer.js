import React from 'react';
import NavBar from './NavBar';
import Canvas from '../components/Canvas';

export default class SketchingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cleanCanvas = this.cleanCanvas.bind(this);
    this.undoCanvas = this.undoCanvas.bind(this);
    this.redoCanvas = this.redoCanvas.bind(this);
    this.saveCanvas = this.saveCanvas.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.savePath = this.savePath.bind(this);
    this.state = {
      currPoints: [],
      redoPoints: [],
      paths: [],
      canvas: null,
      isPainting: false,
    };
  }

  cleanCanvas() {
    this.setState({
      currPoints: [],
      redoPoints: [],
      paths: [],
    });
  }

  undoCanvas() {
    const { paths, redoPoints } = this.state;
    if (paths.length === 0) return;
    const buffer = paths.pop();
    redoPoints.push(buffer);
    this.setState({ paths, redoPoints });
  }

  redoCanvas() {
    const { redoPoints, paths } = this.state;
    if (!redoPoints || redoPoints.length === 0) return;
    paths.push(redoPoints.pop());
    this.setState({ paths, redoPoints });
  }

  saveCanvas() {
    console.log('save');
    // const { canvas } = this.state;
    // const data = canvas.toDataURL('image/jpeg');
    // TODO:
  }

  addPoint(point) {
    const { currPoints } = this.state;
    currPoints.push(point);
    this.setState({ currPoints, isPainting: true });
  }

  savePath() {
    const { currPoints, paths } = this.state;
    if (!currPoints) return;
    paths.push(currPoints);
    this.setState({ currPoints: [], paths, isPainting: false });
  }

  render() {
    const { paths, currPoints, isPainting } = this.state;
    const totalPaths = paths.slice();
    if (currPoints.length > 0) {
      if (isPainting) {
        totalPaths.push(currPoints);
      }
    }
    return (
      <div>
        <NavBar
          onUndoClick={this.undoCanvas}
          onRedoClick={this.redoCanvas}
          onCleanClick={this.cleanCanvas}
          onSaveClick={this.saveCanvas}
        />
        <Canvas addPoint={this.addPoint} points={totalPaths} stop={this.savePath} />
      </div>
    );
  }
}
