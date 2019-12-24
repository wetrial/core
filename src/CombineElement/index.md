## 表单列组合框
用于一个表单项内，需要将多个表单元素组合成一个的情况

> 目前支持 Input、DatePicker、InputNumber、Select、Radio、SelectPlus、CheckBox、CheckBox.Group、Cascader、AutoComplete的组合使用
> 注:InputNumber、DatePicker、TimePicker等组件需要设置宽度为100%(可使用样式*w-full*)

### 使用方式
作为一个容器组件引入，然后可以在内部添加子组件

### 案例
``` tsx
<FormItem {...FORM_TWO_LAYOUT} label="温度设置">
    {getFieldDecorator('wenduSetting', {
    initialValue: {
        from: pagedData.Alerttime,
        to: pagedData.AlerttimeType,
    }
    })(
    <MultipleFormElement>
        <Input autoComplete="off" key="from" />
        <span>~</span>
        <InputNumber key="to" />
    </MultipleFormElement>,
    )}
</FormItem>

### 说明
