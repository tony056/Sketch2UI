import React from 'react';
import { Checkbox, Slider, Switch } from 'antd';

export default class LabelSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeSwitch: false,
      rangeOption: false,
    };
    this.labelCheckedChange = this.labelCheckedChange.bind(this);
    this.rangeOptionChange = this.rangeOptionChange.bind(this);
  }

  labelCheckedChange(e) {
    const { checked } = e.target;
    if (!checked) {
      this.setState({ rangeSwitch: checked, rangeOption: checked });
    } else {
      this.setState({ rangeSwitch: checked });
    }
  }

  rangeOptionChange(status) {
    this.setState({ rangeOption: status });
  }

  render() {
    const { rangeOption, rangeSwitch } = this.state;
    return (
      <div>
        <Checkbox onChange={this.labelCheckedChange}>Label</Checkbox>
        {rangeSwitch
          ? <Switch checkedChildren="with range" unCheckedChildren="without range" onChange={this.rangeOptionChange} />
          : null}
        {rangeOption ? <Slider /> : null}
      </div>
    );
  }
}
