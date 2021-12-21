## Vue3 UI  Framework - Card 组件

> 卡片是非常常用也是非常重要的组件，特别是在移动端的众多应用场景中，随便打开一个手机 `App` ，您会发现充斥着各种各样的卡片。
>
> 所以，我们也来制作一个简易的 `Card` 组件
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 需求分析

我们先做一个简单的需求分析

1. 允许用户自定义内容
4. 允许更换颜色

那么可以整理出以下参数表格

| 参数  | 含义 | 类型   | 可选值         | 默认值  |
| :---- | :--- | :----- | :------------- | :------ |
| color | 颜色 | string | 任意合法颜色值 | #d3c8f5 |

### 骨架

所以很容易能够得到如下骨架代码：

```vue
<template>
  <div class="jeremy-card" :style="{ '--color': color }">
    <slot></slot>
  </div>
</template>
```

> **注意**
>
> 这里我们放置一个 `slot` 插槽就行了，用户可以根据需要个性化设置 `Card` 主题的内容！

### 功能

首先，我们在 `typescript` 中声明属性

```typescript
declare const props: {
  color: string;
};
```

然后，再在 `export default` 中写入参数：

```typescript
export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyCard",
  props: {
    color: {
      type: String,
      default: "#8c6fef",
    },
  },
};
```

### 样式表

最后，我们再补全样式表：

```scss
.jeremy-card {
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px var(--color);
  padding: 12px;
  background: white;
}
```

### 测试

我们将 `JeremyCard` 引入到测试文档中预览一下效果：



### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee:
