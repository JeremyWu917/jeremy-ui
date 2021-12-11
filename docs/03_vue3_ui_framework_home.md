## Vue3 UI  Framework - 首页

> 顶部边栏做完了，接下来开始做官网的首页
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)    

### 创建视图文件夹

让我们先新建一个 `src/views` 文件夹，用来存放官网的主要视图

然后在该文件夹下新建两个 vue 文件，作为我们的视图

- `Home.vue`，首页
- `Document.vue`，文档页

再配置一下 `router.ts` 来实现跳转

```
import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Document from './views/Document.vue'

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: Home },
    { path: '/document', component: Document },
  ]
})
export default router
```

### 骨架

先搭建一下首页的骨架

已知首页要显示

1. 顶边栏
2. 极光背景
   - 两个跳转链接
3. 三点特性

首先是极光背景，非常简单，用渐变色 + 转向当作背景色就可以了，然后三点特性，显然是无序列表，那么可以得到如下骨架：

```
<template>
  <div>
    <Topnav />
    <div class="banner">
      <a href="https://github.com/JeremyWu917/jeremy-ui"> Github </a>
      <router-link to="/document"> 文档页 </router-link>
    </div>
    <div class="features">
      <ul>
        <li>特性1</li>
        <li>特性2</li>
        <li>特性3</li>
      </ul>
    </div>
  </div>
</template>
```

### 基本功能

然后在 script 中引入顶边栏

```
import Topnav from "../components/Topnav.vue";
export default {
  components: {
    Topnav,
  },
};
```

最后制作一下极光的样式表

```

<style lang="scss" scoped>
$theme-color: #8c6fef;
$border-radius: 4px;
$color: white;
.banner {
  background: linear-gradient(
    145deg,
    rgb(232, 232, 235) 0%,
    rgb(193, 181, 235) 30%,
    rgb(136, 106, 235) 70%,
    rgb(108, 68, 240) 100%
  );
  clip-path: ellipse(80% 60% at 50% 40%);
}
.features {
  margin: 64px auto;
  padding: 0 16px;
  @media (min-width: 800px) {
    width: 800px;
    > ul {
      > li {
        width: 50%;
      }
    }
  }
  @media (min-width: 1200px) {
    width: 1200px;
    > ul {
      > li {
        width: 33.3333%;
      }
    }
  }
  @media (max-width: 800px) {
    > ul {
      flex-direction: column;
      align-items: center;
    }
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      margin: 16px 0;
      display: grid;
      justify-content: center;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;
      > svg {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }
      > h3 {
        grid-area: title;
        font-size: 28px;
      }
      > p {
        grid-area: text;
      }
    }
  }
}
.banner {
  color: $color;
  padding-top: 120px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > * {
    margin: 12px 0;
  }
  > .actions {
    padding: 8px 0;
    a {
      margin: 0 8px;
      display: inline-block;
      padding: 8px 24px;
      &:hover {
        text-decoration: none;
      }
      > img {
        display: block;
        width: 80px;
      }
      text-align: center;
    }
  }
}
</style>
```

### 改进首页

那显然，特性应该单独占据一行，并且在宽度足够的时候横向排列，两个链接也最好横向排列，而且最好各自有点介绍。

先修改模板，再补全样式，再加个 `SVG` 图，`home.vue` 代码如下：

```
<template>
  <div>
    <Topnav />
    <div class="banner">
      <h1>Jeremy UI</h1>
      <h2>JeremyWU 创建的 UI 组件库</h2>
      <p class="actions">
        <a href="https://github.com/JeremyWu917/jeremy-ui">
          <img
            src="../assets/github.png"
            alt="Github"
            style="transform: rotateY(180deg)"
          />
          Github
        </a>
        <router-link to="/document">
          <img src="../assets/goto.png" alt="开始" />
          开始
        </router-link>
      </p>
    </div>
    <div class="features">
      <ul>
        <li>
          <svg>
            <use xlink:href="#icon-Vue"></use>
          </svg>
          <h3>基于 Vue 3</h3>
          <p>使用了 Vue 3 全新特性</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-typescript"></use>
          </svg>
          <h3>基于 TypeScript</h3>
          <p>源代码采用 TypeScript 书写</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-fork"></use>
          </svg>
          <h3>具有亲和力的代码</h3>
          <p>新手也能轻松阅读的源代码</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Topnav from "../components/Topnav.vue";
export default {
  components: {
    Topnav,
  },
};
</script>

<style lang="scss" scoped>
$theme-color: #8c6fef;
$border-radius: 4px;
$color: white;
.banner {
  background: linear-gradient(
    145deg,
    rgb(232, 232, 235) 0%,
    rgb(193, 181, 235) 30%,
    rgb(136, 106, 235) 70%,
    rgb(108, 68, 240) 100%
  );
  clip-path: ellipse(80% 60% at 50% 40%);
}
.features {
  margin: 64px auto;
  padding: 0 16px;
  @media (min-width: 800px) {
    width: 800px;
    > ul {
      > li {
        width: 50%;
      }
    }
  }
  @media (min-width: 1200px) {
    width: 1200px;
    > ul {
      > li {
        width: 33.3333%;
      }
    }
  }
  @media (max-width: 800px) {
    > ul {
      flex-direction: column;
      align-items: center;
    }
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      margin: 16px 0;
      display: grid;
      justify-content: center;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;
      > svg {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }
      > h3 {
        grid-area: title;
        font-size: 28px;
      }
      > p {
        grid-area: text;
      }
    }
  }
}
.banner {
  color: $color;
  padding-top: 120px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > * {
    margin: 12px 0;
  }
  > .actions {
    padding: 8px 0;
    a {
      margin: 0 8px;
      display: inline-block;
      padding: 8px 24px;
      &:hover {
        text-decoration: none;
      }
      > img {
        display: block;
        width: 80px;
      }
      text-align: center;
    }
  }
}
</style>
```

### 运行效果

![image-20211211102354207](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211211102354207.png)

感谢阅读 :coffee: