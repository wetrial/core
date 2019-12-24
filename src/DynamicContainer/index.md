---
title: DynamicContainer
subtitle: 容器组件
order: 1
cols: 1
---

一个容器组件，常用在需要根据不同浏览器尺寸来设置不同宽度的场景,可通过`widthMap`属性来指定不同适配下的宽度

## API

### DynamicContainer

| 参数               | 说明       | 类型                                 | 默认值       |
| ---------------- | -------- | ---------------------------------- | --------- |
| widthMap             | 自定义宽度映射     | Object | `{xs: 500,sm: 550,md: 650,lg: 850,xl: 900,xxl: 1200}` |

> 栅格相关说明，请查看:[https://ant.design/components/grid-cn/](https://ant.design/components/grid-cn/)

### 案例
``` tsx
// 1. 使用预定义宽度
<DynamicContainer>
  {width => (
    <Modal
      title="监测记录"
      centered
      visible
      footer={null}
      width={width}
    >
      ....
    </Modal>
  )}
</DynamicContainer>

// 1. 使用自定义宽度
<DynamicContainer widthMap={{xs:600,sm:800,md:1000,lg:1200,xl:1200,xxl:1400}}>
  {width => (
    <Modal
      title="监测记录"
      centered
      visible
      footer={null}
      width={width}
    >
      ....
    </Modal>
  )}
</DynamicContainer>
```
