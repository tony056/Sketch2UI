import React from 'react';
import { Form, Divider, Button } from 'antd';
import LabelSelect from './LabelSelect';

export default function FilterForm() {
  return (
    <Form>
      <Divider orientation="left">Filter by Rico&apos;s labels</Divider>
      <Form.Item>
        <LabelSelect />
        <LabelSelect />
      </Form.Item>
      <Divider orientation="left">Filter by SK2UI&apos;s labels</Divider>
      <Form.Item>
        <LabelSelect />
        <LabelSelect />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Search</Button>
      </Form.Item>
    </Form>
  );
}
