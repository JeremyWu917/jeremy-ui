## Vue3 UI  Framework - 文档页

> 官网的首页做完了，接下来开始做官网的文档页
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)    

### 路由设计

先想想我们需要文档页通向哪些地方，这里直接给出我的设计：

| 所属 | 子标题   | 跳转路径               | 文件名(*.vue) |
| :--- | :------- | :--------------------- | :------------ |
| 指南 | 介绍     | /document/introduction | Introduction  |
| 指南 | 安装     | /document/install      | Install       |
| 指南 | 快速上手 | /document/start        | Start         |
| 组件 | Button   | /document/button       | Button        |
| 组件 | Dialog   | /document/dialog       | Dialog        |
| 组件 | Switch   | /document/switch       | Switch        |
| 组件 | Tabs     | /document/tabs         | Tabs          |

大致就做如上的子内容

然后在 `src/components` 目录下新建需要的文件们，此处举例 `Introduction.vue`

```
<template>
  <div>介绍</div>
</template>
<script lang="ts">
export default {
    
};
</script>
<style lang="scss" scoped>
    
</style>
```

再配置 `router.ts` 以路由

此处使用嵌套路由

```
// router.ts
import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Document from './views/Document.vue'
import Introduction from './components/Introduction.vue'
import Install from './components/Install.vue'
import Start from './components/Start.vue'
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import Switch from './components/Switch.vue'
import Tabs from './components/Tabs.vue'

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: Home },
    {
      path: '/document', component: Document, children: [
        { path: '', redirect: '/document/introduction' }, // 默认进入介绍页面
        { path: 'introduction', component: Introduction },
        { path: 'install', component: Install },
        { path: 'start', component: Start },
        { path: 'button', component: Button },
        { path: 'dialog', component: Dialog },
        { path: 'switch', component: Switch },
        { path: 'tabs', component: Tabs },
      ]
    }
  ]
})
export default router
```

### 骨架

然后搭个骨架吧，已知文档页要显示

1. 顶边栏
2. 菜单
3. 内容区域

容易得到如下骨架

```
<template>
  <div class="layout">
    <Topnav class="nav" />
    <div class="content">
      <aside>
        <div class="aside-list">
          <h2>指南</h2>
          <ol>
            <li>
              <router-link to="/document/introduction">介绍</router-link>
            </li>
            <li>
              <router-link to="/document/introduction">安装</router-link>
            </li>
            <li>
              <router-link to="/document/introduction">快速上手</router-link>
            </li>
          </ol>
        </div>
        <div class="aside-list">
          <h2>组件列表</h2>
          <ol>
            <li>
              <router-link to="/document/button">Button</router-link>
            </li>
            <li>
              <router-link to="/document/dialog">Dialog</router-link>
            </li>
            <li>
              <router-link to="/document/switch">Switch</router-link>
            </li>
            <li>
              <router-link to="/document/tabs">Tabs</router-link>
            </li>
          </ol>
        </div>
      </aside>
      <main class="main-body">
        <router-view :key="$route.fullPath" />
      </main>
    </div>
  </div>
</template>
```

然后加上基本的布局样式表

```
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    > .nav {
        flex-shrink: 0;
    }
    > .content {
        flex-grow: 1;
        padding-top: 90px;
        padding-left: 210px;
        @media (max-width: 500px) {
            padding-left: 0;
        }
    }
}
.content {
    display: flex;
}
```

### 侧边栏

重复代码不少，可以优化一下，先在 `script` 中声明数组：

```
setup() {
    const componentsList = ["Button", "Dialog", "Switch", "Tabs"];
    const guidancesList = [
        { path: "introduction", title: "介绍" },
        { path: "install", title: "安装" },
        { path: "start", title: "快速上手" },
    ];
    return {
        componentsList,
        guidancesList,
    };
}
```

然后在模板中引入

```
<aside>
    <div class="aside-list">
        <h2>指南</h2>
        <ol>
            <li v-for="(guidance, index) in guidancesList" :key="index">
                <router-link :to="'/document/' + guidance.path">
                    {{ guidance.title }}
                </router-link>
            </li>
        </ol>
    </div>
    <div class="aside-list">
        <h2>组件列表</h2>
        <ol>
            <li v-for="(component, index) in componentsList" :key="index">
                <router-link :to="'/document/' + component.toLowerCase()">
                    {{ component }}
                </router-link>
            </li>
        </ol>
    </div>
</aside>
```

