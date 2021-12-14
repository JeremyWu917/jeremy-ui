## Vue3 UI  Framework - 对话框

> 做完按钮之后，我们应该了解了遮罩层的概念，接下来我们来做 `Dialog` 组件！
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)  

### 需求分析

1. 默认是不可见的，在用户触发某个动作后变为可见
2. 自带白板卡片，分为上中下三个区域，分别放置标题、内容、操作
3. 有两个基本操作：确定、取消
4. 卡片后应放置淡黑色遮罩层，遮住原本网页内容
5. 可以自定义是否允许取消
6. 右上角提供小叉叉来允许关闭
7. 允许通过点击遮罩层来关闭

所以，我们能够得出如下的参数表格

| 参数    | 含义     | 类型        | 可选值              | 默认值   |
| :------ | :------- | :---------- | :------------------ | :------- |
| visible | 是否可见 | boolean     | false / true        | false    |
| title   | 标题     | string      | 任意字符串          | 必填     |
| ok      | 确定回调 | ()=>boolean | 返回 boolean 的函数 | ()=>true |
| cancel  | 取消回调 | ()=>boolean | 返回 boolean 的函数 | ()=>true |

**注意**：可以通过设置返回值为 `true` 来允许事件发生，反之不允许。可以通过设置返回 `false` 来取消事件

### 骨架

> 我们复用之前做好的 `Button` 组件

一般情况下，我们不希望对话框弹窗在 `DOM` 树上的位置，而希望是 `body` 的直接子元素，那么我们可以使用 `vue3` 的 `teleport` 组件。

代码如下：

```vue
<template>
  <template v-if="visible">
    <teleport to="body">
      <div class="jeremy-dialog-overlay" @click="close"></div>
      <div class="jeremy-dialog">
        <header class="jeremy-dialog-header">
          {{ title }}
          <span class="jeremy-dialog-close" @click="close"></span>
        </header>
        <div class="jeremy-dialog-divider" />
        <main class="jeremy-dialog-main">
          <slot></slot>
        </main>
        <div class="jeremy-dialog-divider" />
        <footer class="jeremy-dialog-footer">
          <jeremy-button level="plain" @click="close">取消</jeremy-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <jeremy-button @click="task" :loading="loading">确定</jeremy-button>
        </footer>
      </div>
    </teleport>
  </template>
</template>
```

这样，在渲染时，`teleport` 内部的内容就会出现在 `body` 的子级上。

### 功能

现在 `ts` 中声明参数：

```typescript
declare const props: {
  visible: boolean;
  title: string;
  ok: () => boolean;
  cancel: () => boolean;
};
declare const context: SetupContext;
```

然后在 `export default` 中，写入我们的参数：

```vue
export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    ok: {
      type: Function,
      default: () => {
        return true;
      },
    },
    cancel: {
      type: Function,
      default: () => {
        return true;
      },
    },
  },
  components: {
    JeremyButton,
  },
};
```

再补全 `setup` 方法，此处选用 `Promise` 制造提交等待响应的感觉

```vue
  setup(props, context) {
    const loading = ref(false);
    const close = () => {
      if (loading.value) {
        return;
      }
      new Promise((resolve, reject) => {
        resolve(props.cancel());
      }).then((result) => {
        if (result !== false) {
          context.emit("update:visible", false);
        }
      });
    };
    const task = () => {
      new Promise((resolve, reject) => {
        loading.value = true;
        resolve(props.ok());
      }).then((result) => {
        if (result === true) {
          loading.value = false;
          context.emit("update:visible", false);
        }
      });
    };
    return { loading, close, task };
  },
```

### 样式表

最后再补全样式表：

```scss
<style lang="scss">
.jeremy-dialog-overlay {
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;
  background: fade-out($color: #000000, $amount: 0.7);
  width: 100vw;
  height: 100vh;
}
.jeremy-dialog {
  z-index: 20;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 200px;
  border-radius: 8px;
  background: white;
  display: flex;
  flex-direction: column;
  > * {
    padding: 8px;
  }
  > .jeremy-dialog-divider {
    border: 1px solid #8c6fef;
    padding: 0;
  }
  > .jeremy-dialog-header {
    display: flex;
    justify-content: space-between;
    > .jeremy-dialog-close {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      cursor: pointer;
      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 1px;
        background: black;
        width: 100%;
        top: 50%;
        left: 50%;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
  > .jeremy-dialog-main {
    flex-grow: 1;
    background: white;
  }
  > .jeremy-dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
```

### 一行代码打开

多数时候我们是不希望使用组件式的，而是直接用函数生成一个弹窗。那么，我们只要使用 `vue3` 提供的 `createApp` 和 `h` 函数就可以做到了。

我们再创建一个 `ts` 文件，即 `createDialog.ts` ，代码如下：

```typescript
import { createApp, h } from 'vue'
import JeremyDialog from './Dialog.vue'
export const createDialog = options => {
  const { title, content, ok, cancel } = options
  const div = document.createElement('div')
  document.body.appendChild(div)
  const close = () => {
    app.unmount(div)
    div.remove()
  }
  const app = createApp({
    render() {
      return h(JeremyDialog, {
        visible: true,
        'onUpdate:visible': newVisible => {
          if (newVisible === false) {
            close();
          }
        },
        title,
        ok, cancel
      }, { default() { return content } })
    }
  })
  app.mount(div)
}
```

然后再需要使用的地方导入即可：

```vue
import {createDialog} from './createDialog.ts'
```

**注意**：该函数要求传入一个 `options` 对象，该对象包含 `title, content, ok, cancel` 等 4 个部分，`content` 指代组件式中的插槽，其余含义见需求分析

然后使用 `h` 函数渲染新 `app` 中的内容，并作为参数传入 `createApp` 函数用以创建新的 `app`，最后挂载到 `DOM` 树上。

### 运行效果

接下来，我们将组件引入到页面中，看一下实际运行效果

![dialog](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/dialog.gif)

感谢阅读 :coffee: