import React from 'react';
import { Row, Card } from 'antd';
import ImageViewer from '../components/ImageViewer';
import ClassDataDisplayer from '../components/ClassDataDisplayer';

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

export default function DataDisplayContainer() {
  return (
    <div>
      <Row><ImageViewer /></Row>
      <Row>
        <Card hoverable={false}>
          <Card.Grid style={gridStyle}>
            <ClassDataDisplayer />
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <ClassDataDisplayer />
          </Card.Grid>
        </Card>
      </Row>
    </div>
  );
}
