/* global document */
import React from 'react';
import {
  Container, Box, Modal, Spinner,
} from 'gestalt';
import { Auth } from 'aws-amplify';
import NavBar from './NavBar';
import Canvas from '../components/Canvas';
// import TaskDisplay from '../components/TaskDisplay';
import ResultDisplay from '../components/ResultDisplay';
import { uploadImageByDataURI } from '../libs/demo-api';
// import s3Upload from '../libs/aws-lib';

export default class SketchingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.cleanCanvas = this.cleanCanvas.bind(this);
    this.undoCanvas = this.undoCanvas.bind(this);
    this.redoCanvas = this.redoCanvas.bind(this);
    this.saveCanvas = this.saveCanvas.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.savePath = this.savePath.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    // this.updateItemCount = this.updateItemCount.bind(this);
    this.state = {
      currPoints: [],
      redoPoints: [],
      paths: [],
      canvas: null,
      isPainting: false,
      isAuthenticated: false,
      isLoading: false,
      resultSrc: null,
      // currentTask: 'Icon',
      // currentNumber: 0,
      // targetNumbers: {
      //   Icon: 80,
      //   'Pager-indicator': 20,
      //   Slider: 20,
      // },
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setState({ isAuthenticated: true });
    } catch (e) {
      if (e !== 'No current user') {
        console.log(e);
      }
      this.setState({ isAuthenticated: false });
    }
    // const { currentTask } = this.state;
    // this.updateItemCount(currentTask);
  }

  redoCanvas() {
    const { redoPoints, paths } = this.state;
    if (!redoPoints || redoPoints.length === 0) return;
    paths.push(redoPoints.pop());
    this.setState({ paths, redoPoints });
  }

  async saveCanvas() {
    // console.log('save');
    const { canvas } = this.state;
    const data = canvas ? canvas.toDataURL('image/jpeg') : document.getElementById('canvas').toDataURL('image/jpeg');
    // const dataBlob = dataURItoBlob(data);
    this.setState({ isLoading: true });
    // uploadImage(dataBlob, (resData) => {
    //   console.log(resData);
    //   this.setState({ isLoading: false });
    // });
    uploadImageByDataURI(data, (resData) => {
      const dataURI = `data:image/png;base64,${resData.imageURI}`;
      this.setState({ isLoading: false, resultSrc: dataURI });
    });
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

  async handleAuthentication(email, password) {
    try {
      await Auth.signIn(email, password);
      this.setState({ isAuthenticated: true });
    } catch (e) {
      console.log(e.message);
    }
  }

  handleItemChange(value) {
    this.updateItemCount(value);
  }

  // async updateItemCount(task) {
  //   const { count } = await API.get('notes', `/notes/${task.toLowerCase()}`);
  //   this.setState({ currentTask: task, currentNumber: count });
  // }

  undoCanvas() {
    const { paths, redoPoints } = this.state;
    if (paths.length === 0) return;
    const buffer = paths.pop();
    redoPoints.push(buffer);
    this.setState({ paths, redoPoints });
  }

  cleanCanvas() {
    this.setState({
      currPoints: [],
      redoPoints: [],
      paths: [],
    });
  }

  render() {
    const {
      paths,
      currPoints,
      isPainting,
      isAuthenticated,
      isLoading,
      resultSrc,
    } = this.state;
    const totalPaths = paths.slice();
    if (currPoints.length > 0) {
      if (isPainting) {
        totalPaths.push(currPoints);
      }
    }
    return (
      <Container overflow="scroll">
        <Box>
          <NavBar
            onUndoClick={this.undoCanvas}
            onRedoClick={this.redoCanvas}
            onCleanClick={this.cleanCanvas}
            onSaveClick={this.saveCanvas}
            isAuthenticated={isAuthenticated}
            handleAuthentication={this.handleAuthentication}
            handleItemChange={this.handleItemChange}
          />
        </Box>
        <Box column={12} display="flex" alignItems="center" justifyContent="around" color="darkGray">
          <ResultDisplay isResult={resultSrc !== null} src={resultSrc} />
          <Canvas addPoint={this.addPoint} points={totalPaths} stop={this.savePath} />
        </Box>
        {isLoading && (
          <Modal
            accessibilityCloseLabel="close"
            accessibilityModalLabel="Uploading the image"
            heading="Uploading"
            size="sm"
          >
            <Spinner show accessibilityLabel="Uploading" />
          </Modal>
        )}
      </Container>
    );
  }
}
