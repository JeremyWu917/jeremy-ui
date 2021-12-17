## Vue3 UI  Framework - Table 组件

> 接下来做个自定义的表格组件，即 `table` 组件
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 需求分析

开始之前我们先做一个简单的需求分析

1. 基于原生 `table` 标签的强语义
2. 允许用户自定义表头、表体
3. 可选是否具有边框

那么可以整理出以下参数表格

| 参数     | 含义       | 类型    | 可选值                                             | 默认值 |
| :------- | :--------- | :------ | :------------------------------------------------- | :----- |
| heads    | 表头       | Array   | 数组，每一项包含两个 string 字段：name、identifier | 必填   |
| datas    | 表数据     | Array   | 数组，每一项包含与 heads 相同数量的 string 字段    | 必填   |
| bordered | 是否有边框 | boolean | false / true                                       | false  |

### 骨架

容易得到如下骨架

实际上我们这里是根据 `theme` 值判断，然后去渲染原生的 `input` 或者 `textarea` 组件，所以可以很容易得到骨架，代码如下：

```vue
<template>
    <table class="jeremy-table" :bordered="bordered">
        <slot></slot>
    </table>
</template>
```

### 功能

首先，我们再 `Typescript` 中声明一些需求分析中的属性：

```vue
declare const props: {
  bordered: boolean;
};
```

然后，再在 `export default` 中写入声明的参数：

```vue
export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyTable",
  props: {
    bordered: {
      type: Boolean,
      default: false,
    },
  },
};
```

### 样式表

补全层叠样式表

```vue
<style lang="scss">
.jeremy-table {
  width: 100%;
  text-align: left;
  border-spacing: 0;
  th,
  td {
    padding: 12px;
  }
  tbody {
    > tr {
      transition: background-color 250ms;
      &:nth-child(even) {
        background: rgb(247, 247, 247);
      }
      &:hover {
        background: #d3c8f5;
      }
    }
  }
}
.jeremy-table[bordered="true"] {
  border: 1px solid rgb(235, 235, 235);
  tr,
  th,
  td {
    border: 1px solid rgb(235, 235, 235);
  }
}
</style>
```

> 注意，当设置属性 `bordered` 的时候，因为它不是 `DOM` 元素本有的属性，所以无论什么情况都会被添加，只不过值可能是 `false` ，但是 `disabled` 属性就没有这个问题，它为 `false` 值时不会绑定到 `DOM` 元素上，所以，此处属性选择器要写 `[bordered="true"]`

### 测试

创建一个测试页，导入 `JeremyTable` 组件，看一下效果：

![table](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/table.gif)

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee:

