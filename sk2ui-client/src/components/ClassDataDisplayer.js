import React from 'react';
import { Collapse, Empty, Tag } from 'antd';
import PropTypes from 'prop-types';

const { Panel } = Collapse;

// const text = (
//   <p style={{ paddingLeft: 24 }}>
//     A dog is a type of domesticated animal.
//     Known for its loyalty and faithfulness,
//     it can be found as a welcome guest in many households across the world.
//   </p>
// );

const displayBboxs = bboxes => bboxes.map(bbox => <Tag>{bbox.join(', ')}</Tag>);

export default function ClassDataDisplayer({ labels }) {
  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      {labels && labels.length > 0
        ? labels.map(label => (
          <Panel header={label[0]} key={label[0]}>
            {displayBboxs(label[1])}
          </Panel>
        ))
        : <Empty />}
    </Collapse>
  );
}

ClassDataDisplayer.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.array),
};

ClassDataDisplayer.defaultProps = {
  labels: [],
};
