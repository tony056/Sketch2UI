/* global document */
import React, { Component } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onTouchDown = this.onTouchDown.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.getTouchPointOnCanvas = this.getTouchPointOnCanvas.bind(this);
    this.isPainting = false;
    this.userStrokeStyle = '#EE92C2';
    this.prevData = { offsetX: 0, offsetY: 0 };
    this.targetElement = null;
  }

  componentDidMount() {
    this.canvas.width = 360;
    this.canvas.height = 640;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    this.line = [];
    this.targetElement = document.getElementById('canvas');
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  onTouchDown({ touches }) {
    if (touches.length > 1) return;
    const pos = this.getTouchPointOnCanvas(touches[0]);
    this.pointerDown(pos);
  }

  onTouchMove({ touches }) {
    if (touches.length > 1) return;
    if (!this.isPainting) return;
    const newPos = this.getTouchPointOnCanvas(touches[0]);
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
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.pointerDown({ offsetX, offsetY });
  }

  getTouchPointOnCanvas(touch) {
    const { pageX, pageY } = touch;
    const { offsetLeft, offsetTop } = this.targetElement;
    return {
      offsetX: pageX - offsetLeft,
      offsetY: pageY - offsetTop,
    };
  }

  pointerMove(curPosData) {
    const lineData = {
      start: { ...this.prevData },
      stop: { ...curPosData },
    };

    this.line = this.line.concat(lineData);
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

  render() {
    return (
      <canvas
        id="canvas"
        ref={(ref) => { this.canvas = ref; }}
        style={{ background: 'black' }}
        onTouchStart={this.onTouchDown}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onPointerUp}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onPointerUp}
      />
    );
  }
}
export default Canvas;
