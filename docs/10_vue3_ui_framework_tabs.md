## Vue3 UI  Framework - Tabs 组件

> 标签页是非常常用的组件，接下来我们来制作一个简单的 `Tabs` 组件
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 需求分析

我们先做一个简单的需求分析

1. 可以选择标签页排列的方向
2. 选中的标签页应当有下划线高亮显示
3. 切换选中时，下划线应当有动画效果
4. 应当允许更换颜色

那么可以整理出以下参数表格

| 参数      | 含义     | 类型   | 可选值         | 默认值  |
| :-------- | :------- | :----- | :------------- | :------ |
| direction | 方向     | string | row / column   | row     |
| selected  | 默认选中 | string | 子项的 name    | 必填    |
| color     | 颜色     | string | 任意合法颜色值 | #d3c8f5 |

通过为子项设置 `name` 属性，来指定默认值

### 骨架

#### 本体

通过需求分析我们可以得到如下骨架：

```vue
<template>
  <div
    class="jeremy-tabs"
    :style="{ '--color': color }"
    ref="container"
    :direction="direction"
  >
    <div class="jeremy-tabs-titles">
      <button
        v-for="(title, index) in titles"
        :key="index"
        class="jeremy-tabs-title"
        :class="{ selected: names[index] === selected }"
        @click="select(index)"
        :ref="
          (el) => {
            if (names[index] === selected) {
              selectedItem = el;
            }
          }
        "
      >
        {{ title }}
      </button>
      <div class="jeremy-tabs-indicator" ref="indicator"></div>
    </div>
    <div class="jeremy-tabs-divider"></div>
    <div class="jeremy-tabs-content">
      <component :is="content" :key="selected" />
    </div>
  </div>
</template>
```

> **注意**
>
> 这里我们用一个 `div` 来充当下划线，再使用一个新的 `component` 来显示用户输入的内容
>
> 我们还需要为标签页创建子组件，即 `Tab` 组件

#### 子组件

通过之前的分析，可以得出子组件 `Tab` 的骨架如下：

```vue
<template>
    <div>
        <slot></slot>
    </div>
</template>
```

另外，我们还需要定义一个参数，也就是标签的标题，所以还应该有如下声明与导出：

```typescript
declare const props: {
  title: string;
};

export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyTab",
  props: {
    title: {
      type: String,
      default: "标签页",
    },
  },
};
```

### 功能

首先，我们先在 `TypeScript` 中声明：

```typescript
declare const props: {
    direction?: "row" | "column";
    selected: String;
    color: String;
};
declare const context: SetupContext;
```

其次，再在 `export default` 中，写入我们的参数：

```typescript
export default {
  name: "JeremyTabs",
  props: {
    direction: {
      type: String,
      default: "row",
    },
    selected: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#8c6fef",
    },
  },
};
```

再次，再补全 `setup` 方法：

```typescript
  setup(props, context) {
    if (!["row", "column"].includes(props.direction)) {
      throw new Error("错误的方向");
    }
    const container = ref<HTMLDivElement>(null);
    const selectedItem = ref<HTMLButtonElement>(null);
    const indicator = ref<HTMLDivElement>(null);
    const slots = context.slots.default();
    slots.forEach((slot) => {
      if (slot.type !== JeremyTab) {
        throw new Error("一级子标签必须是 JeremyTab");
      }
      if (!slot.props) {
        throw new Error("存在 JeremyTab 属性列为空");
      }
      if (!("title" in slot.props)) {
        throw new Error("JeremyTab 缺少属性 title");
      }
      if (!("name" in slot.props)) {
        throw new Error("JeremyTab 缺少属性 name");
      }
    });
    const titles = slots.map((slot) => slot.props.title);
    const names = slots.map((slot) => slot.props.name);
    if (!names.includes(props.selected)) {
      throw new Error("指定了不存在的 selected 值");
    }
    const content = computed(() =>
      slots.find((slot) => slot.props.name === props.selected)
    );
    onMounted(() => {
      watchEffect(
        () => {
          if (props.direction === "row") {
            const { height } = selectedItem.value.getBoundingClientRect();
            indicator.value.style.top = height + "px";
            const { width } = selectedItem.value.getBoundingClientRect();
            indicator.value.style.width = width + "px";
            const left1 = container.value.getBoundingClientRect().left;
            const left2 = selectedItem.value.getBoundingClientRect().left;
            const left = left2 - left1;
            indicator.value.style.left = left + "px";
          } else {
            const { height } = selectedItem.value.getBoundingClientRect();
            indicator.value.style.height = height + "px";
            const { width } = selectedItem.value.getBoundingClientRect();
            indicator.value.style.left = width + "px";
            const top1 = container.value.getBoundingClientRect().top;
            const top2 = selectedItem.value.getBoundingClientRect().top;
            const top = top2 - top1;
            indicator.value.style.top = top + "px";
          }
        },
        { flush: "post" }
      );
    });
    const select = (index) => {
      context.emit("update:selected", names[index]);
    };

    return {
      container,
      selectedItem,
      indicator,
      slots,
      titles,
      names,
      content,
      select,
    };
  },
```

### 样式表

最后，再补全样式表

```scss
$theme-color: var(--color);
.jeremy-tabs {
  display: flex;
  flex-direction: column;
  position: relative;
  &-titles {
    display: flex;
  }
  &-title {
    padding: 4px 6px;
    border: none;
    cursor: pointer;
    outline: none;
    background: white;
    &:focus {
      outline: none;
    }
    &:hover {
      color: $theme-color;
    }
    &.selected {
      color: $theme-color;
    }
  }
  &-indicator {
    position: absolute;
    transition: all 250ms;
    border: 1px solid $theme-color;
  }
  &-divider {
    border: 1px solid rgb(184, 184, 184);
  }
  &-content {
    padding: 8px 4px;
  }
}
.jeremy-tabs[direction="column"] {
  flex-direction: row;
  > .jeremy-tabs-titles {
    flex-direction: column;
  }
  > .jeremy-tabs-content {
    padding: 2px 10px;
  }
}
```

### 测试

将 `JeremyTabs` 组件引入到测试文档，查看一下运行效果

![tabs](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/tabs.gif)

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee:
