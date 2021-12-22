

## Vue3 UI  Framework - 打包发布

> 基础组件库先做到这个阶段，后面我会继续新增、完善
>
> 接下来，我们对之前做的组件进行打包发布到 `npm`
>
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### 组件库优化

#### 通用层叠样式表

我想大家都注意到了，前面我们在写组件的时候，`scss` 中类的命名都是 `jeremy-x` 这样的形式，这是为了用选择器来做到统一配置。

#### 如何配置

我们在 `src/lib` 目录下，创建一个 `jeremy.scss` 的文件，编写如下代码：

```scss
[class^="jeremy-"],[class*=" jeremy-"]* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
  "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
  "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
  "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
  SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
```

> **注意**
>
> 前缀改成您的项目标识就可以了，我这里是 `jeremy`

#### 入口统一

我们需要告诉打包器，那些内容是需要暴露的，所以这里我们再在 `src/lib` 目录下创建一个 `index.ts` 文件，然后将需要打包的组件进行汇总导入和导出。

```typescript
import JeremyButton from './Button.vue'
import JeremyCard from './Card.vue'
import JeremyDialog from './Dialog.vue'
import JeremyInput from './Input.vue'
import JeremySwitch from './Switch.vue'
import JeremyTable from './Table.vue'
import JeremyTab from './Tab.vue'
import JeremyTabs from './Tabs.vue'

export { JeremyButton, JeremyCard, JeremyDialog, JeremyInput, JeremySwitch, JeremyTable, JeremyTab, JeremyTabs, }
export { createDialog as createDialog } from './createDialog'

export default {
  install: Vue => {
    const components = [JeremyButton, JeremyCard, JeremyDialog, JeremyInput, JeremySwitch, JeremyTable, JeremyTab, JeremyTabs]
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
```

> **注意**
>
> 这里的 `install` 方法是让用户能够完整引入组件的必要方法
>
> 这里的 `export` 是用于按需引入的，另外，要想实现用户能够部分引入组件，还必须在每个子组件中定义 `install` 方法

#### 示例

##### 完整引入

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import JeremyUI from 'jeremy-ui';
import 'jeremy-ui/lib/jeremy.css';

const app = createApp(App);
app.use(JeremyUI);
app.mount('#app');
```

##### 按需引入

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { JeremyButton, JeremyCard } from 'jeremy-ui';
import 'jeremy-ui/lib/jeremy.css';

const app = createApp(App);

app.use(JeremyButton);
app.use(JeremyCard);

app.mount('#app');
```

##### 子组件示例

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
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
</script>
```

### 注册 NPM 账户

既然要发布到 `npm` ，那么首先我们要有一个 `npm` 账户，如果没有可以点击 [官网](https://www.npmjs.com/) 进行注册。 

> **注意**
>
> 一定要记好，用户名、密码和邮箱！
>
> 注册完成后，一定要完成邮箱认证！

邮箱认证后，登录显示如下，这里的 `2FA` 暂时可以忽略，不过后面尽量完成认证。

![image-20211222093456720](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211222093456720.png)

### 配置打包

首先，要清楚我们的项目是基于 `Vite` 的，也就是说，是一个由原生 `ESM` 驱动的 `Web` 开发构建工具构建的。在选择构建工具的时候也最好可以选择基于 `ESM` 的工具。

所以，我们选择 `Rollup` 进行打包，是因为 `Rollup` 是基于 `ES2015` 的 `JavaScript` 打包工具。它将小文件打包成一个大文件或者更复杂的库和应用，打包既可用于浏览器和 `Node.js` 使用。 `Rollup` 最显著的地方就是能让打包文件体积很小。相比其他 `JavaScript` 打包工具，`Rollup` 总能打出更小，更快的包。因为 `Rollup` 基于 `ES2015` 模块，比 `Webpack` 和 `Browserify` 使用的 `CommonJS` 模块机制更高效。

##### 配置 Rollup

我们在项目的根目录下创建 `rollup.config.js` 文件，代码如下：

```javascript
import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser"

export default {
  // 主入口配置
  input: 'src/lib/index.ts',
  output: [{
    globals: {
      // 全局依赖
      vue: 'Vue'
    },
    // 项目名称
    name: 'Jeremy',
    // 输出文件名
    file: 'lib/jeremy.js',
    // 输出文件格式，使用 es module
    format: 'es',
    // 压缩文件大小
    plugins: [terser()]
  }, {
    globals: {
      vue: 'Vue'
    },
    name: 'Jeremy',
    // 输出文件格式，使用 umd
    file: 'lib/jeremy.umd.js',
    format: 'umd',
    plugins: [terser()]
  },],
  plugins: [
    vue({
      include: /\.vue$/,
    }),
    scss({ include: /\.scss$/, sass: dartSass }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      // 降为 es6 语法
      target: 'es2015'
    }),
  ],
}
```

通过配置我们指导 `rollup` 依赖如下 5 个包

1. sass
2. rollup-plugin-esbuild
3. rollup-plugin-vue
4. rollup-plugin-scss
5. rollup-plugin-terser

我们通过 `npm` 进行安装，在项目根目录下执行 `bash` ，并运行如下命令：

```bash
npm install sass -D
npm install rollup-plugin-esbuild -D
npm install rollup-plugin-vue -D
npm install rollup-plugin-scss -D
npm install rollup-plugin-terser -D
```

> **注意**
>
> -D 标识安装为开发依赖，不能省略

### 开始打包

在项目根目录下执行 `bash` ，并运行如下命令：

```bash
rollup -c
```

执行后，我们会在根目录下的 `lib` 文件夹下看到如下三个文件：

![image-20211222100048263](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211222100048263.png)

### 发布到 NPM

开始之前，我们需要在 `package.json` 中添加一些内容，用户配置组件库的位置和默认文件，代码如下：

```json
{
  "name": "jeremy-ui",
  "version": "0.0.3",
  "files": [
    "lib/*"
  ],
  "main": "lib/jeremy.js",
}
```

> **注意**
>
> 发布到 `npm` 时，发布的项目名取决于配置中的 `name` 字段，发布的版本号取决于该配置中的 `version` 字段
>
> 每次发布时，发布的新版本号不得低于该项目以前发布过的任意版本号

然后，在项目根目录下运行 `bash` 并执行如下命令：

```bash
npm login
```

然后登录（输入用户名、密码和邮箱），登录成功后，再执行如下命令：

```bash
npm publish
```

> **注意**
>
> 如果包名已经被别人发布过，那么这一步会失败，修改的包名重新打包、发布吧
>
> 如果发布错了，可以删除这个包，但是要求是 72 小时内，这里就不再展开了

发布成功后，我们可以登录 `npm` 查看一下：

![image-20211222101356400](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211222101356400.png)

### 使用 NPM 包

我们将项目切换到 `website` 分支，可以看到这个分支的组件都是通过 `npm` 进行安装的，不再是通过本地安装的了。当然，您也可以通过 `bash` 执行如下命令进行安装：

```bash
npm install jeremy-ui
```

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee:
