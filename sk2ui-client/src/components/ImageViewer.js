import React from 'react';
import {
  Card, Carousel, List, Radio, Row, Icon,
} from 'antd';

const data = [
  {
    alt: 'blue',
    url: 'https://via.placeholder.com/240x150/0000FF/808080?Text=Blue',
  },
  {
    alt: 'green',
    url: 'https://via.placeholder.com/240x150/00FF00/808080?Text=Green',
  },
  {
    alt: 'red',
    url: 'https://via.placeholder.com/240x150/FF0000/808080?Text=Red',
  },
];

export default class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompact: true,
      source: data,
    };
    this.renderCarousel = this.renderCarousel.bind(this);
    this.renderList = this.renderList.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen(e) {
    const display = e.target.value;
    const newStatus = display === 'carousel';
    this.setState({ isCompact: newStatus });
  }

  renderCarousel() {
    const { source } = this.state;
    return (
      <Carousel>
        {source.map(img => (<img alt={img.alt} src={img.url} />))}
      </Carousel>
    );
  }

  renderList() {
    const { source } = this.state;
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={source}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    );
  }

  render() {
    const { isCompact } = this.state;
    return (
      <Card>
        <Row align="top">
          {isCompact ? this.renderCarousel() : this.renderList()}
        </Row>
        <Row type="flex" justify="end" align="bottom">
          <Radio.Group defaultValue="carousel" buttonStyle="solid" onChange={this.toggleOpen}>
            <Radio.Button value="carousel">
              <Icon type="picture" />
              Gallery
            </Radio.Button>
            <Radio.Button value="list">
              <Icon type="appstore" />
              List
            </Radio.Button>
          </Radio.Group>
        </Row>
      </Card>
    );
  }
}
