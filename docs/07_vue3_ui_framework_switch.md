## Vue3 UI  Framework - 开关组件

> 为了更好的提升用户体验，我们这里再做一个很常用的开关组件 `switch`
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 需求分析

开始之前我们先做一个简单的需求分析

1. `switch` 组件应分为选中/未被选中，两种状态
2. 可以通过点击变更选中状态
3. 不同的选中状态有不同的颜色，且有滑块处于不同的端
4. 可以指定不同的尺寸
5. 可以自定义颜色
6. 可以设置为禁用

那么可以整理出以下参数表格

| 参数     | 含义         | 类型    | 可选值                 | 默认值  |
| :------- | :----------- | :------ | :--------------------- | :------ |
| value    | 默认选择状态 | boolean | false / true           | false   |
| size     | 尺寸         | string  | middle / small / large | middle  |
| color    | 颜色         | string  | 任意合法颜色值         | #8c6fef |
| disabled | 是否禁用     | boolean | false / true           | false   |

### 骨架

这里我们可以参考 `button` 组件，因为 `switch` 组件具有和 `button` 组件一样的”点击”之功能，所以这里可以直接使用 `button` 标签来实现，然后再用一个 `div` 来充当滑块，很容易得到如下骨架：

```vue
<template>
  <button
    @click="toggle"
    class="jeremy-swicth"
    :class="{ active: value }"
    :size="size"
    :style="{ '--color': color }"
    :disabled="disabled"
  >
    <div></div>
  </button>
</template>
```

### 功能

首先，我们再 `Typescript` 中声明一些需求分析中的属性：

```vue
declare const props: {
  value: boolean;
  size?: "middle" | "small" | "large";
  color: string;
  disabled: boolean;
};
declare const context: SetupContext;
```

然后，再在 `export default` 中写入声明的参数：

```vue
export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremySwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "middle",
    },
    color: {
      type: String,
      default: "#8c6fef",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
```

最后，再补全 `setup` 方法：

```vue
  setup(props, context) {
    const toggle = () => {
      context.emit("update:value", !props.value);
    };
    return { toggle };
  },
```

### 样式表

补全层叠样式表：

```vue
<style lang="scss">
@mixin layout($r, $d) {
  $r2: $r - $d;
  display: inline-block;
  position: relative;
  border: none;
  background: #adadad;
  outline: none;
  transition: background-color 250ms;
  cursor: pointer;
  :focus {
    outline: none;
  }
  > div {
    position: absolute;
    background: white;
    border-radius: 50%;
    transition: left 250ms;
    height: $r2;
    width: $r2;
    top: $d/2;
    left: $d/2;
  }
  height: $r;
  width: $r * 2;
  border-radius: $r / 2;
  &.active {
    background: var(--color);
    > div {
      left: calc(100% - #{$r2} - #{$d/2});
    }
  }
}
$r: 20px;
$d: 4px;
.jeremy-swicth[size="small"] {
  @include layout($r, $d);
}
.jeremy-swicth[size="middle"] {
  @include layout($r * 1.5, $d * 1.5);
}
.jeremy-swicth[size="large"] {
  @include layout($r * 2, $d * 2);
}
.jeremy-swicth[disabled] {
  cursor: not-allowed;
}
</style>
```

### 测试

创建一个测试页，导入 `JeremySwitch` 组件，看一下效果：

![switch](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/switch.gif)

感谢阅读 :coffee: