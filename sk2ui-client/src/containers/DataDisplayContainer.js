import React from 'react';
import PropTypes from 'prop-types';
import { Row, Card } from 'antd';
import ImageViewer from '../components/ImageViewer';
import ClassDataDisplayer from '../components/ClassDataDisplayer';
import { getImageSourcesPerData, getRicoLabels } from '../api/data-parser';

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

export default function DataDisplayContainer({ data }) {
  const imageSources = getImageSourcesPerData(data);
  const labels = getRicoLabels(data);
  return (
    <div>
      <Row><ImageViewer source={imageSources} /></Row>
      <Row>
        <Card hoverable={false}>
          <Card.Grid style={gridStyle}>
            <ClassDataDisplayer labels={labels} />
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <ClassDataDisplayer labels={[]} />
          </Card.Grid>
        </Card>
      </Row>
    </div>
  );
}

DataDisplayContainer.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape()).isRequired,
};