最后补全样式表

```
<style lang="scss" scoped>
$base-color: #8c6fef;
$aside-index: 10;
$active-color: linear-gradient(
  90deg,
  rgba(255, 255, 255, 1) 0%,
  rgba(255, 255, 255, 1) 97%,
  $base-color 97%,
  $base-color 100%
);
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  > .nav {
    flex-shrink: 0;
  }
  > .content {
    flex-grow: 1;
    padding-top: 90px;
    padding-left: 210px;
    @media (max-width: 500px) {
      padding-left: 0;
    }
  }
}
.content {
  display: flex;
  > aside {
    flex-shrink: 0;
    width: 200px;
    padding: 16px 0;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 90px;
    height: 100%;
    z-index: $aside-index;
    > .aside-list {
      margin: 12px 0;
      > h2 {
        margin-bottom: 4px;
        padding: 4px 16px;
      }
      > ol {
        > li {
          > a {
            display: block;
            padding: 8px 32px;
            text-decoration: none;
            transition: background-color 100ms;
            &:hover {
              color: $base-color;
              background: $active-color;
            }
          }
          .router-link-active {
            color: $base-color;
            background: $active-color;
          }
        }
      }
    }

    @media (max-width: 500px) {
      background: #8c6fef;
      width: 100%;
      height: auto;
    }
  }
  > main {
    overflow: auto;
    flex-grow: 1;
    padding: 16px;
    background: white;
    // border: 1px solid red;
    margin-top: 4px;
    margin-right: 10px;
    @media (max-width: 500px) {
      margin-left: 10px;
    }
  }
}
</style>
```

就可以做到移动的时候会浮光的侧边栏了。

### 内容区

先填充一下文档，然后用 `border` 法调整文本位置，得到如下调整

```
.content > main {
    overflow: auto;
    flex-grow: 1;
    padding: 16px;
    background: white;
    margin-top: 4px;
    margin-right: 10px;
    @media (max-width: 500px) {
        margin-left: 10px;
    }
}
```

效果就不贴了，反正只是 `padding` 的调整

### 功能

在文档页，还应当可以控制顶边栏上的”弹出菜单”按键的是否可见，显然默认是允许在文档页显示的，所以在模板中调整 `Topnav` 为

```
<Topnav toggleMenuButtonVisible class="nav" />
```

然后获得对菜单的引用

```
const aside = ref<HTMLDivElement>(null);
<aside v-if="menuVisible" ref="aside"></aside>
```

再读取 `App.vue` 提供的 `menuVisible`，并实现隐藏菜单的方法

```
const menuVisible = inject<Ref<boolean>>("menuVisible");
const hideMenu = (event) => {
    let target: Node = event.target;
    if (!(target instanceof HTMLAnchorElement)) {
        while (target.parentNode && target.parentNode !== document.body) {
            target = target.parentNode;
            if (target === aside.value) {
                return;
            }
        }
    }
    if (document.documentElement.clientWidth <= 500) {
        menuVisible.value = false;
    }
};
```

所以有如下 `script`

```
import Topnav from "../components/Topnav.vue";
import { inject, ref, Ref } from "vue";
export default {
    components: {
        Topnav,
    },
    setup() {
        const componentsList = ["Button", "Dialog", "Switch", "Tabs"];
        const guidancesList = [
            { path: "introduction", title: "介绍" },
            { path: "install", title: "安装" },
            { path: "start", title: "快速上手" },
        ];
        const aside = ref<HTMLDivElement>(null);
        const menuVisible = inject<Ref<boolean>>("menuVisible");
        const hideMenu = (event) => {
            let target: Node = event.target;
            if (!(target instanceof HTMLAnchorElement)) {
                while (target.parentNode && target.parentNode !== document.body) {
                    target = target.parentNode;
                    if (target === aside.value) {
                        return;
                    }
                }
            }
            if (document.documentElement.clientWidth <= 500) {
                menuVisible.value = false;
            }
        };
        return {
            componentsList,
            guidancesList,
            aside,
            menuVisible,
            hideMenu,
        };
    },
};
```

取得关闭方法后，通过事件委托，将方法挂载到 `div.content` 上

```
<div class="content" @click="hideMenu">
```

即可实现点击空白处也可以关闭弹出菜单了。

### 运行效果

![image-20211211102959995](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211211102959995.png)

感谢阅读 :coffee: