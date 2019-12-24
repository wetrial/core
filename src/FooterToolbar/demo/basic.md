---
order: 0
title:
  zh-CN: 演示
  en-US: demo
iframe: 400
---

## zh-CN

浮动固定页脚。

``` tsx
import {FooterToolbar} from 'wetrial';
import { Button } from 'antd';

ReactDOM.render(
  <div style={{ background: '#f7f7f7', padding: 24 }}>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <p>Content Content Content Content</p>
    <FooterToolbar extra="extra information">
      <Button>取消</Button>
      <Button type="primary">提交</Button>
    </FooterToolbar>
  </div>
, mountNode);
````
