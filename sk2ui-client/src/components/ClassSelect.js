import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { fetchRicoLabels } from '../api/data-fetch';

const { Option } = Select;

export default class ClassSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetchRicoLabels((labels) => {
      this.setState({ options: labels });
    });
  }

  handleChange(value) {
    const { selectChanged } = this.props;
    selectChanged(value);
  }

  render() {
    const { options } = this.state;
    return (
      <Select
        placeholder="Select a class"
        style={{ width: 200 }}
        onChange={this.handleChange}
      >
        {(options && options.length > 0)
          ? options.map(option => <Option key={option} value={option}>{option}</Option>) : null }
      </Select>
    );
  }
}

ClassSelect.propTypes = {
  selectChanged: PropTypes.func.isRequired,
};
