## Vue3 UI  Framework - Input 组件

> 接下来再做一个常用的组件 - `input` 组件
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 需求分析

开始之前我们先做一个简单的需求分析

1. `input` 组件有两种类型，即 `input` 和 `textarea` 类型
2. 当类型为 `textarea` 时，可以自定义行高，但是当类型为 `input` 时，行高恒为 `1`
3. 可以自定义外边框的颜色
4. 可以设置为禁用

那么可以得到如下参数表格

| 参数     | 含义                               | 类型    | 可选值           | 默认值  |
| :------- | :--------------------------------- | :------ | :--------------- | :------ |
| value    | 绑定值                             | string  | 字符串           | 必填    |
| theme    | 类型                               | string  | input / textarea | input   |
| rows     | 行高，当 theme 为 input 时值恒为 1 | number  | 正整数           | 5       |
| color    | 外边框颜色                         | string  | 任意合法颜色值   | #8c6fef |
| disabled | 是否禁用                           | boolean | false / true     | false   |

### 骨架

实际上我们这里是根据 `theme` 值判断，然后去渲染原生的 `input` 或者 `textarea` 组件，所以可以很容易得到骨架，代码如下：

```vue
<template>
  <input
    v-if="theme === 'input'"
    class="jeremy-input-input"
    :style="{ '--color': color }"
    v-model="text"
    @input="change"
  />
  <textarea
    v-else
    class="jeremy-input-textarea"
    :rows="rows"
    :style="{ '--color': color }"
    v-model="text"
    @input="change"
  />
</template>
```

### 功能

首先，我们再 `Typescript` 中声明一些需求分析中的属性：

```vue
declare const props: {
  value: string;
  theme?: "input" | "textarea";
  rows?: number;
  color?: string;
};
declare const context: SetupContext;
```

然后，再在 `export default` 中写入声明的参数：

```vue
export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "input",
    },
    rows: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: "#8c6fef",
    },
  },
};
```

最后再补全 `setup` :

```vue
  setup(props, context) {
    const text = ref(props.value);
    const change = () => {
      context.emit("update:value", text.value);
    };
    return { text, change };
  },
```

### 样式表

补全层叠样式表

```vue
<style lang="scss">
$theme-color: var(--color);
[class^="jeremy-input"] {
  resize: none;
  padding: 8px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 0px 3px 0px $theme-color;
  outline: none;
  width: 100%;
  &[disabled] {
    box-shadow: 0px 0px 3px 0px gray;
  }
}
</style>
```

### 测试

创建一个测试页，导入 `JeremyInput` 组件，看一下效果：

![input](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/input.gif)

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee:

