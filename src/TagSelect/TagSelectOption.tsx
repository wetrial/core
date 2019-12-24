import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

export interface TagSelectOptionProps {
  checked?: boolean;
  onChange?: (value: string | number, state: boolean) => void;
  value: number | string;
}

class TagSelectOption extends React.PureComponent<TagSelectOptionProps, any> {
  static isTagSelectOption = true;

  render() {
    const { checked, children, value, onChange } = this.props;
    return (
      <CheckableTag
        checked={!!checked}
        key={value}
        onChange={state => onChange && onChange(value, state)}
      >
        {children}
      </CheckableTag>
    );
  }
}

export default TagSelectOption;
