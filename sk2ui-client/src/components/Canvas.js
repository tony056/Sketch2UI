/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

function getTouchPointOnCanvas(touch) {
  const { clientX, clientY, target } = touch;
  const rect = target.getBoundingClientRect();
  const { left, top } = rect;
  return {
    offsetX: clientX - left,
    offsetY: clientY - top,
  };
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.currentBuff = [];
    this.undoBuff = [];
    this.state = {
      sourceURL: null,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onTouchDown = this.onTouchDown.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.recreateBG = this.recreateBG.bind(this);
    this.redrawAll = this.redrawAll.bind(this);
    this.isPainting = false;
    this.userStrokeStyle = '#000000';
    this.prevData = { offsetX: 0, offsetY: 0 };
    this.targetElement = null;
    this.redo = this.redo.bind(this);
    this.undo = this.undo.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.saveCanvasTo = this.saveCanvasTo.bind(this);
    this.sourceOnLoaded = this.sourceOnLoaded.bind(this);
  }

  componentDidMount() {
    const { width, height } = this.props;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 3;
    this.line = [];
    this.recreateBG();
    this.targetElement = document.getElementById('canvas');
    disableBodyScroll(this.targetElement);
  }


  componentDidUpdate() {
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  onTouchDown({ touches }) {
    if (touches.length > 1) return;
    const pos = getTouchPointOnCanvas(touches[0]);
    this.pointerDown(pos);
  }

  onTouchMove({ touches }) {
    if (touches.length > 1) return;
    if (!this.isPainting) return;
    const newPos = getTouchPointOnCanvas(touches[0]);
    this.pointerMove(newPos);
  }

  onMouseMove({ nativeEvent }) {
    if (!this.isPainting) return;
    const { offsetX, offsetY } = nativeEvent;
    this.pointerMove({ offsetX, offsetY });
  }

  onPointerUp() {
    if (!this.isPainting) return;
    this.isPainting = false;
    // save to currentBuff with img/
    const tempSrc = this.canvas.toDataURL('image/png');
    this.currentBuff.push(tempSrc);
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.pointerDown({ offsetX, offsetY });
  }

  recreateBG() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  redrawAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.recreateBG();
    const { currentBuff } = this;
    if (currentBuff.length > 0) {
      this.setState({ sourceURL: currentBuff[currentBuff.length - 1] });
    } else {
      this.setState({ sourceURL: '' });
    }
  }

  pointerMove(curPosData) {
    this.paint(this.prevData, curPosData, this.userStrokeStyle);
  }

  pointerDown({ offsetX, offsetY }) {
    this.isPainting = true;
    this.prevData = { offsetX, offsetY };
  }

  paint(prevData, newPos, strokeStyle) {
    const { offsetX, offsetY } = newPos;
    const prevX = prevData.offsetX;
    const prevY = prevData.offsetY;
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(prevX, prevY);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevData = { offsetX, offsetY };
  }

  undo() {
    if (this.currentBuff.length === 0) return;
    const latest = this.currentBuff.pop();
    this.undoBuff.push(latest);
    // set current to the last in currentBuff
    this.redrawAll();
  }

  redo() {
    if (this.undoBuff.length === 0) return;
    const latest = this.undoBuff.pop();
    this.currentBuff.push(latest);
    // set current to the last in currentBuff
    this.redrawAll();
  }

  saveCanvasTo() {
    const current = this.canvas.toDataURL('image/png');
    this.clearCanvas();
    return current;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.recreateBG();
    this.undoBuff = [];
    this.currentBuff = [];
  }

  sourceOnLoaded() {
    this.ctx.drawImage(document.getElementById('hidden'), 0, 0);
  }

  render() {
    const { sourceURL } = this.state;
    const source = sourceURL !== null ? sourceURL : '';
    return (
      <div>
        <canvas
          id="canvas"
          ref={(ref) => { this.canvas = ref; }}
          style={{ background: 'white' }}
          onTouchStart={this.onTouchDown}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onPointerUp}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onPointerUp}
        />
        <img
          id="hidden"
          alt="hidden"
          src={source}
          ref={(ref) => { this.source = ref; }}
          style={{ display: 'none' }}
          onLoad={this.sourceOnLoaded}
        />
      </div>
    );
  }
}
export default Canvas;

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Canvas.defaultProps = {
  width: 200,
  height: 200,
};
