## Vue3 UI  Framework - 按钮

> 官网基本做好了，接下来开始做核心组件
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)  

### 目录准备

在项目 `src` 目录下创建 `lib` 文件夹，用来存放所有的核心组件吧。然后再在 `lib` 文件夹下创建 `Button.vue` 文件。

您也可以进行结构化设计，比如，这里就不进行了。

```bash
|-lib
  |-Button
  	|- Button.vue
  	|- Button.ts
  	|_ Button.scss
```

### 需求分析

惯例先行需求分析

1. 多种类基础 `Button`，包含警告、成功、危险等
2. 允许设置 `Button` 为禁用状态
3. 不止有传统 `Button`，还可以有文字或链接形式
4. 当处于加载中，`Button` 应当显示
5. 有不同的尺寸可供选择
6. 应当允许更换颜色
7. 当鼠标放置于 `Button` 上、鼠标按下未松开、处于加载中等状态时，应当变更背景色
8. 允许用户自定义 `Button` 上显示的文本

那么可以整理出以下参数表格

| 参数     | 含义       | 类型    | 可选值                                                       | 默认值  |
| :------- | :--------- | :------ | :----------------------------------------------------------- | :------ |
| level    | 默认类型   | string  | default / plain / primary / success / info / warning / danger | default |
| disabled | 是否禁用   | boolean | false / true                                                 | false   |
| theme    | 式样       | string  | button / link / text                                         | button  |
| loding   | 是否加载中 | boolean | false / true                                                 | false   |
| size     | 尺寸       | string  | middle / small / large                                       | middle  |
| color    | 颜色       | string  | 任意合法颜色值                                               | #f3678e |

第 7 条，可以通过设置一个遮罩层来实现，只要遮罩层变色，背景色也等效变色

第 8 条，可以通过插槽实现，注意 `vue3` 不建议使用具名插槽

### 骨架

容易得到如下骨架

```vue
<template>
  <button
    class="jeremy-button"
    :theme="theme"
    :level="level"
    :size="size"
    :style="{ '--color': color }"
    :disabled="disabled"
    :loading="loading"
  >
    <div class="jeremy-button-mask"></div>
    <span class="jeremy-button-loadingIndicator" v-if="loading"></span>
    <slot></slot>
  </button>
</template>
```

首先，本质应当是一个 `button` 元素，在此基础上，将参数列表中整理出来的每个参数，都使用 `v-bind` 绑定到 `button` 上

注意，此处绑定 `color`，必须是如上例一样，绑定到 `--color` 属性上，才可以在 `css` 中使用 `css3` 语法 `var()` 读取，在 `css` 小节会再解释，此处略

之后，在 `button` 内

1. 放置一个遮罩层，用于变色
2. 放置一个”加载中”的动画，用于在加载中状态下显示
3. 放置一个默认插槽，用于传递用户自定义的文本

然后为上述元素配置各自的 `class` 名称，骨架就完成了。

### 功能

显然，参数列表中整理出来的内容，一定来自引用该组件的地方的传入，先根据参数列表，写好 `ts` 声明：

```typescript
declare const props: {
  theme?: "button" | "link" | "text";
  level?:
    | "default"
    | "plain"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger";
  size?: "middle" | "small" | "large";
  color: string;
  disabled: boolean;
  loading: boolean;
};
```

然后在 `export default` 中，写入我们的参数

```typescript
export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyButton",
  props: {
    theme: {
      type: String,
      default: "button",
    },
    level: {
      type: String,
      default: "default",
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
```

对于事件绑定，因为我们设计的组件只有一个唯一的根元素，所以对于外部传递过来的事件，会自动绑定到组件的根元素上面。

### 样式表

**注意** :`UI` 库的样式表一般不要加 `scoped` 修饰符，为了尽可能减少对用户样式表的影响，方便用户 `DIY`

**特别注意** : `button` 元素会有默认黑色外边框，不属于 `border`，必须通过 `outline: none;` 才能消除

然后，我们使用 `css3` 的 `var()` 语法，取得我们通过 `ts` 绑定到 `style` 上的 `--color` 属性

为什么是 `--color` 而不是 `color` ？因为 `var()` 语法要求这个参数必须是 `--` 开头，才可以正常访问到

对于遮罩层，采用淡出到白色即可实现，原理此处不解释了

最后，对于多种不同的 `button`，可以使用 `scss` 提供的 `mixin / include` 语法来实现，完整代码如下：

```scss
$theme-color: var(--color);
$base-mask: fade-out(#fff, 0.7);
$active-mask: fade-out(#fff, 0.5);
$h: 32px;
$radius: 4px;

@keyframes jeremy-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.jeremy-button {
  position: relative;
  display: inline-block;
  padding: 10px 16px;
  color: white;
  border-radius: $radius;
  border: none;
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 250ms;
  outline: none;
  :focus {
    outline: none;
  }
  > .jeremy-button-mask {
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: $radius;
    &:hover {
      background: $base-mask;
    }
  }
  &[loading="true"],
  &[disabled] {
    cursor: not-allowed;
    > .jeremy-button-mask {
      pointer-events: none;
    }
  }
  > .jeremy-button-loadingIndicator {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 8px;
    border-style: solid;
    border-width: 2px;
    animation: jeremy-spin 1s infinite linear;
  }
}

@mixin layout($color) {
  $loading-color: fade-out(black, 0.7);

  background: $color;

  &:active {
    > .jeremy-button-mask {
      background: $active-mask;
    }
  }
  > .jeremy-button-loadingIndicator {
    border-color: $loading-color $loading-color $loading-color transparent;
  }
  &[loading="true"],
  &[disabled] {
    > .jeremy-button-mask {
      background: $base-mask;
    }
  }
}
.jeremy-button[theme="button"] {
  $color: $theme-color;

  @include layout($color);
}
.jeremy-button:not([theme="button"]) {
  padding: 0;
  background: white;
  color: black;
  &:hover {
    color: $theme-color;
  }
}
.jeremy-button[theme="link"] {
  text-decoration: underline;
}
.jeremy-button[level="plain"] {
  $base-color: $theme-color;
  @include layout(white);
  color: black;
  > .jeremy-button-mask {
    border: 1px solid rgb(187, 187, 187);
  }

  &:not([loading="true"]):not([disabled]) {
    &:hover {
      > .jeremy-button-mask {
        border: 1px solid $base-color;
      }
      color: $base-color;
    }
  }
}
.jeremy-button[level="primary"] {
  $color: #29adfa;

  @include layout($color);
}
.jeremy-button[level="success"] {
  $color: rgb(103, 194, 58);

  @include layout($color);
}
.jeremy-button[level="info"] {
  $color: #808080;

  @include layout($color);
}
.jeremy-button[level="warning"] {
  $color: rgb(230, 162, 60);

  @include layout($color);
}
.jeremy-button[level="danger"] {
  $color: rgb(245, 108, 108);

  @include layout($color);
}
.jeremy-button[size="large"] {
  padding: 14px 24px;
}
.jeremy-button[size="small"] {
  padding: 6px 10px;
}
```

以上，`button` 组件就完成了! :happy:

### 测试一下

![image-20211213131430347](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211213131430347.png)

感谢阅读 :coffee: