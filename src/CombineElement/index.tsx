import React, { PureComponent, Fragment } from 'react';
import { IKeyValue } from '../kernel/types';
import './index.less';

export interface IDynamicFormElementProps {
  onChange?: (value: any) => void;
  value?: IKeyValue;
  selfLayout?: boolean;
}

export default class MultipleFormElement extends PureComponent<IDynamicFormElementProps> {
  // CheckBox.Group、InputNumber onChange(value:string:number)
  // Input、Radio、Checkbox、AutoComplete、DatePicker、TimePicker、Cascader onChange(e) --e.target.value
  handleValueChange = (key: any, eleType: any, e: any) => {
    let newValue;
    const eType = typeof e;
    if (eleType === 'InputNumber' && eType !== 'number') {
      const { value = {} } = this.props;
      newValue = value['key'];
    } else if (e && eType === 'object' && e.target) {
      newValue = e.target.value;
    } else {
      newValue = e;
    }

    const { onChange, value } = this.props;
    const result = {
      ...value,
      [key]: newValue,
    };
    onChange && onChange(result);
  };

  renderChildren(children: any, value: any) {
    return React.Children.map(children, (child: any) => {
      const props: any = {};
      const eleType = child.type;
      if (eleType === 'span' || eleType === 'label') {
        props.className = `label ${child.props.className || ''}`;
      }
      if (child.key) {
        props.onChange = this.handleValueChange.bind(this, child.key, child.type.name);
        props.value = value[child.key];
      }
      return React.cloneElement(child, props);
    });
  }
  render() {
    const { value = {}, children, selfLayout } = this.props;
    if (selfLayout) {
      return <Fragment>{this.renderChildren(children, value)}</Fragment>;
    } else {
      return (
        <div className="wetrial-multiple-form-element">{this.renderChildren(children, value)}</div>
      );
    }
  }
}
