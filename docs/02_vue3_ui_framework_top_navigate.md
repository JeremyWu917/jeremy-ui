## Vue3 UI  Framework - 顶部边栏

> 顶部边栏比较简单，而且首页和文档页都需要，所以我们先从顶部边栏做起
>
> 前文回顾点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15670610.html) :cake: 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)    

### 初始化

首先，在 `components` 文件夹下，创建一个 `vue` 组件，命名为 `Topnav.vue` ，然后快速创建 `vue` 模板，代码如下：

```vue
<template>
  <div>
    
  </div>
</template>
<script lang="ts">
export default {
  
}
</script>
<style lang="scss" scoped>
  
</style>
```

### 页面结构分析

分析顶部边栏的结构，可以得出如下表格信息：

|      功能      | 位置 | 默认状态 | 小于 500 px 时状态 |
| :------------: | :--: | :------: | :----------------: |
|  首页跳转入口  | 左侧 |   可见   |        剧中        |
| 文档页跳转入口 | 右侧 |   可见   |       不可见       |
|  展开菜单按钮  | 左侧 |  不可见  |        可见        |

页面结构代码如下：

```vue
<template>
    <div class="topnav">
        <router-link to="/">
            首页
        </router-link>
        <router-link to="/document">
            文档页
        </router-link>
        <button>
            菜单
        </button>
    </div>
</template>
```

考虑到后续顶部菜单项扩展方便，这里最好做成一个列表

```vue
<template>
    <div class="topnav">
        <router-link to="/" class="logo">
            首页
        </router-link>
        <ul class="menu">
            <li>
                <router-link to="/document">
                    文档页
                </router-link>
            </li>
        </ul>
        <button @click="toggleMenu">
            菜单
        </button>
    </div>
</template>
```

### 功能分析

#### 需要的控制元素

顶边边栏中的弹出菜单按键，可以在引入它的组件中，被设置是否可见，那么应当有一个 `Boolean` 类型的变量来控制可见，且需要提供一个方法，控制菜单本体是否可见，但是，现在又犯难了——菜单本体是属于文档页的，而不是属于顶边栏的。如何跨组件控制呢 ？

回顾需求分析可得，通过弹出菜单按键，以及视口宽度，共同控制菜单是否可见，其中，视口宽度显然是一个全局属性，那么理应在 `App.vue` 中控制，于是我们在 `App.vue` 中定义其是否可见，并通过 `provide/inject` `API` 暴露给子组件，相关代码如下：

```vue
<script lang="ts">
import { provide, ref } from "vue";
export default {
  name: "App",
  setup() {
    const width = ref(document.documentElement.clientWidth);
    const menuVisible = ref(width.value > 500 ? true : false);
    window.onresize = () => {
      width.value = document.documentElement.clientWidth;
      if (width.value > 500) {
        menuVisible.value = true;
      } else {
        menuVisible.value = false;
      }
    };

    provide("menuVisible", menuVisible);
  },
};
</script>
```

初始化时，可以根据视口宽度决定顶边栏的弹出菜单按键是否可见，并监听视口大小变化，根据视口宽度自动更新控制变量。

#### 编写顶部边栏核心代码

即 `Topnav.vue` 代码如下：

```vue
<script lang="ts">
import { inject, Ref } from "vue";
export default {
  props: {
    toggleMenuButtonVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const menuVisible = inject<Ref<boolean>>("menuVisible");
    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };
    return {
      toggleMenu,
    };
  },
};
</script>
```

#### 注意一下

此处的 `inject` 需要注明变量的类型。因为 `menuVisible` 声明的时候是 `ref(true|false)`，所以其类型为 `Ref<boolean>`

### 层叠样式表

尽量优化用户体验，我们这里做个简单的样式美化，底部采用渐变线的分割效果：

```vue
<style lang="scss" scoped>
$color: #8c6fef;
.topnav {
  color: $color;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 97%,
    #8c6fef 97%,
    #8c6fef 100%
  );
  padding: 0 32px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  justify-content: center;
  align-items: center;
  > .logo {
    max-width: 6em;
    margin-right: auto;
    > svg {
      width: 80px;
      height: 80px;
    }
    > img {
      height: 80px;
    }
  }
  > .menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    > li {
      margin: 0 1em;
      > a {
        > svg {
          width: 32px;
          height: 32px;
        }
        > img {
          height: 80px;
        }
      }
    }
  }
  > .toggleAside {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    > .menu {
      display: none;
    }
    > .logo {
      margin: 0 auto;
    }
    > .toggleAside {
      display: inline-block;
    }
  }
}
img {
  padding: 6px 0;
}
</style>
```

至此，我们的顶部边栏组件已经完成了，接下来，我们把这个组件引入到 `App.vue` 中看下实际运行效果吧！

```vue
<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { provide, ref } from "vue";
export default {
  name: "App",
  setup() {
    const width = ref(document.documentElement.clientWidth);
    const menuVisible = ref(width.value > 500 ? true : false);
    window.onresize = () => {
      width.value = document.documentElement.clientWidth;
      if (width.value > 500) {
        menuVisible.value = true;
      } else {
        menuVisible.value = false;
      }
    };

    provide("menuVisible", menuVisible);
  },
};
</script>
<style lang="scss" scoped>
$max-width: 1200px;
.app {
  max-width: $max-width;
  margin-left: calc(50vw - 600px);
  position: relative;
  @media (max-width: $max-width) {
    margin-left: 0;
  }
}
</style>
```

### 效果图

![image-20211211092512943](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211211092512943.png)



感谢阅读 :coffee:

