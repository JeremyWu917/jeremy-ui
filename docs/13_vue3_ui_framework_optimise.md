

## Vue3 UI  Framework - 完善官网

> 为了提升用户体验，今天我们来对 `jeremy-ui` 官网做一个优化 :rocket:
> 
> 返回阅读列表点击 [这里](https://www.cnblogs.com/jeremywucnblog/p/15674656.html)

### Markdown 解析支持 :spiral_notepad:

习惯用 `markdown` 语法编辑，所以我们增加项目源码对 `markdown` 的支持，虽然即便这样做依然无法和 [JeremyPress](https://github.com/JeremyWu917/jeremy-press) 或者 [VuePress](https://github.com/vuejs/vuepress) 相比，但是至少不用纠结于原生 `html` 了，能够在一定程度上解决排版问题。

我们需要增加一个 `plugins` 文件夹，并且在此文件夹下创建一个 `md.ts` 的文件，代码如下：

```typescript
import path from 'path'
import fs from 'fs'
import marked from 'marked'
const mdToJs = str => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}

export function md() {
  return {
    configureServer: [
      async ({ app }) => {
        app.use(async (ctx, next) => {
          if (ctx.path.endsWith('.md')) {
            ctx.type = 'js'
            const filePath = path.join(process.cwd(), ctx.path)
            ctx.body = mdToJs(fs.readFileSync(filePath).toString())
          } else {
            await next()
          }
        })
      },
    ],
    transforms: [{
      test: context => context.path.endsWith('.md'),
      transform: ({ code }) => mdToJs(code)
    }]
  }
}
```

应该看到，这里我们需要依赖 `marked` 这个 `npm` 库，运行项目之前，需要先安装一下：

```bash
npm install marked --save
```

 另外，我们还需要在项目的根目录下创建 `vite.config.ts` 文件，并对 `markdown` 插件做一下配置：

```typescript
import { md } from "./plugins/md";

export default {
  plugins: [md()],
};
```

### GitHub Markdown 样式支持 :sailboat:

我们可以使用 `github-markdown-css` 这个库来获取样式表

```bash
npm install github-markdown-css --save
```

安装完成后，在 `main.ts` 中引入

```bash
import 'github-markdown-css'
```

最后，我们对 `Guidance.vue` 做下配置以便 `markdown` 文件以及 `markdown` 样式能够在项目中被正确的解析：

```vue
<template>
  <article class="markdown-body" v-html="md"></article>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const md = ref(null);
    import(`../markdown/${props.path}.md`).then(
      (res) => (md.value = res.default)
    );
    return { md };
  },
};
</script>
```

### 代码展示 :computer:

参考 [ElementUI](https://element.eleme.cn/#/zh-CN) 手册，我们发现不仅展示了组件，还会给出例子所使用的代码，我们也在官网中增加查看代码的功能。

我们可以在 `vite` 初始化的时候配置，即在 `vite.config.ts` 文件中做配置：

```typescript
// @ts-nocheck
import { md } from "./plugins/md";
import fs from 'fs'
import { baseParse } from '@vue/compiler-core'

export default {
  base: '/',//指定打包后文件的默认引用路径
  assetsDir: 'assets',
  plugins: [md()],
  vueCustomBlockTransforms: {
    example: (options) => {
      const { code, path } = options
      const file = fs.readFileSync(path).toString()
      const parsed = baseParse(file).children.find(n => n.tag === 'example')
      const title = parsed.children[0].content
      const main = file.split(parsed.loc.source).join('').trim()
      return `export default function (Component) {
        Component.__sourceCode = ${JSON.stringify(main)
        }
        Component.__sourceCodeTitle = ${JSON.stringify(title)}
      }`.trim()
    }
  }
};
```

> **注意**
>
> 这里我们通过 `// @ts-nocheck` 注释，来忽略静态报错

### 代码高亮显示支持 :rainbow_flag:

我们可以用 `prismjs` 库来获得代码高亮，先安装

```bash
npm install prismjs --save
```

然后，再在需要使用的地方，分别引入 `prismjs` 和 `prismjs/themes/prism.css`，即可开始使用

`prismjs` 的工作原理，是构造一个对象，并绑定到 `window` 上，所以在模板中使用的时候，需要先获取 `window.Prism`，再在 `setup` 中 `return` 出去。`Prism` 对象的常见用例如下：

```typescript
Prism.highlight(
    [sourceCode],
    Prism.languages.html,
    'html'
)
```

该对象上提供一个名为 `highlight` 的方法，该方法要求传入 3 个参数，按顺序分别如下

1. 源代码
2. 作为代码进行解析
3. 作为代码进行显示（渲染）

最后，我们再在 `Content.vue` 文件中配置 `Prism` 以便内容中涉及到代码的部分都能被高亮的显示：

```vue
<template>
  <h1>{{ title }}</h1>
  <br />
  <div
    class="container"
    v-for="({ ...component }, index) in components"
    :key="index"
  >
    <jeremy-card class="example">
      <h2>{{ component.__sourceCodeTitle }}</h2>
      <br />
      <component :is="component" />
      <br />
      <br />
      <code class="markdown-body">
        <pre
          v-if="visibility[index]"
          v-html="
            Prism.highlight(
              component.__sourceCode,
              Prism.languages.html,
              'html'
            )
          "
        ></pre>
      </code>

      <button class="toggle" @click="toggle(index)">
        <span class="close" v-if="visibility[index]">
          △
          <span class="desp">隐藏代码</span>
        </span>
        <span class="open" v-else>
          ▽
          <span class="desp">显示代码</span>
        </span>
      </button>
    </jeremy-card>
    <br />
  </div>
  <jeremy-table bordered>
    <thead>
      <tr>
        <th v-for="(head, index) in heads" :key="index">{{ head.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(attribute, index) in attributes" :key="index">
        <td v-for="key in keys" :key="key" v-html="attribute[key]"></td>
      </tr>
    </tbody>
  </jeremy-table>
</template>

<script lang="ts">
import JeremyButtons from "../components/contents/Button";
import JeremyCards from "../components/contents/Card";
import JeremyDialogs from "../components/contents/Dialog";
import JeremyInputs from "../components/contents/Input";
import JeremySwitchs from "../components/contents/Switch";
import JeremyTables from "../components/contents/Table";
import JeremyTabss from "../components/contents/Tabs";

import { ref } from "vue";
import { JeremyCard, JeremyTable } from "jeremy-ui"
import "prismjs";

const Prism = (window as any).Prism;

const JeremyMap = {
  Button: JeremyButtons,
  Card: JeremyCards,
  Dialog: JeremyDialogs,
  Input: JeremyInputs,
  Switch: JeremySwitchs,
  Table: JeremyTables,
  Tabs: JeremyTabss,
};

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    JeremyCard,
    JeremyTable,
  },
  setup(props) {
    const { name, title } = props;
    const heads = [
      { name: "参数", identifier: "attr" },
      { name: "含义", identifier: "desp" },
      { name: "类型", identifier: "type" },
      { name: "可选值", identifier: "values" },
      { name: "默认值", identifier: "default" },
    ];
    const keys = heads.map((item: any) => item.identifier);

    const { components, attributes } = JeremyMap[name];
    const visibility = ref(components.map((item) => false));
    const toggle = (index) => {
      visibility.value[index] = !visibility.value[index];
    };
    return {
      title,
      Prism,
      heads,
      keys,
      components,
      attributes,
      visibility,
      toggle,
    };
  },
};
</script>

```

另外，我们还需要在 `main.ts` 中引入代码样式：

```typescript
import "prismjs/themes/prism-solarizedlight.css"
```

> **注意**
>
> 样式可以根据自己的喜好进行选择，我这里选的是 `prism-solarizedlight`
>
> 除此之外，查看 `prism` 主题包可以看到其他的样式哦
>
> ![image-20211223095336895](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/image-20211223095336895.png)

### 展开/关闭代码 :bulb:

>  通过一个开关事件去控制代码的显示和隐藏

需要在 `Content.vue` 文件中配置一下：

```vue
<button class="toggle" @click="toggle(index)">
   <span class="close" v-if="visibility[index]">        △
      <span class="desp">隐藏代码</span>
   </span>
   <span class="open" v-else>
      ▽
      <span class="desp">显示代码</span>
   </span>
</button>
```

### 修改 UI 引用路径 :sound:

官网的 `UI` 框架引用改成来自 `npm` ，这样能够更好的提升用户体验。先安装：

```bash
npm install jeremy-ui --save
```

再在 `main.ts` 中引用样式表：

```typescript
import 'jeremy-ui/lib/jeremy.css'
```

最后，修改每个例子中的引用即可。

### 效果展示 :tada:

![opt](https://gitee.com/jeremywuiot/img-res-all/raw/master/src/iie_shop/opt.gif)

### 项目地址 :gift:

GitHub: https://github.com/JeremyWu917/jeremy-ui

### 官网地址 :earth_africa:

JeremyUI: https://ui.jeremywu.top



感谢阅读 :coffee: