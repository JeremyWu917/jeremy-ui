## Vue3 UI Framework - 开始

### 写在前面

> 一年多没写过博客了，工作、生活逐渐磨平了棱角。
>
> 写代码容易，写博客难，坚持写高水平的技术博客更难。
>
> 技术控决定慢慢拾起这份坚持，用作技术学习的阶段性总结。
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 开始

大前端时代，最近在面试前端工程师的过程中，有感而发，技术更新迭代快，学习成本高。浏览了各大博客论坛，千差万别，比较混乱。最终决定参考 [Element UI](https://element.eleme.cn/#/zh-CN) 的设计风格，主题色选择紫色（受到 [MaterialDesignInXamlToolkit](https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit) 的影响），写一套基于 `Vue3` 的 `UI` 框架库和对应的官方网站，方便后期在项目中快速使用，也算是对 `Vue3` 新特性的学习和总结。

先看一下 [Jeremy UI 官网](https://ui.jeremywu.top/) 效果吧！目前项目依然处于开发阶段，小伙伴们有兴趣可以跟着一起练习一下，也欢迎参与到项目中，项目参考地址 [GitHub](https://github.com/JeremyWu917/jeremy-ui) ，欢迎 `star`、`issue`、`fork` 和 `PR` 。

![img](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/1335881-20211210101544271-299604246.gif)

### 分析官网

#### 界面布局

1. 顶部边栏

2. 首页

3. 文档页
   1. 侧边栏
   2. 内容区域

#### 主题风格

紫色

#### 详细说明

| **位置**      | **特性**                                                     |
| ------------- | ------------------------------------------------------------ |
| 布局          | 两侧留白，内容在中间 最大宽度 `1200px`，小于 `1200px` 时，宽度 `100%` 小于 `500px` 时，变为手机版 |
| 顶部边栏      | 左侧是通往首页的跳转链接，右侧是通往文档页的跳转链接 视口小于 `500px` 时，只显示前往首页的跳转 |
| 首页          | 分为两部分，视觉效果部分和特点介绍部分                       |
| 首页视觉      | 紫色极光背景，中间放置两个跳转链接，一个前往 `GitHub` 查看代码，另一个前往文档页 |
| 首页特点      | 包含 `3` 个特点，分别是 1. 使用了 `vue3` 新特性 2. 使用 `ts` 3. 代码易读 |
| 文档页        | 文档页实际由顶边栏和本体构成，本体包含侧边栏和内容区域       |
| 顶边栏-文档页 | 小于 `500px` 时，在左侧额外显示弹出侧边栏的按键，并使得侧边栏不可见 |
| 侧边栏        | 默认可见，选中高亮，但视口宽度小于 `500px` 时，默认不可见 包含两个部分：指南和组件，各自有子级跳转 |
| 内容区域      | 根据侧边栏中选中的链接，显示 `md` 内容或组件范例内容         |

### 搭建官网

创建方式有很多，而我这里选择通过 `Vite` 进行创建 `Vue3` 项目，为什么选 `Vite` 呢？如下是 [Vite 官网](https://cn.vitejs.dev/guide/) 的说法：

> #### 现实问题[ ](https://cn.vitejs.dev/guide/why.html#the-problems)
>
> 在浏览器支持 ES 模块之前，JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发。这也正是我们对 “打包” 这个概念熟悉的原因：使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件。
>
> 时过境迁，我们见证了诸如 [webpack](https://webpack.js.org/)、[Rollup](https://rollupjs.org/) 和 [Parcel](https://parceljs.org/) 等工具的变迁，它们极大地改善了前端开发者的开发体验。
>
> 然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相当普遍。我们开始遇到性能瓶颈 —— 使用 JavaScript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用 HMR，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。
>
> Vite 旨在利用生态系统中的新进展解决上述问题：浏览器开始原生支持 ES 模块，且越来越多 JavaScript 工具使用编译型语言编写。
>
> #### 缓慢的服务器启动[ ](https://cn.vitejs.dev/guide/why.html#slow-server-start)
>
> 当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。
>
> Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。
>
> - 依赖 大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。
>
>   Vite 将会使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://cn.vitejs.dev/guide/dep-pre-bundling.html)。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
>
> - 源码 通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。
>
>   Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。
>
>   ![基于打包器的开发服务器](https://cn.vitejs.dev/assets/bundler.37740380.png)
>
>   ![基于 ESM 的开发服务器](https://cn.vitejs.dev/assets/esm.3070012d.png)
>
> #### 缓慢的更新[ ](https://cn.vitejs.dev/guide/why.html#slow-updates)
>
> 基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。
>
> 一些打包器的开发服务器将构建内容存入内存，这样它们只需要在文件更改时使模块图的一部分失活[[1\]](https://cn.vitejs.dev/guide/why.html#footnote-1)，但它也仍需要整个重新构建并重载页面。这样代价很高，并且重新加载页面会消除应用的当前状态，所以打包器支持了动态模块热重载（HMR）：允许一个模块 “热替换” 它自己，而不会影响页面其余部分。这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。
>
> 在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活[[1\]](https://cn.vitejs.dev/guide/why.html#footnote-1)（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。
>
> Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 `304 Not Modified` 进行协商缓存，而依赖模块请求则会通过 `Cache-Control: max-age=31536000,immutable` 进行强缓存，因此一旦被缓存它们将不需要再次请求。
>
> 一旦你体验到 Vite 的神速，你是否愿意再忍受像曾经那样使用打包器开发就要打上一个大大的问号了。
>
> #### 为什么生产环境仍需打包[ ](https://cn.vitejs.dev/guide/why.html#why-bundle-for-production)
>
> 尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。
>
> 要确保开发服务器和生产环境构建之间的最优输出和行为一致并不容易。所以 Vite 附带了一套 [构建优化](https://cn.vitejs.dev/guide/features.html#build-optimizations) 的 [构建命令](https://cn.vitejs.dev/guide/build.html)，开箱即用。
>
> #### 为何不用 ESBuild 打包？[ ](https://cn.vitejs.dev/guide/why.html#why-not-bundle-with-esbuild)
>
> 虽然 `esbuild` 快得惊人，并且已经是一个在构建库方面比较出色的工具，但一些针对构建 *应用* 的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。就目前来说，Rollup 在应用打包方面更加成熟和灵活。尽管如此，当未来这些功能稳定后，我们也不排除使用 `esbuild` 作为生产构建器的可能。

在开始之前我们需要注意兼容性问题：

> **兼容性注意**
>
> Vite 需要 Node.js 版本 >= 12.0.0

使用 `npm` 创建 `jeremy-ui` 项目

- 直接创建

```bash
mkdir jeremy-ui
cd jeremy-ui
cva .
```

- 脚手架创建（根据提示信息创建即可，注意选择 `vue` -> `vue-ts`）

![img](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/1335881-20211210150751081-33469351.png)

启动项目

```bash
cd jeremy-ui
npm install
npm run dev
```

正常情况下，你就可以在浏览器上( http://localhost:3000/ ) 预览项目了。

**注意：**

如果你不是通过脚手架去创建的项目，那么你可能需要将 `main.js` 改成 `main.ts` 。另外，你还需要在 `src` 目录下添加 `shims.d.ts` 文件，让 `ts` 文件能够识别 `vue` 后缀的文件。

`shims.d.ts` 文件源码如下：

```vue
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
```

### 整体布局设计

根据之前的分析，我们能够得出结论，首先，最大宽度限制需要作用到 `app` 上，所以相应的样式应该写在 `app.vue` 上，其次，首页和文档页的顶边栏，其功能为：

| **位置** | **功能**                 |
| -------- | ------------------------ |
| 首页     | 禁止弹出菜单             |
| 文档页   | 根据情况显示或者隐藏菜单 |

可见并不完全相同，也就是说不是同一个组件的复用，所以应该将顶边栏组件分别嵌入首页和文档页组件，而不是嵌入 `app.vue ，`然后，首页显然没有侧边栏，所以首页的内容直接写在其模板内即可，而文档页需要侧边栏和内容区域，但是文档页的侧边栏，实际上与弹出的顶部菜单是相同的内容，所以只需要编写一次，然后复用为侧边栏和顶部菜单即可。

除此之外，文档页的内容区域，还要分别展示 `markdown` 内容和组件内容，所以内容区域要分成两种进行编写。

综上，首页大致为上下结构，恒定不变；文档页大致为 `T` 字结构，小于 `1200px` 时为上下结构，附有弹出菜单的选项。

总体样式表 `index.scss` (可能需要修改 `index.css` 的后缀) 

```scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

body {
  font-size: 16px;
  line-height: 1.5;
  color: #1d2c40;
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

然后修改 `main.ts` 中的引入

```typescript
import './index.scss'
```

最后完成 `App.vue` 的内容

```vue
<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
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

### 依赖包的安装

请参考 `package.json` 文件，对应更新一下，然后再项目根目录下执行 `npm install`  即可。

```json
{
  "name": "jeremy-ui",
  "version": "0.0.3",
  "files": [
    "lib/*"
  ],
  "main": "lib/jeremy.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "github-markdown-css": "^4.0.0",
    "marked": "^1.2.8",
    "prismjs": "^1.23.0",
    "vue": "^3.0.4",
    "vue-router": "^4.0.4"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.4",
    "rollup-plugin-esbuild": "^4.7.2",
    "rollup-plugin-scss": "^3.0.0",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-vue": "^6.0.0",
    "sass": "^1.44.0",
    "vite": "^1.0.0-rc.13"
  }
}
```

### 路由设计

既然有多个页面，那肯定就要通过路由进行跳转。路由显然是使用 `vue-router`，首先安装它。要注意，默认安装的 `vue-router` 是 `3.x.x` 版本的，只能用于 `vue2`，要想用于 `vue3`，必须是 `4.x.x` 版本

通过 `npm info vue-router` 可以看到最新版（ `next` 版本）是 `4.0.4`（如有变化，下载最新版即可），则我们通过 `npm install vue-router@4.0.4` 安装适合 `vue3` 的 `vue-router。`

`Jeremy UI` 官网的路由设计如下：

| **目标**          | **路由**                  |
| ----------------- | ------------------------- |
| 首页              | /                         |
| 文档页            | /document                 |
| 文档页 - 介绍     | /document/introduction    |
| 文档页 - 安装     | /document/install         |
| 文档页 - 快速上手 | /document/start           |
| 文档页 - [组件名] | /document/[componentName] |

因为目前还没有试图，所以我们先把框架写好，暂时写一个空的引入即可，`router.ts` 如下

```typescript
import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()
const router = createRouter({
    history,
    routes: [
    ]
})
export default router
```

然后再在 `main.ts` 中引入

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import router from './router'

createApp(App).use(router).mount('#app')
```

### 使用 SVG

为了官网的相对美观，我们决定使用 `SVG`，可以使用 [icon font](https://www.iconfont.cn/) 提供的免费图标，使用教程大致如下

1. 选择喜欢的图标，加入购物车
2. 新建一个项目，或选择一个已有项目，将购物车里的图标加入该项目
3. 进入”我的项目”，生成新的引用链接
4. 选择 `Symbol` 模式，复制链接，粘贴到本地项目的 `index.html` 的新 `script` 标签中

之后就可以在本地使用如下的方式引用 `svg` 了

```html
<svg>
    <use xlink:href="#icon-Vue"></use>
</svg>
```

`svg` 的命名，参考 `icon font` 上”我的项目”里设置的每个图标的名称，另外，如果项目中的图标有任何变化，必须要重新生成引用链接！

### 相关资源

GitHub 仓库：[jeremy-ui](https://github.com/JeremyWu917/jeremy-ui)

Jeremy UI 官网地址：[Jeremy UI](https://ui.jeremywu.top/#/)

### GitHub 分支说明

| 分支名称 | 说明                                 |
| -------- | ------------------------------------ |
| main     | 合并的 dev 分支的 PR                 |
| dev      | 开发分支，组件库的引用来自本地       |
| publish  | GitHub Pages 发布的分支              |
| website  | 官网使用的分支，组件库的引用来自 npm |

小伙伴 `clone` 之后可以参考 `main` 分支，可以向 `dev` 分支提交 PR 哦！

### 参考资料

知乎 - [随安](https://zhuanlan.zhihu.com/p/392008705) 

掘金 - [大威Wayne](https://juejin.cn/post/6987562123182211080)

Vite 官方 - [Vite](https://cn.vitejs.dev/guide/)

阿里矢量图标库 - [Iconfont](https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2)
