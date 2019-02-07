import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

export default function DataCard() {
  const displayDetail = () => {
    // props.dataToDrawer(data)
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="data" src="https://via.placeholder.com/240x150.png" />}
      onClick={displayDetail}
    >
      <Meta
        title="Image: placeholder"
        description="placed holder"
      />
    </Card>
  );
}
