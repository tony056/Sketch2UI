import React from 'react';
import { Layout } from 'antd';
import HeaderBar from '../containers/HeaderBar';
import ClassSelect from '../components/ClassSelect';
import ImageViewer from '../components/ImageViewer';
import DrawingBoard from '../components/DrawingBoard';
import { fetchSampleImageURLs } from '../api/data-fetch';
import saveLabelSketch from '../api/data-create';

const { Content, Sider } = Layout;

export default class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleSources: [],
    };
    this.label = '';
    this.selectChanged = this.selectChanged.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }

  selectChanged(newSelect) {
    if (newSelect !== '') {
      this.label = newSelect;
      fetchSampleImageURLs(newSelect, 5, (urls) => {
        this.setState({ sampleSources: urls });
      });
    }
  }

  saveImage(data) {
    const date = Date.now();
    saveLabelSketch(`${this.label}_${date}`, this.label, data);
  }

  render() {
    const { sampleSources } = this.state;
    return (
      <Layout className="layout">
        <HeaderBar defaultKey="add" />
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <ImageViewer source={sampleSources} />
            <ClassSelect selectChanged={this.selectChanged} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content>
              <DrawingBoard save={this.saveImage} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
