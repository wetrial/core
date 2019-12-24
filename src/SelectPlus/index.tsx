import React, { PureComponent } from 'react';
import { omit } from 'lodash';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

export interface IEnumSelectProps<T> extends SelectProps {
  /**
   * 数据源列表
   */
  list: T[];
  /**
   * key&值对应的 属性名
   */
  keyName?: keyof { [key: string]: T }; // string, // keyof T,
  /**
   * label对应的属性名
   */
  label?: keyof { [key: string]: T }; // keyof T
}

export default class<T> extends PureComponent<IEnumSelectProps<T>> {
  // static defaultProps = {
  //   list: [],
  //   keyName: 'key',
  //   label: 'label',
  // };

  render() {
    const { onChange, list = [], keyName = 'key', label = 'label' } = this.props;
    const handleChange = value => {
      if (onChange) {
        // @ts-ignore
        onChange(value);
      }
    };
    const selectProps = omit(this.props, 'keyName', 'label', 'list', 'onChange');
    return (
      <Select
        optionFilterProp="children"
        placeholder="-- 请选择 --"
        {...selectProps}
        onChange={handleChange}
      >
        {list.map(item => (
          <Select.Option key={`${item[keyName]}`} value={item[keyName]}>
            {item[label]}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
