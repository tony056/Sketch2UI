import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import Canvas from './Canvas';

export default class DrawingBoard extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
  }

  undo() {
    if (!this.canvasRef.current) {
      console.error('ref error');
    } else {
      this.canvasRef.current.undo();
    }
  }

  redo() {
    if (!this.canvasRef.current) {
      console.error('ref error');
    } else {
      this.canvasRef.current.redo();
    }
  }

  clear() {
    if (!this.canvasRef.current) {
      console.error('ref error');
    } else {
      this.canvasRef.current.clearCanvas();
    }
  }

  submit() {
    const { save } = this.props;
    if (!this.canvasRef.current) {
      console.error('ref error');
    } else {
      const dataURL = this.canvasRef.current.saveCanvasTo();
      // use api to save dataURL to
      save(dataURL);
    }
  }


  render() {
    return (
      <div>
        <Row>
          <Col><Canvas ref={this.canvasRef} width={960} height={540} /></Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Button style={{ width: '100%' }} type="primary" icon="undo" onClick={this.undo} />
          </Col>
          <Col span={6}>
            <Button style={{ width: '100%' }} type="primary" icon="redo" onClick={this.redo} />
          </Col>
          <Col span={6}>
            <Button style={{ width: '100%' }} type="primary" icon="delete" onClick={this.clear} />
          </Col>
          <Col span={6}>
            <Button style={{ width: '100%' }} type="primary" icon="upload" onClick={this.submit} />
          </Col>
        </Row>
      </div>
    );
  }
}

DrawingBoard.propTypes = {
  save: PropTypes.func.isRequired,
};
